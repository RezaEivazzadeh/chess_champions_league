import React, { useState } from 'react';
import './MovementHistory.css';

const MovementHistory = () => {
  const [moves, setMoves] = useState([
    { id: 1, move: 'e4', player: 'white' },
    { id: 2, move: 'e5', player: 'black' },
    { id: 3, move: 'Nf3', player: 'white' },
    { id: 4, move: 'Nc6', player: 'black' },
    { id: 5, move: 'Bb5', player: 'white' },
    { id: 6, move: 'a6', player: 'black' },
    { id: 7, move: 'Ba4', player: 'white' },
    { id: 8, move: 'Nf6', player: 'black' },
    { id: 9, move: 'O-O', player: 'white' },
    { id: 10, move: 'Be7', player: 'black' },
    { id: 11, move: 'Re1', player: 'white' },
    { id: 12, move: 'b5', player: 'black' },
    { id: 13, move: 'Bb3', player: 'white' },
    { id: 14, move: 'd6', player: 'black' },
    { id: 15, move: 'c3', player: 'white' },
    { id: 16, move: 'O-O', player: 'black' },
    { id: 17, move: 'h3', player: 'white' },
    { id: 18, move: 'Nb8', player: 'black' },
    { id: 19, move: 'd4', player: 'white' },
    { id: 20, move: 'Nbd7', player: 'black' }
  ]);
  
  const addMove = (move, player) => {
    setMoves([...moves, { id: moves.length + 1, move, player }]);
  };
  
  return (
    <div className="movement-history">
      <div className="history-header">
        <h2 className="history-title">
          <span className="neon-text">MOVEMENT</span> HISTORY
        </h2>
      </div>
      
      <div className="history-content">
        <div className="moves-list">
          {moves.map((move, index) => {
            const moveNumber = Math.floor(index / 2) + 1;
            const isWhiteMove = index % 2 === 0;
            
            return (
              <div key={move.id} className="move-pair">
                {isWhiteMove && (
                  <div className="move-number">{moveNumber}.</div>
                )}
                <div className={`move ${move.player}`}>
                  {move.move}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovementHistory;