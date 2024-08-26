import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { canvasState } from '../../store/canvasStore';
import { toolState } from '../../store/toolStore';
import { Brush } from '../../tools';

import './canvas.less';

export const Canvas = observer(() => {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined> = useRef();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current as HTMLCanvasElement));
  }, [])

  const onMouseDown = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  };

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef as React.MutableRefObject<HTMLCanvasElement>}
        width={640}
        height={480}
        onMouseDown={onMouseDown}
      />
    </div>
  );
});
