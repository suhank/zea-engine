const WebSocketServer = require('uws').Server;
const shortid = require('shortid');
const { Map, fromJS } = require('immutable');


class Session {
  constructor(roomId){
    this.id = shortid.generate();
    this.roomId = roomId;
    this.clients = {};
    this.startTime = new Date();
    this.events = {};
    this.initialState = new Map();
    this.lastState = new Map();
    this.recordings = {};
    this.actualRecording = null;
  }
  
  
  geStateAtTime(time){
    
  }
  
  newRecording(ws){
    if(this.actualRecording) return false;
    
    const id = shortid.generate();
    
    this.recordings[id] = {
      id: id,
      startTime: new Date(),
      stopTime: null,
      events: [],
      clients: {}
    };
    
    this.actualRecording = this.recordings[id];
    
    this.emit('newRecording', {
      id: id,
      owner: ws.id
    })
  }
  
  addEvent(event){
    const id = shortid.generate();
    this.events[id] = event;
    
    if(this.actualRecording){
      this.actualRecording.clients[event.client] = {
        id: event.client,
        color: this.clients[event.client].color
      };
      this.actualRecording.events.push(id);
    }
  }
  
  endRecording(ws){
    if(!this.actualRecording) return false;
    this.actualRecording.stopTime = new Date();
    
    this.emit('endRecording', {
      id: this.actualRecording.id
    });
    
    this.replay(ws, this.actualRecording.id);
    this.actualRecording = null;
  }
  
  replay(ws, id){
    if(!this.recordings[id]) return false;
    const recData = Object.assign({}, this.recordings[id]);
    
    recData.events = recData.events.map((key)=>{
      return this.events[key];
    });
    
    recData.events = recData.events.filter((event)=>{
      return event.type != "pointerMoved";
    });
    
    this.emit('replay', recData);
  }
  
  emitClient(client, message){
    client.ws.send(JSON.stringify(message));
  }
  
  emit(event, data){
    Object.keys(this.clients).forEach((key)=>{
      this.emitClient(this.clients[key], {
        type: event,
        data: data
      });
    });
  }
  
  emitUpdates(){
    this.emit('updateState', this.lastState.toJS());
  }
  
  viewChanged(ws, event){
    this.addEvent({
      timestamp: +new Date(),
      type: event.type,
      data: event,
      client: ws.id
    });
    
    this.lastState = this.lastState.setIn(['clients', ws.id, 'data'], fromJS(event.data));
    this.emitUpdates();
  }
  
  joinClient(ws, data) {
    this.clients[ws.id] = {
      ws:ws,
      color: data.color
    };
    ws.actualSession = this;
    
    ws.send(JSON.stringify({
      type: 'joinRes',
      data: {
        id: ws.id,
        recordings: Object.keys(this.recordings)
      }
    }));
    
    this.addEvent({
      timestamp: +new Date(),
      type: 'joinClient',
      client: ws.id,
      color: data.color
    });
    
    
    this.lastState = this.lastState.setIn(['clients', ws.id], fromJS({
      id: ws.id,
      position: {
        x: 0,
        y: 0,
      },
      color: data.color,
      xfo: null
    }))
  }
  
  get orderedEvents(){
    let eventArray = Object.keys(this.events).map((key) => {
      return this.events[key];
    });
    
    eventArray.sort(function (a, b) {
      if(a.timestamp < b.timestamp) return -1;
      if(a.timestamp > b.timestamp) return 1;
      return 0;
    });
    
    return eventArray;
  }
  
  sendState(ws){
    const client = this.clients[ws.id];
    this.emitClient(client, {
      type: 'replayState',
      data: {
        startTime: this.startTime,
        events: this.orderedEvents,
        initialState: {}
      }
    })
  }
  
  
  onMessage(ws, event){
    switch (event.type){
      case 'viewChanged':
        return this.viewChanged(ws, event);
      case 'requestLastState':
        return this.sendState(ws);
      case 'requestNewRec':
        return this.newRecording(ws);
      case 'endRecording':
        return this.endRecording(ws);
      case 'requestReplay':
        return this.replay(ws, event.data.id);
      default:
        if(event.data) event.data.emitter = ws.id;
        this.addEvent({
          timestamp: +new Date(),
          type: event.type,
          data: event.data,
          client: ws.id
        });
        this.emit(event.type, event.data);
        break;
    }
  }
  
  closeClient(ws){
    this.addEvent({
      timestamp: +new Date(),
      type: 'closeClient',
      client: ws.id,
    });
    
    this.lastState = this.lastState.deleteIn(['clients', ws.id]);
    this.emit('clientDisconnect', {id: ws.id});
    this.emitUpdates();
    
    delete this.clients[ws.id];
  
    if(this.actualRecording && Object.keys(this.clients).length < 1){
      this.endRecording(ws, true);
    }
  }
}


class WSManager {
  constructor(){
    this.wss = new WebSocketServer({ port: 5000 });
    this.clients = {};
    this.rooms = {};
    this.sessions = {};
    this.roomToSesion = {};
    this.wss.on('connection', this.newClient.bind(this));
    
    this.toRoom = this.toRoom.bind(this);
    
    this.binders = {
      join: this.join.bind(this),
      updatePosition: this.updatePosition.bind(this),
      viewChanged: this.viewChanged.bind(this)
    }
  }
  
  newClient(ws){
    const id = shortid.generate();
    this.clients[id] = ws;
    
    ws.id = id;
    ws.on('message', function(message) {
      this.onMessage(ws, message);
    }.bind(this));
    
    ws.on('close', function() {
      if(ws.actualSession) {
        ws.actualSession.closeClient(ws);
      }
    }.bind(this));
  }
  
  toRoom(roomId, data){
    const room = this.rooms[roomId];
    Object.keys(room.clients).forEach((key)=>{
      const client = room.clients[key];
      client.ws.send(JSON.stringify(data));
    });
  }
  
  onMessage(ws, json){
    const data = JSON.parse(json);
    if(ws.actualSession){
      ws.actualSession.onMessage(ws, data);
    }else{
      this.join(ws, data);
    }
  }
  
  updateRoom(id) {
    const room = this.rooms[id];
    this.toRoom(id, {
      type: 'updateRoom',
      data: room
    })
  }
  
  join(ws, data){
    if(!this.roomToSesion[data.room]){
      this.roomToSesion[data.room] = new Session(data.room);
    }
    this.roomToSesion[data.room].joinClient(ws, data);
  }
  
  viewChanged(ws, message){
    const room = this.rooms[message.room];
    const client = room.clients[ws.id];
    client.data = message.data;
    this.updateRoom(message.room);
  }
  
  updatePosition(ws, message){
    const room = this.rooms[message.room];
    const client = room.clients[ws.id];
    client.position = message.position;
    this.updateRoom(message.room);
  }
}

const wsm = new WSManager();

