import {
    Color,
    typeRegistry
} from './Math';
import {
    Signal
} from './Utilities';
import {
    TreeItem
} from './SceneTree/TreeItem';
import {
    SessionParticipant
} from './SessionParticipant.js';

class SessionClient {

    constructor(renderer, visualivePlatform) {

        const onMessage = (message) => {
            const participant = participants[message.userId];
            if (participant) {
                participant.onUserMessage(message);
            }
        }

        const avatarsTreeRoot = new TreeItem("avatarsTreeRoot");
        renderer.getCollector().addTreeItem(avatarsTreeRoot);

        const participants = {};

        visualivePlatform.on('ready', (sessionData, user) => {
            // createAudioHeader(document.body, resources, visualivePlatform);

            participants[user.id] = new SessionParticipant(renderer, visualivePlatform, avatarsTreeRoot, user, true);;

            let localUserCanvasInitialized = false;
            if (sessionData) {
                sessionData.map(message => {
                    if (message.type == 'initUser') {
                        if (message.user.id == user.id) {
                            localUserCanvasInitialized = true;
                        } else if (!participants[message.user.id]) {
                            participants[message.user.id] = new SessionParticipant(renderer, visualivePlatform, avatarsTreeRoot, message.user, false);
                        }
                    } else if (message.userId)
                        onMessage(message);
                });
            }

            if (!localUserCanvasInitialized) {
                // Send a message with user details so that when the session is reloaded
                // the object for this user will be recreated.
                visualivePlatform.sendMessage({
                    type: 'initUser',
                    user
                }, true);
            }

        });

        visualivePlatform.on('peerAudioConnected', (stream, user) => {
            const participant = participants[user.id];
            participant.setAudioStream(stream);
        })

        visualivePlatform.on('message', onMessage);

        visualivePlatform.on('join', (user) => {
            if (!participants[user.id]) {
                participants[user.id] = new SessionParticipant(renderer, visualivePlatform, avatarsTreeRoot, user, false);
            } else {
                // user was already in the session.
                participants[user.id].setAvatarVisibility(true);
            }
        });

        visualivePlatform.on('leave', (user) => {
            // Do nothing....
            // When a user leaves a session we keep diplaying thier data.
            if (participants[user.id])
                participants[user.id].setAvatarVisibility(false);
        });

        visualivePlatform.on('error', error => {
            alert(error);
        })

    }

};

export {
    SessionClient
};