import { Player, Board } from '../utils/OthelloGame';

// 보드의 각 위치별 가중치
const POSITION_WEIGHTS = [
  [120, -20,  20,   5,   5,  20, -20, 120],
  [-20, -40,  -5,  -5,  -5,  -5, -40, -20],
  [ 20,  -5,  15,   3,   3,  15,  -5,  20],
  [  5,  -5,   3,   3,   3,   3,  -5,   5],
  [  5,  -5,   3,   3,   3,   3,  -5,   5],
  [ 20,  -5,  15,   3,   3,  15,  -5,  20],
  [-20, -40,  -5,  -5,  -5,  -5, -40, -20],
  [120, -20,  20,   5,   5,  20, -20, 120]
];

// 난이도별 탐색 깊이
const DIFFICULTY_DEPTHS = {
  easy: 3,
  medium: 5,
  hard: 7,
  pro: 9
};

export type Difficulty = 'easy' | 'medium' | 'hard' | 'pro';

interface Move {
  row: number;
  col: number;
  score: number;
}

export class OthelloAI {
  private difficulty: Difficulty;
  private openingBook: Map<string, Move>;

  constructor(difficulty: Difficulty = 'medium') {
    this.difficulty = difficulty;
    this.openingBook = this.initializeOpeningBook();
  }

  // 개국정석 데이터베이스 초기화
  private initializeOpeningBook(): Map<string, Move> {
    const book = new Map<string, Move>();
    
    // 기본적인 개국정석 패턴들
    // 보드 상태를 문자열로 직렬화하여 저장
    const standardOpenings = [
      // 예시: 기본적인 개국정석 패턴
      // "현재보드상태" => { row: x, col: y, score: z }
    ];

    standardOpenings.forEach(([boardState, move]) => {
      book.set(boardState, move);
    });

    return book;
  }

  // 보드 상태를 문자열로 직렬화
  private serializeBoard(board: Board): string {
    return board.map(row => 
      row.map(cell => cell === null ? '.' : cell === 'black' ? 'B' : 'W').join('')
    ).join('');
  }

  // 개국정석 데이터베이스에서 수 찾기
  private findBookMove(board: Board): Move | null {
    const serialized = this.serializeBoard(board);
    return this.openingBook.get(serialized) || null;
  }

