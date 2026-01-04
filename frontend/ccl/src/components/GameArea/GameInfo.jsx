// GameInfo.jsx
import React from 'react';
import './ChessBoard.css';

const GameInfo = ({ 
  currentTurn, 
  gameStatus, 
  moveHistory, 
  onDraw, 
  onSurrender 
}) => {
  return (
    <div className="game-info">
      <div className="turn-indicator">
        Current Turn: {currentTurn === 'w' ? 'White' : 'Black'}
      </div>
      {gameStatus.isCheck && !gameStatus.isCheckmate && (
        <div className="check-warning">Check!</div>
      )}
      {gameStatus.isCheckmate && (
        <div className="checkmate-message">
          {gameStatus.winner === 'w' ? 'White' : 'Black'} wins!
        </div>
      )}
      <MoveHistory moves={moveHistory} />
      <div className="game-buttons">
        <button className="game-button draw-button" onClick={onDraw}>Draw</button>
        <button className="game-button surrender-button" onClick={onSurrender}>Surrender</button>
      </div>
    </div>
  );
};

// Move history component
const MoveHistory = ({ moves }) => {
  return (
    <div className="move-history">
      <h3>Move History</h3>
      <div className="moves-container">
        {moves.length === 0 ? (
          <p className="no-moves">No moves yet</p>
        ) : (
          <ul className="moves-list">
            {moves.map((move, index) => (
              <li key={index} className={`move-item ${move.player}`}>
                <span className="move-notation">{move.notation}</span>
                <span className="move-time">{move.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameInfo;