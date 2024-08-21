import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { canvasState } from '../../store/canvasStore';
import { toolStore } from '../../store/toolStore';
import { Brush } from '../../tools/Brush';

import './canvas.less';

export const Canvas = observer(() => {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined> = useRef();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolStore.setTool(new Brush(canvasRef.current as HTMLCanvasElement));
  }, [])

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef as React.MutableRefObject<HTMLCanvasElement>}
        width={640}
        height={480}
      />

    </div>
  );
});
