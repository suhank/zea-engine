import { UserAvatar } from './UserAvatar';

function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


class SessionClient {

    constructor(renderer) {
        this.__renderer = renderer;
        this.__replayData = null;

        let div = renderer.getDiv();

        // <div class="controlsContainer">
        //     <div>
        //         <select id="recSelector">
        //             <option value="new">New recording</option>
        //         </select>
        //     </div>
        //     <div class="icon" id="rec"><img src="rec.svg" alt=""></div>
        //     <div class="icon" id="play"><img src="playArrow.svg" alt=""></div>
        // </div>
        let controlsContainer = document.createElement('div');
        controlsContainer.setAttribute('class', 'controlsContainer');
        controlsContainer.style.position = 'fixed';
        controlsContainer.style.left = '20px';
        controlsContainer.style.bottom = '20px';
        controlsContainer.style.padding = '6px';

        let recSelectorDiv = document.createElement('div');
        controlsContainer.appendChild(recSelectorDiv);
        let recSelector = document.createElement('select');
        recSelector.class = "controlsContainer";
        recSelectorDiv.appendChild(recSelector);
        let newRecOption = document.createElement('option');
        newRecOption.value = "new";
        newRecOption.innerText = "New recording";
        recSelector.appendChild(newRecOption);

        let recButton = document.createElement('button');
        // recButton.class = "icon";
        // recButton.style.position = 'fixed';
        // recButton.style.right = '20px';
        // recButton.style.bottom = '20px';
        // recButton.style.padding = '20px';
        recButton.innerText = 'Record';
        controlsContainer.appendChild(recButton);

        let playButton = document.createElement('button');
        // playButton.class = "icon";
        // playButton.style.position = 'fixed';
        // playButton.style.right = '20px';
        // playButton.style.bottom = '20px';
        // playButton.style.padding = '20px';
        playButton.innerText = 'Play';
        controlsContainer.appendChild(playButton);

        div.appendChild(controlsContainer);

        //<input id="timeline" type="range" min="0" max="100" step="0.1" value="0" style="width: 600px" />
        this.__timeline = document.createElement('input');
        this.__timeline.setAttribute('id', 'timeline');
        this.__timeline.setAttribute('type', 'range');
        this.__timeline.setAttribute('min', '0');
        this.__timeline.setAttribute('max', '100');
        this.__timeline.setAttribute('step', '0.1');
        this.__timeline.setAttribute('value', "0");
        this.__timeline.style.width = (div.clientWidth - 420) + 'px';
        div.appendChild(this.__timeline);


        recButton.onclick = function (event) {
          event.preventDefault();
          if(recSelector.value = 'new' && !actualRecording){
            ws.send(JSON.stringify({
              type: 'requestNewRec',
            }));
            return false;
          }
          
          if(actualRecording && myId == actualRecording.owner){
            ws.send(JSON.stringify({
              type: 'endRecording',
            }));
          }
        };
        let actualRecording = null;

        let _this = this;
        this.__timeline.addEventListener('input', function(event) {
            if (replayData) {
                _this.travelTime(timeline.value);
            }
        });
/*
        let socketOpen = false;

        let ws = new WebSocket("ws://localhost:5000", "proteocolOne");

        let listeners = {};
        ws.onopen = function(event) {
            socketOpen = true;
            ws.send(JSON.stringify({
                type: 'join',
                room: roomId,
                color: Visualive.Color.random(0.5).toJSON()
            }))
        };

        ws.onmessage = function(message) {
            var parseMessage = JSON.parse(message.data);

            if (listeners[parseMessage.type]) {
                listeners[parseMessage.type](parseMessage);
            }
        };


        this.__ws = ws;

        this.__listeners = listeners;
        this.__roomState = {};
        this.__myId = null;
        this.__lastTime = 0;
        this.__lastEvent = 0;

        this.__sessionID = getUrlVars()['id'];
        if (!this.__sessionID) {
            this.generateSessionID();
        }

        this.__avatarsTreeRoot = new Visualive.TreeItem("avatarsTreeRoot");
        //scene.getRoot().addChild(avatarsTreeRoot);
        renderer.getCollector().addTreeItem(this.__avatarsTreeRoot);

        // const clientsList = document.createElement('div');
        // clientsList.style.position = 'fixed';
        // clientsList.style.left = '20px';
        // clientsList.style.bottom = '20px';
        // clientsList.style.padding = '20px';
        // clientsList.style.backgroundColor = 'silver';
        // div.appendChild(clientsList);

        // const requestStateButton = document.createElement('button');
        // requestStateButton.style.position = 'fixed';
        // requestStateButton.style.right = '20px';
        // requestStateButton.style.bottom = '20px';
        // requestStateButton.style.padding = '20px';
        // requestStateButton.innerText = 'Request State';
        // div.appendChild(requestStateButton);


        listeners.joinRes = function(message) {
            myId = message.data.id;
            message.data.recordings.forEach(function(id) {
                const option = document.createElement('option');
                option.value = id;
                option.innerHTML = id;
                recSelector.appendChild(option);
            })
        };


        listeners.replayState = function(message) {
            replayData = message.data;
        };

        listeners.clientDisconnect = function(message) {
            onUserDisconnected(message.data.id);
        };

        listeners.updateState = function(message) {
            roomState = message.data;
            renderRoom();
        };

        listeners.strokeStarted = function(message) {
            if (myId == message.data.emitter) return;
            let xfo = new Visualive.Xfo();
            xfo.fromJSON(message.data.xfo);
            let color = new Visualive.Color();
            color.fromJSON(message.data.color);
            let thickness = message.data.thickness;
            console.log(message);
            onUserStrokeStarted(message.data.emitter, xfo, color, thickness, message.data.id);
        };

        listeners.strokeSegmentAdded = function(message) {
            if (myId == message.data.emitter) return;
            let xfo = new Visualive.Xfo();
            xfo.fromJSON(message.data.xfo);
            onUserStrokeSegmentAdded(message.data.emitter, xfo, message.data.id);
        };

        listeners.newRecording = function(message) {
            timeline.style.display = 'none';
            playButton.style.display = 'none';
            recSelector.disabled = true;

            const option = document.createElement('option');
            option.value = message.data.id;
            option.innerHTML = message.data.id;
            recSelector.appendChild(option);
            recSelector.value = message.data.id;

            actualRecording = message.data;
        };


        listeners.endRecording = function(message) {
            recSelector.disabled = false;
            recSelector.value = message.data.id;
            timeline.style.display = 'block';
            playButton.style.display = 'block';
            actualRecording = null;
        };
        ////////////////////////////////////////
        // Register listeners with the renderer

        renderer.viewChanged.connect(function(data) {
            // convert the data type to raw json and send to the server.
            ws.send(JSON.stringify({
                type: 'viewChanged',
                room: roomId,
                data: data
            }));
        });

        // renderer.getViewport().mouseMoved.connect(function (event, mousePos, ray) {
        //   // convert the data type to raw json and send to the server.
        //   // console.log("mousePos:", mousePos.toJSON());
        //   // console.log("ray:", ray.toJSON());
        // });
        renderer.pointerMoved.connect(function(data) {
            // convert the data type to raw json and send to the server.
            // console.log("mousePos:", mousePos.toJSON());
            // console.log("ray:", ray.toJSON());
            ws.send(JSON.stringify({
                type: 'pointerMoved',
                room: roomId,
                data: data
            }));
        });


        renderer.getViewport().actionStarted.connect((data) => {
            ws.send(JSON.stringify(data));
        });
        renderer.getViewport().actionOccuring.connect((data) => {
            ws.send(JSON.stringify(data));
        });
        renderer.getViewport().actionEnded.connect((data) => {
            ws.send(JSON.stringify(data));
        });
        */
    }


