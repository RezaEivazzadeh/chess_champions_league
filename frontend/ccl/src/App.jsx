import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import MatchPage from './pages/MatchPage';
import MatchHistoryPage from './pages/MatchHistoryPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/history" element={<MatchHistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;