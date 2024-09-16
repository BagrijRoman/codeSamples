
interface IBroadcastActionData {
  method: "draw",
  figure?: {
    type: "brush" | "finish",
    x?: number,
    y?: number,
  }
}

export class Tool {
  canvas;
  ctx;
  socket: WebSocket;
  sessionId: string;

  constructor(canvas: any, socket: WebSocket, sessionId: string) {
    this.canvas = canvas;
    this.socket = socket;
    this.sessionId = sessionId;
    this.ctx = this.canvas.getContext('2d');
    this.destroyListeners();
  }

  set fillColor(color: string) {
    this.ctx.fillStyle = color;
  }

  set strokeColor(color: string) {
    this.ctx.strokeStyle = color;
  }

  set lineWidth(lineWidth: number) {
    this.ctx.lineWidth = lineWidth;
  }

  broadCastAction(broadcastData: IBroadcastActionData) {
    this.socket.send(
      JSON.stringify({
        id: this.sessionId,
        ...broadcastData,
      })
    );
  }

  destroyListeners() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}