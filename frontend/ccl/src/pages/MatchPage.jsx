import React from 'react';
import './MatchPage.css';
import ChessBoard from '../components/ChessBoard/ChessBoard';
import MovementHistory from '../components/ChessBoard/MovementHistory';
import GameInfo from '../components/ChessBoard/GameInfo';

const MatchPage = () => {
  return (
    <div className="match-page">
      <header className="match-header">
        <h1 className="match-title">
          <span className="neon-text">CHESS</span> ARENA
        </h1>
      </header>
      
      <main className="match-content">
        <div className="left-panel">
          <MovementHistory />
        </div>
        
        <div className="center-panel">
          <ChessBoard />
        </div>
        
        <div className="right-panel">
          <GameInfo />
        </div>
      </main>
    </div>
  );
};

export default MatchPage;