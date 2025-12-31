import React from 'react';
import './ChessBoard.css';

// Placeholder for piece Unicode characters
const pieces = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟'
};

const ChessBoard = () => {
  // In a real app, this state would be managed by a game logic library
  const initialBoard = [
    ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
    ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
    ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
  ];

  const handleSquareClick = (row, col) => {
    // This is where you would handle the move
    // and send a request to the backend.
    console.log(`Square clicked: ${row}, ${col}`);
    // Example: fetch('/api/move', { method: 'POST', body: ... })
  };

  return (
    <div className="chessboard-container">
      {initialBoard.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'}`}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          >
            {piece && pieces[piece]}
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;