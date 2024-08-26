import React from 'react';

import { toolState } from '../../store/toolStore'

import './toolbar.less';

export const SettingsBar = () => {
  const onLineWidthChange = (e: React.ChangeEventHandler<HTMLInputElement>) => {
    toolState.setLineWidth(e.target.value);
  }

  const onChangeBorderColor = (e: React.ChangeEventHandler<HTMLInputElement>) => {
    toolState.setStrokeColor(e.target.value);
  }

  return (
    <div className="settings-bar toolbar">
      <div className='settings-bar-input-wrapper'>
        <span className="settings-bar-label">Line thickness: </span>
        <input
          type='number'
          min='1'
          max='50'
          defaultValue={5}
          onChange={onLineWidthChange}
        />
      </div>
      <div className='settings-bar-input-wrapper'>
        <span className="settings-bar-label">Border color: </span>
        <input
          type="color"
          className="button btn-color"
          onChange={onChangeBorderColor}
        />
      </div>
    </div>
  );
};
