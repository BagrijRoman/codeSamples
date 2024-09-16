
interface IBroadcastFigureData {
  type: "brush" | "rect" | "finish",
  x?: number,
  y?: number,
  width?: number,
  height?: number,
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

  broadCastDrawAction(figure: IBroadcastFigureData) {
    this.socket.send(
      JSON.stringify({
        id: this.sessionId,
        method: "draw",
        figure,
      })
    );
  }

  destroyListeners() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}