const VisualivePlatform = () => {
  const listener = {};
  let isReady = false;
  let user = {
    id: 1234
  }

  setTimeout(()=>{
    isReady = true;
    triggerEvents('ready', [], user);
  }, 500)

  const sendMessage = (message, store) => {
    const messageToSend = { payload: message, store: store || false };
    const messageText = JSON.stringify(messageToSend);
    // socket.send(messageText);
  };
  const onUserJoin = (user) => {
    triggerEvents('join', user);
  };

  const onUserLeave = (user) => {
    triggerEvents('leave', user);
  };

  const triggerEvents = (event, data, user) => {
    const handlers = listener[event] || [];
    for (var i = 0; i < handlers.length; i++) {
      handlers[i](data, user);
    }
  };
  return {
    on: (type, handler) => {
      if (type === 'ready' && isReady) {
        // immedietly trigger the ready handler
        handler();
      }
      else {
        listener[type] = listener[type] || [];
        listener[type].push(handler);
      }
    },
    off: (type, handlerToRemove) => {
      listener[type] = listener[type] || [];
      listener[type] = listener[type].filter(handler => handler !== handlerToRemove);
    },
    sendMessage: sendMessage
  };

};