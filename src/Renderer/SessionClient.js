import {
    Color,
    Signal
} from '../Math';
import {
    typeRegistry
} from '../Math/TypeRegistry'
import {
    TreeItem
} from '../SceneTree/TreeItem';
import {
    UserAvatar
} from './UserAvatar';
import {
    GLAnalyticsPass
} from './Passes/GLAnalyticsPass.js';

let getUrlVars = () => {
    let url = window.location.href,
        projectID,
        args = [],
        hash;

    let parts = url.split('#');
    let tmp = parts[0].split('/').filter((val) => val != '');
    projectID = tmp[tmp.length - 1];

    let hashes = parts.length > 1 ? parts[1].split('&') : [];
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        args[hash[0]] = hash[1];
    }
    if (projectID == "")
        projectID = "SharedSession";

    let isSecureConnection = url.startsWith('https');

    if (parts.length > 1) {
        // trim off the decorations. 
        // This is so that users don't bookmark session URLs.
        window.location.replace(parts[0] + '#');
    }

    return {
        projectID,
        isSecureConnection,
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

// let generateSessionID = () => {
//     let words = [
//         'sun',
//         'sky',
//         'cow',
//         'six',
//         'sir',
//         'tag',
//         'view'
//     ];
//     let sessionID = words[random(0, 6)] + words[random(0, 6)].toUpperCase() + words[random(0, 6)];
//     // window.location.replace('#id=' + sessionID);
//     // window.history.pushState("Session", "Title", window.location+'?id=' + sessionID);
//     return sessionID;
// }

let getLocationData = (callback) => {
    function createElements(elements) {
        // Assuming you get an array of objects.
        if (typeof elements == 'string')
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

let convertValuesFromJSON = (data) => {
    let fromJSON = (key, value) => {
        value.fromJSON(data[key]);
        data[key] = value;
    }
    for (let key in data) {
        let dataValue = data[key];
        let className = dataValue.className;
        if (className) {
            let dataType = typeRegistry.getType(className);
            fromJSON(key, dataType.create());
        } else if (Array.isArray(dataValue)) {
            convertValuesFromJSON(dataValue);
        } else if (typeof dataValue === "object") {
            convertValuesFromJSON(dataValue);
        }
    }
}


let convertValuesToJSON = (data) => {
    for (let key in data) {
        let value = data[key];
        if (value.toJSON) {
            data[key] = value.toJSON();
            data[key].className = value.constructor.name;
        } else if (Array.isArray(value)) {
            convertValuesToJSON(value);
        } else if (typeof value === "object") {
            convertValuesToJSON(value);
        }
    }
}

let downloadData = function(file_name, mime_type, text) {
    // Anything but IE works here
    if (undefined === window.navigator.msSaveOrOpenBlob) {
        var e = document.createElement('a');
        var href = 'data:' + mime_type + ';charset=utf-8,' + encodeURIComponent(text);
        e.setAttribute('href', href);
        e.setAttribute('download', file_name);
        document.body.appendChild(e);
        e.click();
        document.body.removeChild(e);
    }
    // IE-specific code
    else {
        var charCodeArr = new Array(text.length);
        for (var i = 0; i < text.length; ++i) {
            var charCode = text.charCodeAt(i);
            charCodeArr[i] = charCode;
        }
        var blob = new Blob([new Uint8Array(charCodeArr)], {
            type: mime_type
        });
        window.navigator.msSaveOrOpenBlob(blob, file_name);
    }
}


class SessionClient {

    constructor(renderer, commonResources) {
        this.__renderer = renderer;

        this.scaleFactor = 1.0;

        ///////////////////////////
        // Signals.
        this.playbackModeChanged = new Signal();
        this.playStateChanged = new Signal();
        // this.sessionModeChanged = new Signal();
        this.sessionTimeChanged = new Signal();
        this.replayDataRecieved = new Signal();

        ////////////////////////////

        // Client IDs need to be persistent.
        // TODO: Integrate with app login, so we can track users
        // by thier profile.
        let clientData; // = JSON.parse(localStorage.getItem('clientData'));
        if (clientData) {
            convertValuesFromJSON(clientData);
        } else {
            clientData = {
                id: guid(),
                color: randomAvatarColor()
            };
            getLocationData((data) => {
                clientData.location = data;
                localStorage.setItem('clientData', JSON.stringify(clientData));
                sendMessage({
                    type: 'updateClientData',
                    data: clientData
                });
            });
        }
        let myId = clientData.id;


        let urlVars = getUrlVars();
        let projectID = urlVars.projectID;

        // https://developer.mozilla.org/en/docs/Web/API/Window/sessionStorage
        // Check to see if we are joining a new session.
        let sessionID = urlVars.args['id'];
        if (!sessionID) {
            // Else check to see if we are already in a session.
            sessionID = sessionStorage.getItem('sessionID');
        }
        if (!sessionID) {
            sessionID = guid();
            sessionStorage.setItem('sessionID', sessionID);
        }
        console.log("Vars projectID:" + projectID + " sessionID:" + sessionID + " userID:" + myId);

        this.getDecoratedURL = () => {
            return window.location + ('#id=' + sessionID);
        }


        //////////////////////////////////////
        // Add an avatar for us.
        let connectedUsers = {};
        let avatarsTreeRoot = new TreeItem("avatarsTreeRoot");
        avatarsTreeRoot.setSelectable(false);
        renderer.getCollector().addTreeItem(avatarsTreeRoot);

        let myAvatar = new UserAvatar(myId, clientData, avatarsTreeRoot, this.scaleFactor, false, commonResources);
        connectedUsers[myId] = myAvatar;

        //////////////////////////////////////
        // Websocket setup
        let listeners = {};
        let updatingTreeXfos = false;
        let playbackMode = false;
        let socketOpen = false;

        let ws = new WebSocket("ws://localhost:8000", "protocolOne");
        // let ws = new WebSocket("wss://ws.visualive.io/", "protocolOne");

        let joinSession = () => {
            sendMessage({
                type: 'join',
                clientData: clientData,
                projectID: projectID,
                sessionID: sessionID
            });
            sendMessage({
                type: 'viewChanged',
                data: {
                    interfaceType: 'MouseAndKeyboard',
                    viewXfo: renderer.getViewport().getCamera().getGlobalXfo()
                }
            });
        }

        let sendMessage = (message) => {
            if (socketOpen) {
                if (message)
                    convertValuesToJSON(message);
                ws.send(JSON.stringify(message));
            }
        }

        ws.onopen = (event) => {
            renderer.getScene().getResourceLoader().allResourcesLoaded.connect(()=>{
                socketOpen = true;
                joinSession();
            });
        };
        ws.onerror = (event) => {
            console.log("Websocket Error:" + event);
        };
        ws.onclose = (event) => {
            socketOpen = false;
            console.log("Websocket closed.")
        };
        ws.onmessage = (message) => {
            let jsonData = JSON.parse(message.data);

            convertValuesFromJSON(jsonData.data);
            // console.log("onmessage:" + jsonData.type + " client:" + jsonData.client);
            if (listeners[jsonData.type]) {
                listeners[jsonData.type](jsonData.client, jsonData.data);
            }
        };

        ////////////////////////////////////
        // Sending Messages

        let resetXfos = {};

        renderer.getCollector().itemTransformChanged.connect((treeItem, prevXfo) => {
            if (playbackMode) {
                return
            }
            if (!updatingTreeXfos) {
                let path = treeItem.getPath();
                // Only propagate changes to the scene tree..
                if (path.startsWith('root')) {
                    if(!resetXfos[path]) {
                        resetXfos[path] = prevXfo;
                        sendMessage({
                            type: 'resetTreeItemGlobalXfo',
                            data: {
                                path,
                                xfo: prevXfo
                            }
                        });
                    }
                    let xfo = treeItem.getGlobalXfo();
                    if (socketOpen) {
                        sendMessage({
                            type: 'treeItemGlobalXfoChanged',
                            data: {
                                path,
                                xfo
                            }
                        });
                    }
                }
            }
        });

        renderer.viewChanged.connect((data) => {
            if (playbackMode) {
                return
            }
            // convert the data type to raw json and send to the server.
            if (socketOpen) {
                sendMessage({
                    type: 'viewChanged',
                    data: data
                });
            }
        });

        renderer.pointerMoved.connect((data) => {
            if (playbackMode) {
                return
            }
            // convert the data type to raw json and send to the server.
            if (socketOpen) {
                sendMessage({
                    type: 'pointerMoved',
                    data: data
                });
            }
        });

        renderer.actionStarted.connect((msg) => {
            if (playbackMode) {
                return
            }
            if (msg.type == 'strokeStarted') {
                let myMarker = connectedUsers[myId].userMarker;
                let data = msg.data;
                data.color.fromJSON(clientData.color);
                data.id = myMarker.startStroke(data.xfo, data.color, data.thickness);
            }
            if (socketOpen)
                sendMessage(msg);
        });
        renderer.actionOccuring.connect((msg) => {
            if (playbackMode) {
                return
            }
            if (msg.type == 'strokeSegmentAdded') {
                let myMarker = connectedUsers[myId].userMarker;
                let data = msg.data;
                data.id = myMarker.addSegmentToStroke(data.xfo);
            }
            if (socketOpen)
                sendMessage(msg);
        });
        renderer.actionEnded.connect((msg) => {
            if (playbackMode) {
                return
            }
            if (msg.type == 'strokeEnded') {
                let myMarker = connectedUsers[myId].userMarker;
                msg.data = {
                    id: myMarker.endStroke()
                };
            }
            if (socketOpen)
                sendMessage(msg);
        });


        ////////////////////////////////////
        // Recieving Messages

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
                    listeners.viewChanged(event.client, event.data);
                    break;
                case 'pointerMoved':
                    onUserPointerMoved(event.client, event.data);
                    break;
                case 'strokeStarted':
                    listeners.strokeStarted(event.client, event.data);
                    break;
                case 'strokeSegmentAdded':
                    listeners.strokeSegmentAdded(event.client, event.data);
                    break;
                case 'resetTreeItemGlobalXfo':
                case 'treeItemGlobalXfoChanged':
                    listeners.treeItemGlobalXfoChanged(event.data);
                    break;

            }
        }

        listeners.sessionUpdate = (client, data) => {
            // for (let clientData of data.clients) {
            //     if (clientData.id != myId) {
            //         onUserConnected(clientData.id, clientData);
            //     }
            // }
            // Note: this method updates a newly connected user
            // to the current state of the session. We really only
            // need the latest head positions, and all the line drawing.
            // TODO: Optimize this later once sessions get long.
            // Note: if a user re-joins a session they were previously
            for (let eventData of data.events) {
                handleEvent(eventData.event);
            }
        };

        listeners.joinClient = (client, data) => {
            if (!connectedUsers[client]) {
                onUserConnected(client, data);
            }
        };

        listeners.clientDisconnect = (client, data) => {
            onUserDisconnected(client);
        };

        listeners.viewChanged = (client, data) => {
            connectedUsers[client].onViewChange(data);
            renderer.requestRedraw();
        };

        listeners.strokeStarted = (client, data) => {
            let userMarker = connectedUsers[client].userMarker;
            userMarker.startStroke(data.xfo, data.color, data.thickness, data.id);
        };

        listeners.strokeSegmentAdded = (client, data) => {
            let userMarker = connectedUsers[client].userMarker;
            userMarker.addSegmentToStroke(data.xfo, data.id);
        };

        listeners.startRecording = (client, data) => {
            this.sessionModeChanged.emit(1);
        };

        listeners.endRecording = (client, data) => {
            this.sessionModeChanged.emit(2);
        };

        listeners.treeItemGlobalXfoChanged = (data) => {
            updatingTreeXfos = true;
            let resolvedItem = renderer.getScene().getRoot().resolvePath(data.path);
            resolvedItem.setGlobalXfo(data.xfo);
            updatingTreeXfos = false;
        }


        listeners.projectAnalytics = (client, data) => {
            onAnalyticsDataRecieved(data);
        }

        ////////////////////////////////////////////////////////
        // Handle connections from other users.

        let onUserConnected = (client, data) => {
            if (client in connectedUsers) {
                connectedUsers[client].setVisibility(true);
            } else {
                connectedUsers[client] = new UserAvatar(client, data, avatarsTreeRoot, this.scaleFactor, true, commonResources);
            }
        };

        let onUserDisconnected = (client) => {
            if (client in connectedUsers) {
                connectedUsers[client].setVisibility(false);
                renderer.requestRedraw();
            }
        };

        let onUserPointerMoved = (client, data) => {
            connectedUsers[client].pointerMoved(data);
            renderer.requestRedraw();
        };


        ////////////////////////////////////////////////////////
        // Playback
        let isPlaying = false;
        let sessionTime = 0;
        let currEventId = 0;
        let actualRecording = null;
        let replayData = null;

        // After joining, or finishing a recording
        // we recieve the recording data from the server.
        listeners.replayData = (client, data) => {
            replayData = data;
            // console.log('replayDataRecieved:' + replayData);
            this.replayDataRecieved.emit(replayData, playbackMode);
            this.setSessionTime(0);
        };

        let resetState = () => {
            console.log("resetState");
            currEventId = 0;
            changedGlobalXfos = {};
            userData = {};

            // TODO: moved geoms myst be rest to starting positions.
            Object.keys(connectedUsers).forEach((key) => {
                connectedUsers[key].userMarker.clear();
                // onUserDisconnected(key);
            });
        }

        this.newSession = () => {

            // Keep users, but reset all changes.
            // TODO: moved geoms myst be rest to starting positions.
            Object.keys(connectedUsers).forEach((key) => {
                connectedUsers[key].userMarker.clear();
            });

            sessionID = guid();
            sessionStorage.setItem('sessionID', sessionID);
            this.setPlaybackMode(false);
        }

        // this.startRecording = () => {
        //     sendMessage({
        //         type: 'startRecording'
        //     });
        // }

        // this.endRecording = () => {
        //     sendMessage({
        //         type: 'endRecording'
        //     });
        // }

        this.setPlaybackMode = (mode) => {
            playbackMode = mode;
            if (playbackMode) {
                myAvatar.setVisibility(true);
                resetState();
                sendMessage({
                    type: 'leaveSession'
                });
                sendMessage({
                    type: 'getPlaybackData',
                    projectID,
                    sessionID
                });
            } else {
                myAvatar.setVisibility(false);
                joinSession();
                this.playbackModeChanged.emit(playbackMode);
            }
        }

        let prevSessionTime = 0;
        let changedGlobalXfos = {};
        let userData = {};
        let advanceState = () => {
            // If playing has progressed passed the end of the recoded data, just return
            if (sessionTime >= replayData.duration) {
                return;
            }
            if (sessionTime < prevSessionTime) {
                resetState();
                return;
            }
            // while (currEventId < replayData.events.length - 1) {
            //     const eventData = replayData.events[currEventId];
            //     if (sessionTime < eventData.timestamp || currEventId == replayData.events.length - 1) {
            //         break;
            //     }

            //     // if (!connectedUsers[eventData.client]) {
            //     //     onUserConnected(eventData.client, replayData.clients[eventData.client].color);
            //     // }

            //     handleEvent(eventData.event);
            //     currEventId++
            // }


            while (currEventId < replayData.events.length - 1) {
                const eventData = replayData.events[currEventId];
                if (sessionTime < eventData.timestamp || currEventId == replayData.events.length - 1) {
                    break;
                }

                // if (!connectedUsers[eventData.client]) {
                //     onUserConnected(eventData.client, replayData.clients[eventData.client].color);
                // }

                let event = eventData.event;
                console.log(event.type);
                switch (event.type) {
                    case 'joinClient':
                        if (!userData[event.client]) {
                            userData[event.client] = { clientData: event.data } ;
                        }
                        break;
                    case 'clientDisconnect':
                        if (connectedUsers[event.client]) {
                            // onUserDisconnected(event.client);
                            delete userData[event.client]
                        }
                        break;
                    case 'viewChanged':
                        userData[event.client].view = event.data;
                        break;
                    case 'pointerMoved':
                        userData[event.client].pointer = event.data;
                        break;
                    case 'strokeStarted':
                        listeners.strokeStarted(event.client, event.data);
                        break;
                    case 'strokeSegmentAdded':
                        listeners.strokeSegmentAdded(event.client, event.data);
                        break;
                    case 'resetTreeItemGlobalXfo':
                    case 'treeItemGlobalXfoChanged':
                        changedGlobalXfos[event.data.path] = event.data.xfo;
                        break;

                }
                currEventId++
            }

            for(let clientId in userData){
                if (!connectedUsers[clientId]) {
                    onUserConnected(clientId, userData[clientId].clientData);
                }
                if(userData[clientId].view){
                    listeners.viewChanged(clientId, userData[clientId].view);
                }
                // if(userData[clientId].pointer){
                //     listeners.pointerMoved(clientId, userData[clientId].pointer);
                // }
            }

            updatingTreeXfos = true;
            for(let path in changedGlobalXfos){
                let resolvedItem = renderer.getScene().getRoot().resolvePath(path);
                resolvedItem.setGlobalXfo(changedGlobalXfos[path]);
            }
            updatingTreeXfos = false;

            prevSessionTime = sessionTime;
        }

        this.setSessionTime = (time) => {
            // console.log("setSessionTime:" + time);
            if (isPlaying) {
                this.stopPlaying();
                isPlaying = false;
            }

            sessionTime = time;
            advanceState();
            this.sessionTimeChanged.emit(sessionTime);
        }

        let prevT;
        let incrementTime = () => {
            let now = Date.now();
            sessionTime += (now - prevT);
            advanceState();
            this.sessionTimeChanged.emit(sessionTime);
            if (sessionTime >= replayData.duration) {
                this.stopPlaying();
            }
            prevT = now;
        }
        this.startPlaying = () => {
            // console.log("startPlaying");
            isPlaying = true;
            prevT = Date.now();
            renderer.redrawOccured.connect(incrementTime);
            renderer.startContinuousDrawing();
        }

        this.isPlaying = () => {
            return isPlaying;
        }

        this.stopPlaying = () => {
            // console.log("stopPlaying");
            isPlaying = false;
            renderer.stopContinuousDrawing();
            renderer.redrawOccured.disconnect(incrementTime);
        }

        this.loadSessionRecording = (resourcePath) => {
            renderer.getScene().getResourceLoader().loadResource(resourcePath, (data)=>{
                this.setPlaybackMode(true);
                replayData = data;
                // console.log('replayDataRecieved:' + replayData);
                this.replayDataRecieved.emit(replayData, playbackMode);
                this.setSessionTime(0);
            })
        }

        /////////////////////////////////////////////////
        // Analytics Display
        let analyticsPass = undefined;
        let onAnalyticsDataRecieved = (data) => {
            function _base64ToArrayBuffer(base64) {
                var binary_string = window.atob(base64);
                var len = binary_string.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
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
                projectID
            });
        }
        let removeAnalytics = () => {
            renderer.removePass(analyticsPass);
            analyticsPass.destroy();
        }

        this.toggleAnalytics = () => {
            if (!analyticsPass)
                requestAnalytics();
            else
                removeAnalytics();
        };

        /////////////////////////////////////////////////
        // Hotkeys

        renderer.keyPressed.connect((key) => {
            switch (key) {
                case '?':
                    this.toggleAnalytics();
                    return true;
                case '<':
                    downloadData(sessionID + '.json', 'text/plain', JSON.stringify(replayData));
                    return true;
            }
        });
    }

};

export {
    SessionClient
};