import React from 'react';
import Chessboard from '../ChessBoard/ChessBoard';
import './GameArea.css';


const GameArea = () => {
  return (
    <div className="game-area">
      <Chessboard />
      <div className="game-info">
        <h2>Your Turn</h2>
        <p>Opponent: Magnificent_Carrot</p>
        <p>Time: 5:00</p>
      </div>
    </div>
  );
};

export default GameArea;