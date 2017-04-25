import {
    AttrValue,
    Vec2,
    Vec3,
    Color,
    Xfo,
    Ray
} from '../Math';
import {
    TreeItem
} from '../SceneTree';
import {
    UserAvatar
} from './UserAvatar';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLAnalyticsPass
} from './Passes/GLAnalyticsPass.js';

let getUrlVars = () => {
    let url = window.location.href,
        projectID,
        args = [],
        hash;

    let parts = url.split('#');
    let tmp = parts[0].split('/');
    projectID = tmp[tmp.length - 1];

    let hashes = parts.length > 1 ? parts[1].split('&') : [];
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        args[hash[0]] = hash[1];
    }
    if(projectID == "")
        projectID = "SharedSession";
    return {
        projectID,
        args
    };
}

function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4();;
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
    let sessionID = words[random(0, 6)] + words[random(0, 6)].toUpperCase() + words[random(0, 6)];
    window.location.replace('#id=' + sessionID);
    // window.history.pushState("Session", "Title", window.location+'?id=' + sessionID);
    return sessionID;
}

let getLocationData = (callback) => {
    function createElements(elements) {
        // Assuming you get an array of objects.
        if(typeof elements == 'string')
            callback(JSON.parse(elements));
    }
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          createElements(this.responseText);
        }
    }
    xhr.onload = createElements;
    xhr.open("get", '//freegeoip.net/json/', true);
    xhr.send()
}

let avatarColors = [
    new Color(0.0, 0.15, 0.15),
    new Color(0.0, 0.85, 0.15),
    new Color(0.0, 0.15, 0.85),
    new Color(0.0, 0.85, 0.85),
    new Color(0.75, 0.15, 0.15),
    new Color(0.75, 0.85, 0.15),
    new Color(0.75, 0.15, 0.85),
    new Color(0.75, 0.85, 0.85)
];
let randomAvatarColor = () => {
    return avatarColors[random(0, avatarColors.length)];
}

class SessionClient {

