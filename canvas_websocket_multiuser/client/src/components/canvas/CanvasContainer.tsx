import React, { useEffect, useRef, useState } from 'react';
import { observer } from "mobx-react-lite";
import { notification } from 'antd';
import { useParams } from 'react-router-dom';

import { Canvas } from './Canvas';
import { canvasState } from "../../store/canvasStore";
import { toolState } from "../../store/toolStore";
import { Brush } from "../../tools";

export const CanvasContainer = observer(() => {
  const [userName, setUserName] = useState<string>('');

  const params = useParams();
  const canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined> = useRef();
  const [notificationInst, notificationContextHolder] = notification.useNotification();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);

  }, [])

  const onMouseDown = () => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
  };

  useEffect(() => {
    if (userName && userName.length) {
      const sessionId = params.id as string;
      const socket = new WebSocket('ws://localhost:5005');

      toolState.setTool(new Brush(canvasRef.current as HTMLCanvasElement, socket, sessionId));

      canvasState.setSessionId(sessionId as string);
      canvasState.setUserName(userName);
      canvasState.setSocket(socket);

      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: sessionId,
          userName,
          method: "connection",
        }));
      };

      socket.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);

        switch (message.method) {
          case "info":
          case "connection": {
            notificationInst.info({
              message: message.message,
              placement: "topRight"
            });
            break;
          }
          case "draw": {
            drawHandler(message);
            break;
          }

          default: break;
        }
      };
    }
  }, [userName]);

  // todo add types
  const drawHandler = (message) => {
    const { figure } = message

    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;

    switch (figure.type) {
      case "brush": {
        Brush.draw(ctx, figure.x, figure.y);
        break;
      }
      case "finish": {
        ctx.beginPath();
        break;
      }

      default: break;
    }
  };


  return (
    <>
      {notificationContextHolder}
      <Canvas
        setUserName={setUserName}
        canvasRef={canvasRef}
        onMouseDown={onMouseDown}
      />
    </>

  );
});