    generateSessionID() {
        var words = [
            'sun',
            'sky',
            'cow',
            'six',
            'sir',
            'tag',
            'view'
        ];

        function random(min, max) {
            return Math.floor(Math.random() * max) + min;
        }

        this.__sessionID = words[random(0, 6)] + words[random(0, 6)].toUpperCase() + words[random(0, 6)];
        window.location.replace('?id=' + this.__sessionID);
    }

    renderRoom() {
        var text = 'Clients: <br />';

        Object.keys(this.__roomState.clients).forEach(function(key) {
            var client = roomState.clients[key];
            text += '- ' + (key == myId ? 'me' : key) + ': position [x:' + client.position.x + ', y:' + client.position.y + '] <br />'

            if (key != myId) {
                if (!connectedUsers[key]) {
                    console.log(client);
                    onUserConnected(key, client.color);
                }

                if (client) {
                    onUserViewChange(key, client)
                }
            }
        });

        // clientsList.innerHTML = text;
    }


    travelTime(percent) {
        const init = new Date(this.__replayData.startTime);
        const lastTime = new Date(this.__replayData.stopTime);
        const duration = lastTime - init;
        const rate = duration / 100;
        const timeSet = percent * rate;
        this.stateByTime(timeSet);
    }

    resetState() {
        Object.keys(connectedUsers).forEach(function(key) {
            connectedUsers[key].userMarker.destroy();
            onUserDisconnected(key);
        });
    }



