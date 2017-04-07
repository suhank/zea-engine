const WebSocketServer = require('uws').Server;
const shortid = require('shortid');
const {
  Map,
  fromJS
} = require('immutable');


class Session {
  constructor(projectID, sessionID) {
    this.projectID = projectID;
    this.sessionID = sessionID;
    this.startTime = new Date();
    this.clearTime = this.startTime;
    this.clients = {};
    this.events = [];
    // this.currClientState = new Map();
    this.recording = null;
    this.replayData = null;
  }

  joinClient(ws, clientData) {
    console.log("joinClient:" + clientData.id);
    this.clients[clientData.id] = {
      ws: ws,
      data: clientData
    };
    ws.sessionHdl = this;

    // this.emitClient(ws, {
    //   type: 'sessionClients',
    //   data: Object.keys(this.clients).map((key) => this.clients[key].data )
    // });

    // Send all the events since the last clear to the new client.
    // Thsi will include any recordings that have been made.
    let sessionEvents = [];
    for(let event of this.events){
      if(event.timestamp >= this.clearTime)
        sessionEvents.push({
          timestamp: event.timestamp - this.startTime,
          event: event.event,
        });
    }
    if(sessionEvents.length > 0){
      this.emitClient(ws, {
        type: 'sessionEvents',
        data: sessionEvents
      });
    }

    this.addEvent({
      type: 'joinClient',
      client: ws.id,
      data: clientData
    });

    // if (!this.recording && this.replayData){
    //   this.emitClient(ws, {
    //     type: 'replayState',
    //     data: this.replayData
    //   });
    // }
    // else{

    // }

  }

  clearRecording(ws) {
    this.recording = null;
    this.clearTime = new Date();
    this.broadcast({ type: 'clearRecording' });
  }

  startRecording(ws) {
    if (!this.recording) {
      this.recording = {
        duration: 0,
        eventIds: []
      };
    }
    this.recordingStartTime = new Date();
    this.broadcast({ type: 'startRecording' } );
  }

  stopRecording(ws) {
    if (!this.recording) return false;

    this.recording.duration += new Date() - this.recordingStartTime;

    this.broadcast({ type: 'stopRecording' });
    this.prepareRecordingReplay(ws);
  }

  addEvent(event) {
    this.events.push({
      timestamp: +new Date(),
      event
    });

    if (this.recording) {
      let id = this.events.length - 1;
      let timestamp = event.timestamp - this.recordingStartTime;
      this.recording.eventIds.push({
        timestamp,
        id
      });
    }

    // Broadcast the event to all other clients
    this.broadcast(event, event.client);
  }

  prepareRecordingReplay(ws) {
    if (!this.recording) return false;

    // Sample the events that are part of the recording into
    // the replay data array and store the recording-relative time.
    this.replayData = this.replayData.events.map((key) => {
      return {
        event: this.events[key.id].event,
        timestamp: key.timestamp
      };
    });

    this.broadcast({ type: 'replayData', data: this.replayData } );
  }

  emitClient(ws, message) {
    ws.send(JSON.stringify(message));
  }

  broadcast(event, filterClient = null) {
    Object.keys(this.clients).forEach((key) => {
      // Do not send the event to the fliter client. 
      // This is usually the client from whom the event
      // originated.
      if(key != filterClient){
        this.emitClient(this.clients[key].ws, event);
      }
    });
  }

  // broadcastUpdate() {
  //   this.broadcast('updateState', this.currClientState.toJS());
  // }

  // viewChanged(ws, event) {
  //   this.addEvent({
  //     type: event.type,
  //     data: event.data,
  //     client: ws.id
  //   });

  //   this.currClientState = this.currClientState.setIn(['clients', ws.id, 'data'], fromJS(event.data));
  //   this.broadcastUpdate();
  // }

  // pointerMoved(ws, event) {
  //   this.addEvent({
  //     type: event.type,
  //     data: event.data,
  //     client: ws.id
  //   });

  //   this.currClientState = this.currClientState.setIn(['clients', ws.id, 'data'], fromJS(event.data));
  //   this.broadcastUpdate();
  // }

  onMessage(ws, event) {
    switch (event.type) {
      // case 'viewChanged':
      //   return this.viewChanged(ws, event);
      // case 'pointerMoved':
      //   return this.pointerMoved(ws, event);
      case 'clearRecording':
        return this.clearRecording(ws);
      case 'startRecording':
        return this.startRecording(ws);
      case 'stopRecording':
        return this.stopRecording(ws);
      default:{
        this.addEvent({
          type: event.type,
          client: ws.id,
          data: event.data
        });
        // this.broadcast(event, ws.id);
        break;
      }
    }
  }

  closeClient(ws) {
    console.log("closeClient:" + ws.id);
    this.addEvent({
      type: 'clientDisconnect',
      client: ws.id
    });

    // this.currClientState = this.currClientState.deleteIn(['clients', ws.id]);
    // this.broadcast({ type: 'clientDisconnect',  id: ws.id });
    // this.broadcastUpdate();

    delete this.clients[ws.id];

    if (this.recording && Object.keys(this.clients).length < 1) {
      this.stopRecording(ws);
    }
  }
}


class WSManager {
  constructor() {
    this.wss = new WebSocketServer({
      port: 5000
    });
    this.clients = {};
    this.projects = {};
    this.wss.on('connection', this.newClient.bind(this));
  }

  newClient(ws) {
    ws.on('message', function(message) {
      this.onMessage(ws, message);
    }.bind(this));

    ws.on('close', function() {
      if (ws.sessionHdl) {
        ws.sessionHdl.closeClient(ws);
      }
    }.bind(this));
  }

  onMessage(ws, json) {
    const data = JSON.parse(json);
    if (ws.sessionHdl) {
      ws.sessionHdl.onMessage(ws, data);
    } else {
      this.join(ws, data);
    }
  }

  join(ws, data) {
    console.log("join projectID:" + data.projectID + " sessionID" + data.sessionID);
    // Assign the client ID to the WebSocket connection and 
    if (!this.clients[data.clientData.id]) {
      console.log("add client:" + data.clientData);
      const id = data.clientData.id;
      this.clients[id] = data.clientData;
      ws.id = id;
    }

    if (!this.projects[data.projectID]) {
      this.projects[data.projectID] = {
        'sessions': {}
      };
    }
    if (!this.projects[data.projectID].sessions[data.sessionID]) {
      this.projects[data.projectID].sessions[data.sessionID] = new Session(data.projectID, data.sessionID);
    }
    this.projects[data.projectID].sessions[data.sessionID].joinClient(ws, data.clientData);
  }

}

const wsm = new WSManager();