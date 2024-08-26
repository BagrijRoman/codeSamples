import { makeAutoObservable } from 'mobx';

class CanvasState {
  canvas = null;
  undoList: string[] = [];
  redoList: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: any) {
    this.canvas = canvas;
  }

  pushToUndo(data: string) {
    this.undoList.push(data as string);
  }

  pushToRedo(data: string) {
    this.redoList.push(data as string);
  }

  undo() {
    const ctx = this.canvas.getContext('2d');
    if (this.undoList.length > 0) {
      const dataUrl: string = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      }
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    const ctx = this.canvas.getContext('2d');
    if (this.redoList.length > 0) {
      const dataUrl: string = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }
}

export const canvasState = new CanvasState();
