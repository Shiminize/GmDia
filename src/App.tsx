import React from 'react';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import ReactPlugin from '@stagewise-plugins/react';
// ... other existing imports

function App() {
  // ...existing code
  return (
    <>
      {/* Stagewise Toolbar: only shows in development */}
      <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      {/* ...rest of your app */}
      <Router>
        {/* ...rest of your Router and app content ... */}
      </Router>
    </>
  );
}

export default App; 