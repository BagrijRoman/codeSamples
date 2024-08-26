export class Tool {
  canvas;
  ctx;

  constructor(canvas: any) {
    this.canvas = canvas;
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

  destroyListeners() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}