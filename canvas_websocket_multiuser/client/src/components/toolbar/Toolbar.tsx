import React, { useCallback, ChangeEvent, MouseEvent } from 'react';

import './toolbar.less';
import { toolState } from "../../store/toolStore";
import { Brush, Rect, Circle, Line, Eraser } from "../../tools";

import { canvasState } from "../../store/canvasStore";

export const Toolbar = () => {
  const onColorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    toolState.setFillColor(e.target.value)
  }, []);

  const onDownloadClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const canvas = canvasState.canvas;

    if (!canvas) {
      return;
    }

    const dataUrl = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = canvasState.sessionId + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } , []);

  return (
    <div className="toolbar">
      <button
        className="toolbar-button btn-brush"
        onClick={() => canvasState.canvas && toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
      />
      <button
        className="button toolbar-button btn-rect"
        onClick={() => canvasState.canvas && toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
      />
      <button
        className="button toolbar-button btn-circle"
        onClick={() => canvasState.canvas && toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
      />
      <button
        className="button toolbar-button btn-eraser"
        onClick={() => canvasState.canvas && toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
      />
      <button
        className="button toolbar-button btn-line"
        onClick={() => canvasState.canvas && toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
      />
      <input
        type="color"
        className="button toolbar-button btn-color"
        onChange={onColorChange}
      />
      <button
        className="button toolbar-button btn-undo"
        onClick={() => canvasState.undo()}
      />
      <button
        className="button toolbar-button btn-redo"
        onClick={() => canvasState.redo()}
      />
      <button
        className="button toolbar-button btn-save"
        onClick={onDownloadClick}
      />

    </div>
  );
};
