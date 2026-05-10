import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails';
import KPIsPage from './pages/KPIsPage';
import KPIDetails from './pages/KPIDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        background: '#f4f7fb',
        fontFamily: 'Arial'
      }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/kpis" element={<KPIsPage />} />
          <Route path="/kpis/:id" element={<KPIDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
