


var ws = new WebSocket("ws://108.59.85.106:5000", "proteocolOne");

ws.onopen = function (event) {
  ws.send("Here's some text that the server is urgently awaiting!");
};

ws.onmessage = function (event) {
  console.log(event.data);
};