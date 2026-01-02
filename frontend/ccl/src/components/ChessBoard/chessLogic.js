// chessLogic.js

// Helper function to check if a move is within bounds
const isInBounds = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

// Helper function to check if a square is empty or occupied by an opponent
const canMoveTo = (board, r, c, pieceColor) => {
  if (!isInBounds(r, c)) return false;
  const target = board[r][c];
  return !target || target[0] !== pieceColor;
};

// Helper function to check if a square is empty
const isEmpty = (board, r, c) => {
  if (!isInBounds(r, c)) return false;
  return !board[r][c];
};

// King movement logic
export const getKingMoves = (board, row, col) => {
  const piece = board[row][col];
  if (!piece) return [];
  const pieceColor = piece[0];
  const validMoves = [];

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      if (canMoveTo(board, row + dr, col + dc, pieceColor)) {
        validMoves.push([row + dr, col + dc]);
      }
    }
  }
  return validMoves;
};

// Queen movement logic
export const getQueenMoves = (board, row, col) => {
  const piece = board[row][col];
  if (!piece) return [];
  const pieceColor = piece[0];
  const validMoves = [];
  const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

  for (const [dr, dc] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = row + dr * i;
      const newCol = col + dc * i;
      if (canMoveTo(board, newRow, newCol, pieceColor)) {
        validMoves.push([newRow, newCol]);
        if (!isEmpty(board, newRow, newCol)) break;
      } else break;
    }
  }
  return validMoves;
};

// Rook movement logic
export const getRookMoves = (board, row, col) => {
  const piece = board[row][col];
  if (!piece) return [];
  const pieceColor = piece[0];
  const validMoves = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (const [dr, dc] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = row + dr * i;
      const newCol = col + dc * i;
      if (canMoveTo(board, newRow, newCol, pieceColor)) {
        validMoves.push([newRow, newCol]);
        if (!isEmpty(board, newRow, newCol)) break;
      } else break;
    }
  }
  return validMoves;
};

// Bishop movement logic
export const getBishopMoves = (board, row, col) => {
  const piece = board[row][col];
  if (!piece) return [];
  const pieceColor = piece[0];
  const validMoves = [];
  const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

  for (const [dr, dc] of directions) {
    for (let i = 1; i < 8; i++) {
      const newRow = row + dr * i;
      const newCol = col + dc * i;
      if (canMoveTo(board, newRow, newCol, pieceColor)) {
        validMoves.push([newRow, newCol]);
        if (!isEmpty(board, newRow, newCol)) break;
      } else break;
    }
  }
  return validMoves;
};

// Knight movement logic
export const getKnightMoves = (board, row, col) => {
  const piece = board[row][col];
  if (!piece) return [];
  const pieceColor = piece[0];
  const validMoves = [];
  const knightMoves = [
    [row - 2, col - 1], [row - 2, col + 1],
    [row - 1, col - 2], [row - 1, col + 2],
    [row + 1, col - 2], [row + 1, col + 2],
    [row + 2, col - 1], [row + 2, col + 1]
  ];

  for (const [r, c] of knightMoves) {
    if (canMoveTo(board, r, c, pieceColor)) {
      validMoves.push([r, c]);
    }
  }
  return validMoves;
};

// Pawn movement logic
export const getPawnMoves = (board, row, col) => {
  const piece = board[row][col];
  if (!piece) return [];
  const pieceColor = piece[0];
  const validMoves = [];
  const direction = pieceColor === 'w' ? -1 : 1;
  const startRow = pieceColor === 'w' ? 6 : 1;

  if (isEmpty(board, row + direction, col)) {
    validMoves.push([row + direction, col]);
    if (row === startRow && isEmpty(board, row + 2 * direction, col)) {
      validMoves.push([row + 2 * direction, col]);
    }
  }

  if (canMoveTo(board, row + direction, col - 1, pieceColor) && !isEmpty(board, row + direction, col - 1)) {
    validMoves.push([row + direction, col - 1]);
  }
  if (canMoveTo(board, row + direction, col + 1, pieceColor) && !isEmpty(board, row + direction, col + 1)) {
    validMoves.push([row + direction, col + 1]);
  }

  return validMoves;
};