  // 평가 함수
  private evaluateBoard(board: Board, player: Player): number {
    let score = 0;
    const opponent = player === 'black' ? 'white' : 'black';
    const emptyCount = this.countEmptyCells(board);

    // 게임 단계에 따른 가중치 조정
    const mobilityWeight = emptyCount > 32 ? 2 : 1; // 서반은 기동성 중시
    const positionWeight = emptyCount > 32 ? 1 : 2; // 종반은 위치 가중치 중시

    // 위치 가중치 계산
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === player) {
          score += POSITION_WEIGHTS[row][col] * positionWeight;
        } else if (board[row][col] === opponent) {
          score -= POSITION_WEIGHTS[row][col] * positionWeight;
        }
      }
    }

    // 기동성 (유효한 수의 수) 계산
    const playerMoves = this.countValidMoves(board, player);
    const opponentMoves = this.countValidMoves(board, opponent);
    score += (playerMoves - opponentMoves) * mobilityWeight * 10;

    return score;
  }

  // 빈 칸 수 계산
  private countEmptyCells(board: Board): number {
    return board.flat().filter(cell => cell === null).length;
  }

  // 유효한 수의 수 계산
  private countValidMoves(board: Board, player: Player): number {
    let count = 0;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.isValidMove(board, row, col, player)) {
          count++;
        }
      }
    }
    return count;
  }

  // Alpha-Beta 탐색
  private alphaBeta(
    board: Board,
    depth: number,
    alpha: number,
    beta: number,
    player: Player,
    isMaximizing: boolean
  ): number {
    if (depth === 0) {
      return this.evaluateBoard(board, player);
    }

    const moves = this.getValidMoves(board, isMaximizing ? player : this.getOpponent(player));
    if (moves.length === 0) {
      // 패스 상황
      const opponentMoves = this.getValidMoves(board, this.getOpponent(player));
      if (opponentMoves.length === 0) {
        // 게임 종료
        return this.getFinalScore(board, player);
      }
      // 패스하고 계속 진행
      return this.alphaBeta(board, depth - 1, alpha, beta, player, !isMaximizing);
    }

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (const move of moves) {
        const newBoard = this.makeMove(board, move.row, move.col, player);
        const score = this.alphaBeta(newBoard, depth - 1, alpha, beta, player, false);
        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break; // Beta cut-off
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      const opponent = this.getOpponent(player);
      for (const move of moves) {
        const newBoard = this.makeMove(board, move.row, move.col, opponent);
        const score = this.alphaBeta(newBoard, depth - 1, alpha, beta, player, true);
        minScore = Math.min(minScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break; // Alpha cut-off
      }
      return minScore;
    }
  }

  // 최종 점수 계산
  private getFinalScore(board: Board, player: Player): number {
    let playerCount = 0;
    let opponentCount = 0;
    const opponent = this.getOpponent(player);

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === player) playerCount++;
        else if (board[row][col] === opponent) opponentCount++;
      }
    }

    return playerCount - opponentCount;
  }

  // 상대 플레이어 반환
  private getOpponent(player: Player): Player {
    return player === 'black' ? 'white' : 'black';
  }

  // 유효한 수인지 확인
  private isValidMove(board: Board, row: number, col: number, player: Player): boolean {
    if (board[row][col] !== null) return false;

    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    const opponent = this.getOpponent(player);
    
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let hasOpponent = false;

      while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === opponent) {
        x += dx;
        y += dy;
        hasOpponent = true;
      }

      if (hasOpponent && x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player) {
        return true;
      }
    }

    return false;
  }

  // 모든 유효한 수 찾기
  private getValidMoves(board: Board, player: Player): Move[] {
    const moves: Move[] = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.isValidMove(board, row, col, player)) {
          const newBoard = this.makeMove(board, row, col, player);
          const score = this.evaluateBoard(newBoard, player);
          moves.push({ row, col, score });
        }
      }
    }

    return moves.sort((a, b) => b.score - a.score); // 점수순 정렬
  }

  // 수를 두고 새 보드 상태 반환
  private makeMove(board: Board, row: number, col: number, player: Player): Board {
    const newBoard: Board = board.map(row => [...row]);
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    newBoard[row][col] = player;
    const opponent = this.getOpponent(player);

    for (const [dx, dy] of directions) {
      const flips: [number, number][] = [];
      let x = row + dx;
      let y = col + dy;

      while (x >= 0 && x < 8 && y >= 0 && y < 8 && newBoard[x][y] === opponent) {
        flips.push([x, y]);
        x += dx;
        y += dy;
      }

      if (x >= 0 && x < 8 && y >= 0 && y < 8 && newBoard[x][y] === player) {
        for (const [fx, fy] of flips) {
          newBoard[fx][fy] = player;
        }
      }
    }

    return newBoard;
  }

  // AI의 다음 수 결정
  getBestMove(board: Board, player: Player): { row: number; col: number } | null {
    // 개국정석 확인
    const bookMove = this.findBookMove(board);
    if (bookMove && this.countEmptyCells(board) > 45) { // 초반에만 개국정석 사용
      return bookMove;
    }

    const emptyCount = this.countEmptyCells(board);
    let depth = DIFFICULTY_DEPTHS[this.difficulty];

    // 종반에는 더 깊게 탐색
    if (emptyCount <= 12) {
      depth += 2;
    }

    const moves = this.getValidMoves(board, player);
    if (moves.length === 0) return null;

    let bestMove = moves[0];
    let bestScore = -Infinity;

    for (const move of moves) {
      const newBoard = this.makeMove(board, move.row, move.col, player);
      const score = this.alphaBeta(newBoard, depth - 1, -Infinity, Infinity, player, false);
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return { row: bestMove.row, col: bestMove.col };
  }

  // 난이도 설정
  setDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty;
  }
}

export default OthelloAI;