// GameArea.jsx
import React, { useState, useEffect } from 'react';
// import './ChessBoard.css';
import ChessBoard from './ChessBoard';
import GameInfo from './GameInfo';
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

// Helper function to convert board coordinates to chess notation
const toChessNotation = (row, col) => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  return files[col] + ranks[row];
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
const GameArea = ({hasActiveGame = false}) => {
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
  const [moveHistory, setMoveHistory] = useState([]);
  
  const handleDraw = () => {
    alert("Draw requested. In a real game, this would need opponent's approval.");
  };

  const handleSurrender = () => {
    // Implement surrender logic here
    const winner = currentTurn === 'w' ? 'Black' : 'White';
    setGameStatus({
      isCheck: false,
      isCheckmate: true,
      winner: currentTurn === 'w' ? 'b' : 'w'
    });
    alert(`${currentTurn === 'w' ? 'White' : 'Black'} has surrendered. ${winner} wins!`);
  };

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
        // Create move notation
        const fromNotation = toChessNotation(selectedRow, selectedCol);
        const toNotation = toChessNotation(row, col);
        const piece = board[selectedRow][selectedCol];
        const pieceType = piece[1];
        const pieceSymbol = pieceType === 'P' ? '' : pieceType;
        const isCapture = board[row][col] !== null;
        const captureSymbol = isCapture ? 'x' : '->';
        const moveNotation = `${pieceSymbol}${fromNotation} ${captureSymbol} ${toNotation}`;
        
        // Get current time
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Add to move history
        const newMove = {
          player: currentTurn,
          notation: moveNotation,
          time: timeString
        };
        setMoveHistory([...moveHistory, newMove]);
        
        // Make the move
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

  return (
    <div className="game-area">
      <div className="chess-game">
        <ChessBoard 
          board={board}
          selectedSquare={selectedSquare}
          validMoves={validMoves}
          currentTurn={currentTurn}
          gameStatus={gameStatus}
          onSquareClick={handleSquareClick}
        />
        <GameInfo 
          currentTurn={currentTurn}
          gameStatus={gameStatus}
          moveHistory={moveHistory}
          onDraw={handleDraw}
          onSurrender={handleSurrender}
        />
        

        {/* <div className="game-info">
          <h2>Your Turn</h2>
          <p>Opponent: Magnificent_Carrot</p>
          <p>Time: 5:00</p>
        </div> */}


      </div>
    </div>
  );
};

export default GameArea;