    stateByTime(time) {
        // console.log("stateByTime:" + time);
        const initState = {};
        const initTime = new Date(replayData.startTime);

        if (time < this.__lastTime) {
            this.__lastTime = 0;
            this.__lastEvent = 0;
            resetState();
        }

        for (this.__lastEvent; this.__lastEvent < replayData.events.length; this.__lastEvent++) {
            const currentEvent = replayData.events[this.__lastEvent];
            const actualTime = new Date(currentEvent.timestamp) - initTime;
            if (actualTime > time) {
                break;
            }

            if (!connectedUsers[currentEvent.client]) {
                onUserConnected(currentEvent.client, replayData.clients[currentEvent.client].color);
            }

            switch (currentEvent.type) {
                case 'joinClient':
                    if (!connectedUsers[currentEvent.client]) {
                        onUserConnected(currentEvent.client, currentEvent.color);
                    }
                    break;
                case 'viewChanged':
                    onUserViewChange(currentEvent.client, currentEvent.data);
                    break;
                case 'strokeStarted':
                    {
                        let xfo = new Visualive.Xfo();
                        xfo.fromJSON(currentEvent.data.xfo);
                        let color = new Visualive.Color();
                        color.fromJSON(currentEvent.data.color);
                        let thickness = currentEvent.data.thickness;
                        onUserStrokeStarted(currentEvent.client, xfo, color, thickness, currentEvent.data.id);
                    }
                    break;
                case 'strokeSegmentAdded':
                    {
                        let xfo = new Visualive.Xfo();
                        xfo.fromJSON(currentEvent.data.xfo);
                        onUserStrokeSegmentAdded(currentEvent.client, xfo, currentEvent.data.id);
                    }
                    break;
            }
        }

        this.__lastTime = time;
    }

    ////////////////////////////////////////////////////////
    // Handle connections from other users.


    onUserConnected(id, color) {
        let shape = new Visualive.Cuboid('Camera', 1.1, 2.0, 1.0);
        let material = new Visualive.StandardMaterial('user#Material');
        material.baseColor = new Visualive.Color(color.r, color.g, color.b);

        let geomItem = new Visualive.GeomItem(id, shape, material);
        avatarsTreeRoot.addChild(geomItem);
        let userMarker = new Visualive.MarkerpenTool('client' + id);
        avatarsTreeRoot.addChild(userMarker.getTreeItem());

        connectedUsers[id] = {
            geomItem,
            userMarker
        };
    };

    onUserDisconnected(id) {
        let geomItem = connectedUsers[id].geomItem;
        avatarsTreeRoot.removeChildByHandle(geomItem);
        delete connectedUsers[id];
        renderer.requestRedraw();
    };

    onUserViewChange(id, data) {
        let viewChangeData = data.data;
        switch (viewChangeData.interfaceType) {
            case 'MouseAndKeyboard':
                {
                    let geomItem = connectedUsers[id].geomItem;
                    const xfo = new Visualive.Xfo();
                    xfo.fromJSON(viewChangeData.cameraXfo);
                    geomItem.localXfo = xfo;
                }
                break;
            case 'TabletAndFinger':

                break;
            case 'Vive':
                {
                    let geomItem = connectedUsers[id].geomItem;
                    const xfo = new Visualive.Xfo();
                    xfo.fromJSON(viewChangeData.headXfo);
                    geomItem.localXfo = xfo;
                    // leftHandXfo = data.leftHand;
                    // rightHandXfo = data.rightHand;
                }

                break;
            case 'Daydream':

                break;
            case 'Occulus':

                break;
        }

        renderer.requestRedraw();
    };

    onUserStrokeStarted(id, xfo, color, thickness, lineId) {
        let userMarker = connectedUsers[id].userMarker;
        userMarker.startStroke(xfo, color, thickness, lineId);
    };

    onUserStrokeSegmentAdded(id, xfo, lineId) {
        let userMarker = connectedUsers[id].userMarker;
        userMarker.addSegmentToStroke(lineId, xfo);
    }

};

export {
    SessionClient
};