    constructor(renderer, enableSessionRecording) {
        this.__renderer = renderer;

        this.scaleFactor = 1.0;

        let listeners = {};
        let linesCount = 0;
        let connectedUsers = {};
        let lastTime = 0;
        let lastEvent = 0;
        let actualRecording = null;
        let replayData = null;

        let avatarsTreeRoot = new TreeItem("avatarsTreeRoot");
        //scene.getRoot().addChild(avatarsTreeRoot);
        renderer.getCollector().addTreeItem(avatarsTreeRoot);
        this.__avatarsTreeRoot = avatarsTreeRoot;


        let convertValuesFromJSON = (data) => {
            let fromJSON = (key, value) => {
                value.fromJSON(data[key]);
                data[key] = value;
            }
            for(let key in data){
                let dataValue = data[key];
                let className = dataValue.className;
                if(className){
                    // TODO: Implement a factory system so all types are registered
                    // and can be construced from the classname.
                    switch(className) {
                    case 'Vec2': fromJSON(key, new Vec2()); break;
                    case 'Vec3': fromJSON(key, new Vec3()); break;
                    case 'Color': fromJSON(key, new Color()); break;
                    case 'Xfo': fromJSON(key, new Xfo()); break;
                    case 'Ray': fromJSON(key, new Ray()); break;
                    }
                }
                else if(Array.isArray(dataValue)) {
                    convertValuesFromJSON(dataValue);
                }
                else if(typeof dataValue === "object") {
                    convertValuesFromJSON(dataValue);
                }
            }
        }


        let convertValuesToJSON = (data) => {
            for(let key in data){
                let value = data[key];
                if(value.toJSON){
                    data[key] = value.toJSON();
                    data[key].className = value.constructor.name;
                }
                else if(Array.isArray(value)) {
                    convertValuesToJSON(value);
                }
                else if(typeof value === "object") {
                    convertValuesToJSON(value);
                }
            }
        }

        // Client IDs need to be persistent.
        // TODO: Integrate with app login, so we can track users
        // by thier profile.
        let clientData = JSON.parse(localStorage.getItem('clientData'));
        if(clientData) {
            convertValuesFromJSON(clientData);
        }
        else {
            clientData = {
                id: guid(),
                color: randomAvatarColor()
            };
            getLocationData(function(data) {
                clientData.location = data;
                localStorage.setItem('clientData', JSON.stringify(clientData));
                sendMessage({
                    type: 'updateClientData',
                    data: clientData
                });
            });
        }
        let myId = clientData.id;

        // Add an avatar for us. 
        let myAvatar = new UserAvatar(myId, clientData, avatarsTreeRoot, this.scaleFactor, false);
        connectedUsers[myId] = myAvatar;

        let urlVars = getUrlVars();
        let projectID = urlVars.projectID;
        let sessionID = urlVars.args['id'];
        if (!sessionID) {
            sessionID = generateSessionID();
        }
        console.log("Vars projectID:" + projectID + " sessionID:" + sessionID);

        //////////////////////////////////////
        // Websocket setup

        let socketOpen = false;
        //let ws = new WebSocket("ws://localhost:5000", "protocolOne");
        let ws = new WebSocket("ws://108.59.85.106:5000", "protocolOne");
        //let ws = new WebSocket("wss://108.59.85.106:5000", "protocolOne");

        let sendMessage = (message) => {
            if(socketOpen){
                if(message)
                    convertValuesToJSON(message);
                ws.send(JSON.stringify(message));
            }
        }

        ws.onopen = function(event) {
            socketOpen = true;
            sendMessage({
                type: 'join',
                clientData: clientData,
                projectID: projectID,
                sessionID: sessionID
            });
            // generateRecordingUI();
        };
        ws.onmessage = function(message) {
            let jsonData = JSON.parse(message.data);

            convertValuesFromJSON(jsonData.data);
            // console.log("onmessage:" + jsonData.type + " client:" + jsonData.client);
            if (listeners[jsonData.type]) {
                listeners[jsonData.type](jsonData.client, jsonData.data);
            }
        };

        // const clientsList = document.createElement('div');
        // clientsList.style.position = 'fixed';
        // clientsList.style.left = '20px';
        // clientsList.style.bottom = '20px';
        // clientsList.style.padding = '20px';
        // clientsList.style.backgroundColor = 'silver';
        // div.appendChild(clientsList);

        listeners.sessionUpdate = function(client, data) {
            for (let clientData of data.clients) {
                if (clientData.id != myId) {
                    onUserConnected(clientData.id, clientData);
                }
            }
            // Note: this method updates a newly connected user
            // to the current state of the session. We really only
            // need the latest head positions, and all the line drawing.
            // TODO: Optimize this later once sessions get long.
            // Note: if a user re-joins a session they were previously
            for (let eventData of data.events) {
                handleEvent(eventData.event);
            }
        };

        listeners.replayState = function(client, data) {
            replayData = data;
        };

        listeners.clientDisconnect = function(client, data) {
            onUserDisconnected(client);
        };

        // Updates the state of the connected user avatars.
        // listeners.updateState = function(message) {
        //     updateAvatars(message.data);
        // };


        listeners.joinClient = function(client, data) {
            if (!connectedUsers[client]) {
                onUserConnected(client, data);
            }
        };

        listeners.viewChanged = function(client, data) {
            onUserViewChange(client, data);
        };

        listeners.strokeStarted = function(client, data) {
            onUserStrokeStarted(client, data);
        };

        listeners.strokeSegmentAdded = function(client, data) {
            onUserStrokeSegmentAdded(client, data);
        };

        listeners.clearRecording = function(client, data) {
            clearButton.disabled = true;
            timeline.style.display = 'none';
            playButton.style.display = 'none';
            for (let clientId in connectedUsers) {
                let userMarker = connectedUsers[clientId].userMarker;
                userMarker.clear();
            }
        };

        listeners.startRecording = function(client, data) {
            clearButton.disabled = true;
            timeline.style.display = 'none';
            playButton.style.display = 'none';
        };

        listeners.stopRecording = function(client, data) {
            clearButton.disabled = false;
            // recSelector.value = data.id;
            timeline.style.display = 'block';
            playButton.style.display = 'block';
        };

        listeners.projectAnalytics = function(client, data) {
            onAnalyticsDataRecieved(data);
        }

        ////////////////////////////////////////
        // Register listeners with the renderer

        renderer.viewChanged.connect(function(data) {
            // convert the data type to raw json and send to the server.
            if (socketOpen) {
                sendMessage({
                    type: 'viewChanged',
                    data: data
                });
            }
        });

        renderer.pointerMoved.connect(function(data) {
            // convert the data type to raw json and send to the server.
            // console.log("mousePos:", mousePos.toJSON());
            // console.log("ray:", ray.toJSON());
            if (socketOpen) {
                sendMessage({
                    type: 'pointerMoved',
                    data: data
                });
            }
        });

        renderer.actionStarted.connect((msg) => {
            if(msg.type == 'strokeStarted') {
                let myMarker = connectedUsers[myId].userMarker;
                let data = msg.data;
                data.color.fromJSON(clientData.color);
                data.id = myMarker.startStroke(data.xfo, data.color, data.thickness);
            }
            if (socketOpen)
                sendMessage(msg);
        });
        renderer.actionOccuring.connect((msg) => {
            if(msg.type == 'strokeSegmentAdded') {
                let myMarker = connectedUsers[myId].userMarker;
                let data = msg.data;
                data.id = myMarker.addSegmentToStroke(data.xfo);
            }
            if (socketOpen)
                sendMessage(msg);
        });
        renderer.actionEnded.connect((msg) => {
            if(msg.type == 'strokeEnded') {
                let myMarker = connectedUsers[myId].userMarker;
                msg.data = {
                    id: myMarker.endStroke()
                };
            }
            if (socketOpen)
                sendMessage(msg);
        });

        ////////////////////////////////////////

        let handleEvent = (event) => {

            switch (event.type) {
                case 'joinClient':
                    if (!connectedUsers[event.client]) {
                        onUserConnected(event.client, event.data);
                    }
                    break;
                case 'clientDisconnect':
                    if (connectedUsers[event.client]) {
                        onUserDisconnected(event.client);
                    }
                    break;
                case 'viewChanged':
                    onUserViewChange(event.client, event.data);
                    break;
                case 'pointerMoved':
                    onUserPointerMoved(event.client, event.data);
                    break;
                case 'strokeStarted':
                    onUserStrokeStarted(event.client, event.data);
                    break;
                case 'strokeSegmentAdded':
                    onUserStrokeSegmentAdded(event.client, event.data);
                    break;

            }
        }

        ////////////////////////////////////////////////////////
        // Handle connections from other users.

        let onUserConnected = (client, data) => {
            if (client in connectedUsers) {
                connectedUsers[client].setVisibility(true);
            } else {
                connectedUsers[client] = new UserAvatar(client, data, avatarsTreeRoot, this.scaleFactor);
            }
        };

        let onUserDisconnected = (client) => {
            if (client in connectedUsers) {
                connectedUsers[client].setVisibility(false);
                renderer.requestRedraw();
            }
        };

        let onUserViewChange = (client, data) => {
            connectedUsers[client].onViewChange(data);
            renderer.requestRedraw();
        };
        let onUserPointerMoved = (client, data) => {
            connectedUsers[client].pointerMoved(data);
            renderer.requestRedraw();
        };

        let onUserStrokeStarted = (client, data) => {
            let userMarker = connectedUsers[client].userMarker;
            userMarker.startStroke(data.xfo, data.color, data.thickness, data.id);
        };

        let onUserStrokeSegmentAdded = (client, data) => {
            let userMarker = connectedUsers[client].userMarker;
            userMarker.addSegmentToStroke(data.xfo, data.id);
        }

        ////////////////////////////////////////////////////////
        if(enableSessionRecording) {

            //let generateRecordingUI = () => {
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

            // let recSelectorDiv = document.createElement('div');
            // controlsContainer.appendChild(recSelectorDiv);
            // let recSelector = document.createElement('select');
            // recSelector.class = "controlsContainer";
            // recSelectorDiv.appendChild(recSelector);
            // let newRecOption = document.createElement('option');
            // newRecOption.value = "new";
            // newRecOption.innerText = "New recording";
            // recSelector.appendChild(newRecOption);

            let clearButton = document.createElement('button');
            // clearButton.class = "icon";
            // clearButton.style.position = 'fixed';
            // clearButton.style.right = '20px';
            // clearButton.style.bottom = '20px';
            // clearButton.style.padding = '20px';
            clearButton.innerText = 'Clear';
            controlsContainer.appendChild(clearButton);

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
            let rhsSpace = 360;
            let resizeTimeline = () => {
                timeline.style.width = (div.clientWidth - rhsSpace) + 'px';
            }
            renderer.vrViewportSetup.connect(() => {
                rhsSpace = 480;
                resizeTimeline();
            });
            renderer.resized.connect((width, height) => {
                resizeTimeline();
            })
            resizeTimeline();
            div.appendChild(timeline);

            timeline.style.display = 'none';
            playButton.style.display = 'none';

            clearButton.onclick = function(event) {
                event.preventDefault();
                if (socketOpen) {
                    sendMessage({
                        type: 'clearRecording',
                    });
                }
            };

            recButton.onclick = function(event) {
                event.preventDefault();

                if (socketOpen) {
                    if (!actualRecording) {
                        sendMessage({
                            type: 'startRecording',
                        });
                        recButton.innerText = 'Stop Recording';
                    } else {
                        recButton.innerText = 'Record';
                        sendMessage({
                            type: 'stopRecording',
                        });
                    }
                }
            };

            timeline.addEventListener('input', function(event) {
                if (replayData) {
                    travelTime(timeline.value);
                }
            });

            ////////////////////////////////////////
            // Playback
            let playWait = false;
            let actualReplay = null;
            let requestId = null;
            let start = null;
            let duration = null;
            let rate = null;
            let isPlaying = false;


            let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

            window.requestAnimationFrame = requestAnimationFrame;

            // After joining, or finishing a recording
            // we recieve the reording data from the server.
            listeners.replayData = function(message) {
                replayData = message.data;
                playButton.style.display = 'block';
                timeline.style.display = 'block';
                timeline.value = 0;
                if (playWait) {
                    play();
                }
            };

            function play() {
                duration = new Date(replayData.stopTime) - new Date(replayData.startTime);
                rate = duration / 100;
                playWait = false;
                isPlaying = true;
                start = Date.now();
                // requestId = requestAnimationFrame(step);
                renderer.redrawOccured.connect(step);
                renderer.startContinuousDrawing();
            }

            function stop() {
                // start = null;
                // duration = null;
                isPlaying = false;
                // stateByTime(0);
                // timeline.value = 0;
                // window.cancelAnimationFrame(requestId);
                renderer.stopContinuousDrawing();
                renderer.redrawOccured.disconnect(step);
            }

            function step() {
                let actualMS = Date.now() - start;
                if (actualMS < duration) {
                    stateByTime(actualMS);
                    timeline.value = actualMS / rate;
                    // requestId = requestAnimationFrame(step);
                } else {
                    stop();
                }
            }


            playButton.onclick = function(event) {
                event.preventDefault();

                if (!playWait && !isPlaying) {
                    // if (replayData && replayData.id == recSelector.value) {
                    playButton.innerText = 'Stop';
                    play();
                    // } else {
                    //     playWait = true;
                    //     sendMessage({
                    //         type: 'requestReplay',
                    //         data: {
                    //             id: recSelector.value
                    //         }
                    //     });
                    // }
                    return;
                }

                if (isPlaying) {
                    playButton.innerText = 'Play';
                    stop();
                }
            };


            // recSelector.onchange = function(event) {
            //     if (recSelector.value == 'new') {
            //         timeline.style.display = 'none';
            //         playButton.style.display = 'none';
            //     } else {
            //         sendMessage({
            //             type: 'requestReplay',
            //             data: {
            //                 id: recSelector.value
            //             }
            //         });
            //     }
            // };

            ///////////////////////////////////////////////////////


            // let updateAvatars = (data) => {
            //     // let text = 'Clients: <br />';

            //     Object.keys(data.clients).forEach(function(key) {
            //         let client = data.clients[key];
            //         // text += '- ' + (key == myId ? 'me' : key) + ': position [x:' + client.position.x + ', y:' + client.position.y + '] <br />'

            //         if (key != myId) {
            //             if (!connectedUsers[key]) {
            //                 onUserConnected(key, client.color);
            //             }

            //             if (client) {
            //                 onUserViewChange(key, client)
            //             }
            //         }
            //     });

            //     // clientsList.innerHTML = text;
            // }


            let travelTime = (percent) => {
                const duration = new Date(replayData.duration);
                const rate = duration / 100;
                const timeSet = percent * rate;
                stateByTime(timeSet);
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

                if (time < lastTime) {
                    lastTime = 0;
                    lastEvent = 0;
                    resetState();
                }

                for (lastEvent; lastEvent < replayData.events.length; lastEvent++) {
                    const currentEvent = replayData.events[lastEvent];
                    const actualTime = new Date(currentEvent.timestamp);
                    if (actualTime > time) {
                        break;
                    }

                    // if (!connectedUsers[currentEvent.client]) {
                    //     onUserConnected(currentEvent.client, replayData.clients[currentEvent.client].color);
                    // }

                    handleEvent(currentEvent.event);
                }

                lastTime = time;
            }
        }


        /////////////////////////////////////////////////
        // Analytics Display
        let analyticsPass = undefined;
        let onAnalyticsDataRecieved = (data) => {
            function _base64ToArrayBuffer(base64) {
                var binary_string =  window.atob(base64);
                var len = binary_string.length;
                var bytes = new Uint8Array( len );
                for (var i = 0; i < len; i++)        {
                    bytes[i] = binary_string.charCodeAt(i);
                }
                return bytes.buffer;
            }
            let dataArray = new Float32Array(_base64ToArrayBuffer(data));
            // console.log("displayAnalytics:" + dataArray);
            analyticsPass = new GLAnalyticsPass(renderer.gl, dataArray);
            renderer.addPass(analyticsPass);
            renderer.requestRedraw();
        }
        let requestAnalytics = () => {
            sendMessage({
                type: 'getProjectAnalytics',
                projectID: projectID
            });
        }
        let removeAnalytics = () => {
            renderer.removePass(analyticsPass);
            analyticsPass.destroy();
        }

        this.toggleAnalytics = ()=>{
            if(!analyticsPass)
                requestAnalytics();
            else
                removeAnalytics();
        };
    }

};

export {
    SessionClient
};