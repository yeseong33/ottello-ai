import { Board, Player } from '../utils/OthelloGame';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'pro';

export class OthelloAI {
  private difficulty: Difficulty;

  constructor(difficulty: Difficulty = 'medium') {
    this.difficulty = difficulty;
  }

  getBestMove(board: Board, player: Player): { row: number; col: number } | null {
    // 난이도에 따른 탐색 깊이 설정
    const depth = this.getDifficultyDepth();
    
    // 유효한 수를 찾음
    const validMoves = this.getValidMoves(board, player);
    if (validMoves.length === 0) return null;

    // 각 수의 평가 점수를 계산
    let bestScore = -Infinity;
    let bestMove = validMoves[0];

    for (const move of validMoves) {
      const newBoard = this.makeMove(board, move, player);
      const score = this.minimax(newBoard, depth - 1, -Infinity, Infinity, false, player);
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return bestMove;
  }

  private getDifficultyDepth(): number {
    switch (this.difficulty) {
      case 'easy': return 2;
      case 'medium': return 4;
      case 'hard': return 6;
      case 'pro': return 8;
    }
  }

  private minimax(board: Board, depth: number, alpha: number, beta: number, isMaximizing: boolean, player: Player): number {
    if (depth === 0) {
      return this.evaluateBoard(board, player);
    }

    const currentPlayer = isMaximizing ? player : (player === 'black' ? 'white' : 'black');
    const validMoves = this.getValidMoves(board, currentPlayer);

    if (validMoves.length === 0) {
      return this.evaluateBoard(board, player);
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of validMoves) {
        const newBoard = this.makeMove(board, move, currentPlayer);
        const eval_ = this.minimax(newBoard, depth - 1, alpha, beta, false, player);
        maxEval = Math.max(maxEval, eval_);
        alpha = Math.max(alpha, eval_);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of validMoves) {
        const newBoard = this.makeMove(board, move, currentPlayer);
        const eval_ = this.minimax(newBoard, depth - 1, alpha, beta, true, player);
        minEval = Math.min(minEval, eval_);
        beta = Math.min(beta, eval_);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }

  private evaluateBoard(board: Board, player: Player): number {
    const weights = [
      [100, -20, 10, 5, 5, 10, -20, 100],
      [-20, -50, -2, -2, -2, -2, -50, -20],
      [10, -2, -1, -1, -1, -1, -2, 10],
      [5, -2, -1, -1, -1, -1, -2, 5],
      [5, -2, -1, -1, -1, -1, -2, 5],
      [10, -2, -1, -1, -1, -1, -2, 10],
      [-20, -50, -2, -2, -2, -2, -50, -20],
      [100, -20, 10, 5, 5, 10, -20, 100]
    ];

    let score = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] === player) {
          score += weights[i][j];
        } else if (board[i][j] === (player === 'black' ? 'white' : 'black')) {
          score -= weights[i][j];
        }
      }
    }
    return score;
  }

  private getValidMoves(board: Board, player: Player): { row: number; col: number }[] {
    const moves: { row: number; col: number }[] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.isValidMove(board, { row: i, col: j }, player)) {
          moves.push({ row: i, col: j });
        }
      }
    }
    return moves;
  }

  private makeMove(board: Board, move: { row: number; col: number }, player: Player): Board {
    const newBoard = board.map(row => [...row]);
    if (this.isValidMove(newBoard, move, player)) {
      newBoard[move.row][move.col] = player;
      this.flipStones(newBoard, move, player);
    }
    return newBoard;
  }

  private isValidMove(board: Board, move: { row: number; col: number }, player: Player): boolean {
    if (board[move.row][move.col] !== null) return false;

    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dx, dy] of directions) {
      let x = move.row + dx;
      let y = move.col + dy;
      let foundOpponent = false;

      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (board[x][y] === null) break;
        if (board[x][y] === player) {
          if (foundOpponent) return true;
          break;
        }
        foundOpponent = true;
        x += dx;
        y += dy;
      }
    }

    return false;
  }

  private flipStones(board: Board, move: { row: number; col: number }, player: Player): void {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dx, dy] of directions) {
      let x = move.row + dx;
      let y = move.col + dy;
      const stonesToFlip: { row: number; col: number }[] = [];

      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (board[x][y] === null) break;
        if (board[x][y] === player) {
          for (const pos of stonesToFlip) {
            board[pos.row][pos.col] = player;
          }
          break;
        }
        stonesToFlip.push({ row: x, col: y });
        x += dx;
        y += dy;
      }
    }
  }
}

export default OthelloAI;