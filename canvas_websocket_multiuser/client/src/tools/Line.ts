import React from "react";

import { Tool } from './Tool';

export class Line extends Tool {
  mouseDown: boolean;
  startX: number;
  startY: number;
  savedImg: string;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId);
    this.listen();
    this.mouseDown = false;
    this.startX = 0;
    this.startY = 0;
    this.savedImg = '';
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
    // @ts-ignore
    this.startX = event.pageX - event.target.offsetLeft;
    // @ts-ignore
    this.startY = event.pageY - event.target.offsetTop;
    this.savedImg = this.canvas.toDataURL();
  }

  mouseMoveHandler(event: React.MouseEvent<CanvasRect>) {
    if (this.mouseDown) {
      // @ts-ignore
      const currentX: number = event.pageX - event.target.offsetLeft;
      // @ts-ignore
      const currentY: number = event.pageY - event.target.offsetTop;
      //
      this.draw(this.startX, this.startY, currentX, currentY);

      // this.socket.send(
      //   JSON.stringify({
      //     id: this.sessionId,
      //     method: 'draw',
      //     figure: {
      //       type: "brush",
      //       x: currentX,
      //       y: currentY,
      //     },
      //   })
      // );
    }
  }

  draw(x: number, y: number, endX: number, endY: number) {
    const img = new Image();
    img.src = this.savedImg;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(endX, endY);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
}
