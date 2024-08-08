const ws = require('ws');

const PORT = 7005;

const wsServer = new ws.WebSocketServer({
  port: PORT,
}, () => {
  console.log(`WS server start on port: ${PORT}`);
})

wsServer.on('connection', (wsConnection) => {
  wsConnection.on('message', (messageString) => {
    const message = JSON.parse(messageString);

    switch (message.event) {
      case 'message': {
        broadcastMessage(message);
        break;
      }

      case 'connection': {
        broadcastMessage(message);
        break;
      }

      default:
        break;
    }
  })
});

const broadcastMessage = (message) => {
  wsServer.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  })
}
