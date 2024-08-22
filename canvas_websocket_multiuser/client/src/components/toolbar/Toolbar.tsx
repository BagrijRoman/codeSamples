import React from 'react';

import './toolbar.less';
import { toolState } from "../../store/toolStore";
import { Brush, Rect, Circle, Line } from "../../tools";

import { canvasState } from "../../store/canvasStore";

export const Toolbar = () => {
  return (
    <div className="toolbar">
      <button
        className="toolbar-button btn-brush"
        onClick={() => canvasState.canvas && toolState.setTool(new Brush(canvasState.canvas))}
      />
      <button
        className="button toolbar-button btn-rect"
        onClick={() => canvasState.canvas && toolState.setTool(new Rect(canvasState.canvas))}
      />
      <button
        className="button toolbar-button btn-circle"
        onClick={() => canvasState.canvas && toolState.setTool(new Circle(canvasState.canvas))}
      />
      <button className="button toolbar-button btn-eraser"/>
      <button
        className="button toolbar-button btn-line"
        onClick={() => canvasState.canvas && toolState.setTool(new Line(canvasState.canvas))}
      />
      <input type="color" className="button toolbar-button btn-color"/>
      <button className="button toolbar-button btn-undo"/>
      <button className="button toolbar-button btn-redo"/>
      <button className="button toolbar-button btn-save"/>

    </div>
  );
};
