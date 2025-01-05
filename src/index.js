import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StateMap from './ElectionMap';
import CountyMap from './CountyMap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CountyMap />
    <StateMap />
  </React.StrictMode>
);
