import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './ElectionMap';
import App2 from './CountyMap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>
);
