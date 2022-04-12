import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';

function MainApp() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path=":Id" element={<App />} />
      </Routes>
    </Router>
  );
}

export default MainApp;
