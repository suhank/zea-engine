import {
    UserAvatar
} from './UserAvatar';

let getUrlVars = () => {
    let vars = [],
        hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

let generateSessionID = () => {
    let words = [
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

    let sessionID = words[random(0, 6)] + words[random(0, 6)].toUpperCase() + words[random(0, 6)];
    window.location.replace('?id=' + sessionID);
    return sessionID;
}

class SessionClient {

    constructor(renderer) {
        this.__renderer = renderer;
        let myId = null;
        let replayData = null;
        let listeners = {};
        let roomState = {};
        let linesCount = 0;
        let connectedUsers = {};
        let lastTime = 0;
        let lastEvent = 0;

        let sessionID = getUrlVars()['id'];
        if (!sessionID) {
            sessionID = this.generateSessionID();
        }

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
        let timeline = document.createElement('input');
        timeline.setAttribute('id', 'timeline');
        timeline.setAttribute('type', 'range');
        timeline.setAttribute('min', '0');
        timeline.setAttribute('max', '100');
        timeline.setAttribute('step', '0.1');
        timeline.setAttribute('value', "0");
        timeline.style.width = (div.clientWidth - 420) + 'px';
        div.appendChild(timeline);

        let socketOpen = false;

        recButton.onclick = function(event) {
            event.preventDefault();
            if (socketOpen && recSelector.value == 'new' && !actualRecording) {
                ws.send(JSON.stringify({
                    type: 'requestNewRec',
                }));
                recButton.innerText = 'Stop Recording';
                return false;
            }

            if (socketOpen && actualRecording && myId == actualRecording.owner) {
                recButton.innerText = 'Record';
                ws.send(JSON.stringify({
                    type: 'endRecording',
                }));
            }
        };
        let actualRecording = null;

        timeline.addEventListener('input', function(event) {
            if (replayData) {
                travelTime(timeline.value);
            }
        });

        //////////////////////////////////////
        // Websocket setup


        let ws = new WebSocket("ws://localhost:5000", "proteocolOne");

        ws.onopen = function(event) {
            socketOpen = true;
            ws.send(JSON.stringify({
                type: 'join',
                room: sessionID,
                color: Visualive.Color.random(0.5).toJSON()
            }))
        };
        ws.onmessage = function(message) {
            let parseMessage = JSON.parse(message.data);

            if (listeners[parseMessage.type]) {
                listeners[parseMessage.type](parseMessage);
            }
        };

        let avatarsTreeRoot = new Visualive.TreeItem("avatarsTreeRoot");
        //scene.getRoot().addChild(avatarsTreeRoot);
        renderer.getCollector().addTreeItem(avatarsTreeRoot);
        this.__avatarsTreeRoot = avatarsTreeRoot;

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
        // Playback
        let playWait = false;
        let actualReplay = null;
        let requestId = null;
        let start = null;
        let duration = null;
        let rate = null;
        let isPlay = false;


        let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        window.requestAnimationFrame = requestAnimationFrame;


        listeners.replay = function(message) {
            replayData = message.data;
            recSelector.value = replayData.id;
            timeline.value = 0;
            if (playWait) {
                play();
            }
        };


        function play() {
            duration = new Date(replayData.stopTime) - new Date(replayData.startTime);
            rate = duration / 100;
            playWait = false;
            isPlay = true;
            start = Date.now();
            requestId = requestAnimationFrame(step);
        }

        function stop() {
            start = null;
            duration = null;
            isPlay = false;
            stateByTime(0);
            timeline.value = 0;
            window.cancelAnimationFrame(requestId);
        }

        function step() {
            let actualMS = Date.now() - start;
            if (actualMS < duration) {
                stateByTime(actualMS);
                timeline.value = actualMS / rate;
                requestId = requestAnimationFrame(step);
            } else {
                stop();
            }
        }


        playButton.onclick = function(event) {
            event.preventDefault();

            if (!playWait && !isPlay) {
                if (replayData && replayData.id == recSelector.value) {
                    play();
                } else {
                    playWait = true;
                    ws.send(JSON.stringify({
                        type: 'requestReplay',
                        data: {
                            id: recSelector.value
                        }
                    }))
                }
                return;
            }

            if (isPlay) {
                stop();
            }
        };


        recSelector.onchange = function(event) {
            if (recSelector.value != 'new') {
                ws.send(JSON.stringify({
                    type: 'requestReplay',
                    data: {
                        id: recSelector.value
                    }
                }))
            }
        };

        ////////////////////////////////////////
        // Register listeners with the renderer

        renderer.viewChanged.connect(function(data) {
            // convert the data type to raw json and send to the server.
            ws.send(JSON.stringify({
                type: 'viewChanged',
                room: sessionID,
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
            if (socketOpen) {

                ws.send(JSON.stringify({
                    type: 'pointerMoved',
                    room: sessionID,
                    data: data
                }));
            }
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


        let renderRoom = () => {
            let text = 'Clients: <br />';

            Object.keys(roomState.clients).forEach(function(key) {
                let client = roomState.clients[key];
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


        let travelTime = (percent) => {
            const init = new Date(replayData.startTime);
            const lastTime = new Date(replayData.stopTime);
            const duration = lastTime - init;
            const rate = duration / 100;
            const timeSet = percent * rate;
            this.stateByTime(timeSet);
        }

        let resetState = () => {
            Object.keys(connectedUsers).forEach(function(key) {
                connectedUsers[key].userMarker.destroy();
                onUserDisconnected(key);
            });
        }

        let stateByTime = (time) => {
            // console.log("stateByTime:" + time);
            const initState = {};
            const initTime = new Date(replayData.startTime);

            if (time < lastTime) {
                lastTime = 0;
                lastEvent = 0;
                resetState();
            }

            for (lastEvent; lastEvent < replayData.events.length; lastEvent++) {
                const currentEvent = replayData.events[lastEvent];
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

            lastTime = time;
        }

        ////////////////////////////////////////////////////////
        // Handle connections from other users.


        let onUserConnected = (id, color) => {
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

        let onUserDisconnected = (id) => {
            let geomItem = connectedUsers[id].geomItem;
            avatarsTreeRoot.removeChildByHandle(geomItem);
            delete connectedUsers[id];
            renderer.requestRedraw();
        };

        let onUserViewChange = (id, data) => {
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

        let onUserStrokeStarted = (id, xfo, color, thickness, lineId) => {
            let userMarker = connectedUsers[id].userMarker;
            userMarker.startStroke(xfo, color, thickness, lineId);
        };

        let onUserStrokeSegmentAdded = (id, xfo, lineId) => {
            let userMarker = connectedUsers[id].userMarker;
            userMarker.addSegmentToStroke(lineId, xfo);
        }
    }

};

export {
    SessionClient
};