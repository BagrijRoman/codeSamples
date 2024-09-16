import React, { Context } from "react";

import { Tool } from './Tool';

export class Brush extends Tool {
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

    this.broadCastAction({
      method: 'draw',
      figure: {
        type: 'finish',
      },
    });
  }

  mouseDownHandler(event: React.MouseEvent<CanvasRect>) {
    this.mouseDown = true;
    this.ctx.beginPath();
    // @ts-ignore
    this.ctx.moveTo(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop)
  }

  mouseMoveHandler(event: React.MouseEvent<CanvasRect>) {
    if (this.mouseDown) {
      // @ts-ignore
      const currentX: number = event.clientX - event.target.offsetLeft;
      // @ts-ignore
      const currentY: number = event.pageY - event.target.offsetTop;

      this.broadCastAction({
        method: 'draw',
        figure: {
          type: "brush",
          x: currentX,
          y: currentY,
        },
      });
    }
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
