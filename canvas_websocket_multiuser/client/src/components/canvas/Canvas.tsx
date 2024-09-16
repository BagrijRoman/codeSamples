import React from 'react';

import { InputNameModal } from './InputNameModal';

import './canvas.less';

interface ICanvasProps {
  setUserName: (userName: string) => void,
  canvasRef: React.RefObject<HTMLCanvasElement | undefined>,
  onMouseDown: () => void;
}

export const Canvas = (props: ICanvasProps) => {
  const {
    setUserName,
    canvasRef,
    onMouseDown,
  } = props;

  return (
    <div className="canvas">
      <InputNameModal
        setUserName={setUserName}
      />
      <canvas
        ref={canvasRef as React.MutableRefObject<HTMLCanvasElement>}
        width={640}
        height={480}
        onMouseDown={onMouseDown}
      />
    </div>
  );
};
