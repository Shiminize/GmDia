import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import ReactPlugin from '@stagewise-plugins/react';

function App() {
  return (
    <>
      {/* Stagewise Toolbar: only shows in development */}
      <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;