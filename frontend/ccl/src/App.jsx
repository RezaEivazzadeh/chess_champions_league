import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import MatchPage from './pages/MatchPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/match" element={<MatchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;