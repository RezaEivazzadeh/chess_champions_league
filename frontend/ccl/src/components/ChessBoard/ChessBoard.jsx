import React, { useState, useEffect } from 'react';
import './ChessBoard.css';

const ChessBoard = () => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [board, setBoard] = useState(initializeBoard());
  
  function initializeBoard() {
    // Initialize a standard chess board
    const initialBoard = [
      ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
      ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
      ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
    ];
    return initialBoard;
  }
  
  const handleTileClick = (row, col) => {
    if (selectedTile) {
      // If a tile is already selected, move the piece
      if (isValidMove(row, col)) {
        movePiece(selectedTile.row, selectedTile.col, row, col);
      }
      setSelectedTile(null);
      setValidMoves([]);
    } else if (board[row][col]) {
      // Select a piece
      setSelectedTile({ row, col });
      calculateValidMoves(row, col);
    }
  };
  
  const isValidMove = (row, col) => {
    return validMoves.some(move => move.row === row && move.col === col);
  };
  
  const calculateValidMoves = (row, col) => {
    // Simplified valid moves calculation - in a real app, this would be more complex
    const piece = board[row][col];
    if (!piece) return;
    
    const moves = [];
    const pieceType = piece[1];
    const isWhite = piece[0] === 'w';
    
    // This is a very simplified version - real chess logic would be much more complex
    if (pieceType === 'P') { // Pawn
      const direction = isWhite ? -1 : 1;
      const startRow = isWhite ? 6 : 1;
      
      // Move forward one square
      if (row + direction >= 0 && row + direction < 8 && !board[row + direction][col]) {
        moves.push({ row: row + direction, col });
        
        // Move forward two squares from starting position
        if (row === startRow && !board[row + 2 * direction][col]) {
          moves.push({ row: row + 2 * direction, col });
        }
      }
      
      // Capture diagonally
      [-1, 1].forEach(offset => {
        const newCol = col + offset;
        if (newCol >= 0 && newCol < 8 && row + direction >= 0 && row + direction < 8) {
          const target = board[row + direction][newCol];
          if (target && target[0] !== piece[0]) {
            moves.push({ row: row + direction, col: newCol });
          }
        }
      });
    } else if (pieceType === 'N') { // Knight
      const knightMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      
      knightMoves.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const target = board[newRow][newCol];
          if (!target || target[0] !== piece[0]) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      });
    } else if (pieceType === 'B') { // Bishop
      addLineMoves(moves, row, col, 1, 1, piece[0]);
      addLineMoves(moves, row, col, 1, -1, piece[0]);
      addLineMoves(moves, row, col, -1, 1, piece[0]);
      addLineMoves(moves, row, col, -1, -1, piece[0]);
    } else if (pieceType === 'R') { // Rook
      addLineMoves(moves, row, col, 0, 1, piece[0]);
      addLineMoves(moves, row, col, 0, -1, piece[0]);
      addLineMoves(moves, row, col, 1, 0, piece[0]);
      addLineMoves(moves, row, col, -1, 0, piece[0]);
    } else if (pieceType === 'Q') { // Queen
      addLineMoves(moves, row, col, 0, 1, piece[0]);
      addLineMoves(moves, row, col, 0, -1, piece[0]);
      addLineMoves(moves, row, col, 1, 0, piece[0]);
      addLineMoves(moves, row, col, -1, 0, piece[0]);
      addLineMoves(moves, row, col, 1, 1, piece[0]);
      addLineMoves(moves, row, col, 1, -1, piece[0]);
      addLineMoves(moves, row, col, -1, 1, piece[0]);
      addLineMoves(moves, row, col, -1, -1, piece[0]);
    } else if (pieceType === 'K') { // King
      [-1, 0, 1].forEach(dr => {
        [-1, 0, 1].forEach(dc => {
          if (dr === 0 && dc === 0) return;
          const newRow = row + dr;
          const newCol = col + dc;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const target = board[newRow][newCol];
            if (!target || target[0] !== piece[0]) {
              moves.push({ row: newRow, col: newCol });
            }
          }
        });
      });
    }
    
    setValidMoves(moves);
  };
  
  const addLineMoves = (moves, row, col, dr, dc, pieceColor) => {
    let newRow = row + dr;
    let newCol = col + dc;
    
    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (!target) {
        moves.push({ row: newRow, col: newCol });
      } else {
        if (target[0] !== pieceColor) {
          moves.push({ row: newRow, col: newCol });
        }
        break;
      }
      newRow += dr;
      newCol += dc;
    }
  };
  
  const movePiece = (fromRow, fromCol, toRow, toCol) => {
    const newBoard = [...board];
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    setBoard(newBoard);
  };
  
  const getPieceSymbol = (piece) => {
    if (!piece) return '';
    
    const pieceSymbols = {
      'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
      'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟'
    };
    
    return pieceSymbols[piece] || '';
  };
  
  const isTileSelected = (row, col) => {
    return selectedTile && selectedTile.row === row && selectedTile.col === col;
  };
  
  const isValidMoveTile = (row, col) => {
    return validMoves.some(move => move.row === row && move.col === col);
  };
  
  const isCaptureMove = (row, col) => {
    return isValidMoveTile(row, col) && board[row][col] !== null;
  };
  
  return (
    <div className="chess-board-container">
      <div className="coordinates-top">
        {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => (
          <div key={letter} className="coordinate">{letter}</div>
        ))}
      </div>
      
      <div className="board-with-coordinates">
        <div className="coordinates-left">
          {[8, 7, 6, 5, 4, 3, 2, 1].map(number => (
            <div key={number} className="coordinate">{number}</div>
          ))}
        </div>
        
        <div className="chess-board">
          {board.map((row, rowIndex) => (
            row.map((piece, colIndex) => {
              const isLight = (rowIndex + colIndex) % 2 === 0;
              const isSelected = isTileSelected(rowIndex, colIndex);
              const isValidMove = isValidMoveTile(rowIndex, colIndex);
              const isCapture = isCaptureMove(rowIndex, colIndex);
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`tile ${isLight ? 'light-tile' : 'dark-tile'} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''} ${isCapture ? 'capture-move' : ''}`}
                  onClick={() => handleTileClick(rowIndex, colIndex)}
                >
                  {piece && (
                    <div className="chess-piece">
                      {getPieceSymbol(piece)}
                    </div>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;