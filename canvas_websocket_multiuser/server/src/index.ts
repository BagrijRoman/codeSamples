import express from 'express';
import expressWs from 'express-ws';
import { WebSocket } from 'ws';

// !!!!!!!!  todo decompose file

const { app, getWss, applyTo } = expressWs(express());
const aWss = getWss();
const PORT = process.env.PORT || 5005;

interface ClientWebSocket extends WebSocket {
  id?: string;
}

app.listen(PORT, () => {
  console.log(`Listening on port ${ PORT }`);
});

app.all('/test', (req: express.Request, res: express.Response) => res.json({ serverStatus: "Ok" }))


app.ws('/', (ws: ClientWebSocket, req) => {
  console.log('new ws connection was established');
  ws.send(JSON.stringify({
    method: 'info',
    message: 'You was successfully connected'
  }));

  ws.on('message', (message: string) => {
    const msg = JSON.parse(message);

    switch (msg.method) {
      case 'connection': {
        connectionHandler(ws, message);
        break;
      }

      case 'draw': {
        broadcastMessage(ws, message);
        break;
      }

      default: {
        break;
      }
    }
  });
});


const connectionHandler = (ws: ClientWebSocket, message: string) => {
  const msg = JSON.parse(message);
  ws.id = msg.id;
  broadcastConnection(ws, message);
}

const broadcastMessage = (ws: ClientWebSocket, message: string) => {
  const msg = JSON.parse(message);
  aWss.clients.forEach((client: ClientWebSocket) => {
    if (client.id === msg.id) {
      client.send(message);
    }
  })
}

const broadcastConnection = (ws: ClientWebSocket, message: string) => {
  const msg = JSON.parse(message);
  aWss.clients.forEach((client: ClientWebSocket) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify({
        method: 'connection',
        message: `User: ${msg.userName} was connected`,
      }));
    }
  })
}

