import React from "react";

import { Tool } from './Tool';

export class Eraser extends Tool {
  mouseDown: boolean;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId);
    this.listen();
    this.mouseDown = false;
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(event: MouseEvent) {
    this.mouseDown = false;
  }

  mouseDownHandler(event: React.MouseEvent<CanvasRect>) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.globalCompositeOperation="destination-out";
    // @ts-ignore
    this.ctx.moveTo(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop)
  }

  mouseMoveHandler(event: React.MouseEvent<CanvasRect>) {
    if (this.mouseDown) {
      // @ts-ignore
      this.draw(event.clientX - event.target.offsetLeft, event.pageY - event.target.offsetTop);
    }
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
