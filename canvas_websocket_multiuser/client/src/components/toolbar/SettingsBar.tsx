import React from 'react';

import './toolbar.less';

export const SettingsBar = () => {
  return (
    <div className="settings-bar toolbar">
      <div className='settings-bar-input-wrapper'>
        <span className="settings-bar-label">Line thickness: </span>
        <input type='number' min='1' max='50'/>
      </div>
      <div className='settings-bar-input-wrapper'>
        <span className="settings-bar-label">Border color: </span>
        <input type="color" className="button btn-color"/>
      </div>
    </div>
  );
};
