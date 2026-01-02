// ChessBoard.jsx
import React, { useState, useEffect } from 'react';
import './ChessBoard.css';
import { King, Queen, Rook, Bishop, Knight, Pawn } from './PieceComponents';
import {
  getKingMoves,
  getQueenMoves,
  getRookMoves,
  getBishopMoves,
  getKnightMoves,
  getPawnMoves
} from './chessLogic';

// Map piece type character to its corresponding logic function
const moveLogic = {
  K: getKingMoves,
  Q: getQueenMoves,
  R: getRookMoves,
  B: getBishopMoves,
  N: getKnightMoves,
  P: getPawnMoves
};

// Map piece type character to its React component
const pieceComponents = {
  K: King,
  Q: Queen,
  R: Rook,
  B: Bishop,
  N: Knight,
  P: Pawn
};

// Check if a king is in check
const isKingInCheck = (board, kingColor) => {
  let kingPos = null;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === `${kingColor}K`) {
        kingPos = [r, c];
        break;
      }
    }
    if (kingPos) break;
  }
  if (!kingPos) return false;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece[0] !== kingColor) {
        const pieceType = piece[1];
        const moves = moveLogic[pieceType](board, r, c);
        if (moves.some(([mr, mc]) => mr === kingPos[0] && mc === kingPos[1])) {
          return true;
        }
      }
    }
  }
  return false;
};

// Check if it's checkmate
const isCheckmate = (board, kingColor) => {
  if (!isKingInCheck(board, kingColor)) return false;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && piece[0] === kingColor) {
        const pieceType = piece[1];
        const moves = moveLogic[pieceType](board, r, c);
        for (const [mr, mc] of moves) {
          const tempBoard = board.map(row => [...row]);
          tempBoard[mr][mc] = tempBoard[r][c];
          tempBoard[r][c] = null;
          if (!isKingInCheck(tempBoard, kingColor)) {
            return false;
          }
        }
      }
    }
  }
  return true;
};

// Get valid moves, excluding those that would put own king in check
const getValidMoves = (board, row, col) => {
  const piece = board[row][col];
  if (!piece) return [];
  const pieceType = piece[1];
  const pieceColor = piece[0];

  const allMoves = moveLogic[pieceType](board, row, col);
  const validMoves = [];
  for (const [mr, mc] of allMoves) {
    const tempBoard = board.map(row => [...row]);
    tempBoard[mr][mc] = tempBoard[row][col];
    tempBoard[row][col] = null;
    if (!isKingInCheck(tempBoard, pieceColor)) {
      validMoves.push([mr, mc]);
    }
  }
  return validMoves;
};

const ChessBoard = () => {
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

  const [board, setBoard] = useState(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('w');
  const [gameStatus, setGameStatus] = useState({ isCheck: false, isCheckmate: false, winner: null });

  useEffect(() => {
    const opponentColor = currentTurn === 'w' ? 'b' : 'w';
    const inCheck = isKingInCheck(board, opponentColor);
    const inCheckmate = inCheck && isCheckmate(board, opponentColor);

    setGameStatus({
      isCheck: inCheck,
      isCheckmate: inCheckmate,
      winner: inCheckmate ? currentTurn : null
    });
  }, [board, currentTurn]);

  const handleSquareClick = (row, col) => {
    if (gameStatus.isCheckmate) return; // Stop clicks if game is over

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const isValidMove = validMoves.some(([r, c]) => r === row && c === col);

      if (isValidMove) {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = newBoard[selectedRow][selectedCol];
        newBoard[selectedRow][selectedCol] = null;

        setBoard(newBoard);
        setCurrentTurn(currentTurn === 'w' ? 'b' : 'w');
        setSelectedSquare(null);
        setValidMoves([]);
      } else if (board[row][col] && board[row][col][0] === currentTurn) {
        setSelectedSquare([row, col]);
        setValidMoves(getValidMoves(board, row, col));
      } else {
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else {
      if (board[row][col] && board[row][col][0] === currentTurn) {
        setSelectedSquare([row, col]);
        setValidMoves(getValidMoves(board, row, col));
      }
    }
  };

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
    <div className="chess-game">
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
      </div>

      <div className="chessboard-3d-container">
        <div className="board-outer-square">
          {/* <div className="board-coordinates-top">
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(file => (
              <div key={file} className="coordinate">{file}</div>
            ))}
          </div>
            <div className="board-coordinates-left">
              {[8, 7, 6, 5, 4, 3, 2, 1].map(rank => (
                <div key={rank} className="coordinate">{rank}</div>
              ))}
            </div> */}
          <div className="board-middle-container">


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
                        onClick={() => handleSquareClick(rowIndex, colIndex)}
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
    </div>
  );
};

export default ChessBoard;