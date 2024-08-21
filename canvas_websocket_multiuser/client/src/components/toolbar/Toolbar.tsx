import React from 'react';

import './toolbar.less';

export const Toolbar = () => {
  return (
    <div className="toolbar">
      <button className="toolbar-button btn-brush"/>
      <button className="button toolbar-button btn-rect"/>
      <button className="button toolbar-button btn-circle"/>
      <button className="button toolbar-button btn-eraser"/>
      <button className="button toolbar-button btn-line"/>
      <input type="color" className="button toolbar-button btn-color"/>
      <button className="button toolbar-button btn-undo"/>
      <button className="button toolbar-button btn-redo"/>
      <button className="button toolbar-button btn-save"/>

    </div>
  );
};
