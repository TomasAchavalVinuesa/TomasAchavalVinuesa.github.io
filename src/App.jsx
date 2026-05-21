import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { LoginScreen } from './pages/LoginScreen';
import { ScanSimulation } from './pages/ScanSimulation';
import { MainMenu } from './pages/MainMenu';
import { TurnosModule } from './pages/TurnosModule';
import { RecetasModule } from './pages/RecetasModule';
import { ImpresionSuccess } from './pages/ImpresionSuccess';
import { AyudaModule } from './pages/AyudaModule';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/scan/dni" element={<ScanSimulation type="dni" />} />
        <Route path="/scan/face" element={<ScanSimulation type="face" />} />
        <Route path="/scan/huella" element={<ScanSimulation type="huella" />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/turnos" element={<TurnosModule />} />
        <Route path="/recetas" element={<RecetasModule />} />
        <Route path="/impresion" element={<ImpresionSuccess />} />
        <Route path="/ayuda" element={<AyudaModule />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
