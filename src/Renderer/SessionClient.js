
import * from UserAvatar;

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

    constructor(id, color, renderer) {
        this.__id = id;
        this.__replayData = null;
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

        this.__sessionID = getUrlVars()['id'];
        if (!this.__sessionID) {
            this.generateSessionID();
        }


        const clientsList = document.createElement('div');
        clientsList.style.position = 'fixed';
        clientsList.style.left = '20px';
        clientsList.style.bottom = '20px';
        clientsList.style.padding = '20px';
        clientsList.style.backgroundColor = 'silver';
        domElement.appendChild(clientsList);

        const requestStateButton = document.createElement('button');
        requestStateButton.style.position = 'fixed';
        requestStateButton.style.right = '20px';
        requestStateButton.style.bottom = '20px';
        requestStateButton.style.padding = '20px';
        requestStateButton.innerText = 'Request State';
        domElement.appendChild(requestStateButton);

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
}