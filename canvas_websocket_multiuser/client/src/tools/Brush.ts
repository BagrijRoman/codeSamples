import { Tool } from './Tool';
import React from "react";

export class Brush extends Tool {
  mouseDown: boolean;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
    this.mouseDown = false;
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(event: MouseEvent) {
    console.log('mouseUpHandler !!!!!!');

    this.mouseDown = false;
  }

  mouseDownHandler(event: React.MouseEvent<CanvasRect>) {

    console.log('mouseDownHandler !!!!!!');

    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.clientX - event.target.offsetTarget, event.pageY - event.target.offsetTop);
  }

  mouseMoveHandler(event: React.MouseEvent<CanvasRect>) {
    if (this.mouseDown) {
      this.draw(event.clientX - event.target.offsetLeft, event.pageY - event.target.offsetTop);
    }
  }

  draw(x: number, y: number) {

    console.log('draw   x ', x, '   y ', y);

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
