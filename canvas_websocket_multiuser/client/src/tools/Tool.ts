export class Tool {
  canvas;
  ctx;

  constructor(canvas: any) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.destroyListeners();
  }

  destroyListeners() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}