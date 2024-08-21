import React from 'react';

import { Canvas, Toolbar, SettingsBar } from './components';

import './styles/app.less';

export const App = () => {

  return (
    <div>
      <Toolbar/>
      <SettingsBar/>
      <Canvas/>
    </div>
  );
};