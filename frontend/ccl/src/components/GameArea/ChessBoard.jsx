// ChessBoard.jsx
import React from 'react';
import './ChessBoard.css';
import { King, Queen, Rook, Bishop, Knight, Pawn } from './PieceComponents';

// Map piece type character to its React component
const pieceComponents = {
  K: King,
  Q: Queen,
  R: Rook,
  B: Bishop,
  N: Knight,
  P: Pawn
};

const ChessBoard = ({ 
  board, 
  selectedSquare, 
  validMoves, 
  currentTurn, 
  gameStatus, 
  onSquareClick 
}) => {
  const findKingPosition = (color) => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] === `${color}K`) {
          return [r, c];
        }
      }
    }
    return null;
  };

  const kingPosition = findKingPosition(currentTurn === 'w' ? 'b' : 'w');

  const renderPiece = (piece) => {
    if (!piece) return null;
    const pieceType = piece[1];
    const pieceColor = piece[0];
    const PieceComponent = pieceComponents[pieceType];
    return <PieceComponent color={pieceColor} />;
  };

  return (
    <div className="chessboard-3d-container">
      <div className="board-outer-square">
        <div className="board-coordinates-top">
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(file => (
            <div key={file} className="coordinate">{file}</div>
          ))}
        </div>

        <div className="board-middle-container">
          <div className="board-coordinates-left">
            {[8, 7, 6, 5, 4, 3, 2, 1].map(rank => (
              <div key={rank} className="coordinate">{rank}</div>
            ))}
          </div>

          <div className="board-inner-square">
            <div className="chessboard">
              {board.map((row, rowIndex) =>
                row.map((piece, colIndex) => {
                  const isSelected = selectedSquare &&
                    selectedSquare[0] === rowIndex &&
                    selectedSquare[1] === colIndex;

                  const isValidMove = validMoves.some(
                    ([r, c]) => r === rowIndex && c === colIndex
                  );

                  const isKingInCheckSquare = kingPosition &&
                    kingPosition[0] === rowIndex &&
                    kingPosition[1] === colIndex &&
                    gameStatus.isCheck;

                  const isKingInCheckmateSquare = kingPosition &&
                    kingPosition[0] === rowIndex &&
                    kingPosition[1] === colIndex &&
                    gameStatus.isCheckmate;

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'}
                        ${isSelected ? 'selected' : ''}
                        ${isValidMove ? 'valid-move' : ''}
                        ${isKingInCheckSquare ? 'king-in-check' : ''}
                        ${isKingInCheckmateSquare ? 'king-in-checkmate' : ''}`}
                      onClick={() => onSquareClick(rowIndex, colIndex)}
                    >
                      {renderPiece(piece)}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;