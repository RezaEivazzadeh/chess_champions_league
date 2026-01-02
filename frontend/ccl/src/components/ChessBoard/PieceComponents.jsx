// PieceComponents.js
import React from 'react';

// Base piece component
const Piece = ({ type, color }) => {
  const pieceSymbols = {
    K: { w: '♔', b: '♚' },
    Q: { w: '♕', b: '♛' },
    R: { w: '♖', b: '♜' },
    B: { w: '♗', b: '♝' },
    N: { w: '♘', b: '♞' },
    P: { w: '♙', b: '♟' }
  };

  return (
    <span className={`piece ${color === 'w' ? 'white-piece' : 'black-piece'}`}>
      {pieceSymbols[type][color]}
    </span>
  );
};

// Individual piece components for rendering
export const King = (props) => <Piece type="K" {...props} />;
export const Queen = (props) => <Piece type="Q" {...props} />;
export const Rook = (props) => <Piece type="R" {...props} />;
export const Bishop = (props) => <Piece type="B" {...props} />;
export const Knight = (props) => <Piece type="N" {...props} />;
export const Pawn = (props) => <Piece type="P" {...props} />;