import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Canvas, Toolbar, SettingsBar } from './components';

import './styles/app.less';

export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:id"
          element={
            <div>
              <Toolbar/>
              <SettingsBar/>
              <Canvas/>
            </div>
          }
        />
        <Route
          path="*"
          element={ <Navigate to={ `/f${ (+new Date).toString(16)}`} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};