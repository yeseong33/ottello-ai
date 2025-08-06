export type Player = 'black' | 'white';
export type Board = (Player | null)[][];

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  blackScore: number;
  whiteScore: number;
  validMoves: Position[];
  gameOver: boolean;
  winner: Player | 'draw' | null;
  blackDesign: string | null;
  whiteDesign: string | null;
  gameStarted: boolean;
}

class OthelloGame {
  private board: Board;
  private currentPlayer: Player;
  private blackDesign: string | null;
  private whiteDesign: string | null;
  private gameStarted: boolean;

  constructor(previousGame?: OthelloGame) {
    if (previousGame) {
      this.board = JSON.parse(JSON.stringify(previousGame.board));
      this.currentPlayer = previousGame.currentPlayer;
      this.blackDesign = previousGame.blackDesign;
      this.whiteDesign = previousGame.whiteDesign;
      this.gameStarted = previousGame.gameStarted;
    } else {
      this.board = Array(8).fill(null).map(() => Array(8).fill(null));
      this.board[3][3] = 'white';
      this.board[3][4] = 'black';
      this.board[4][3] = 'black';
      this.board[4][4] = 'white';
      this.currentPlayer = 'black';
      this.blackDesign = null;
      this.whiteDesign = null;
      this.gameStarted = false;
    }
  }

  setPlayerDesigns(blackDesign: string, whiteDesign: string) {
    this.blackDesign = blackDesign;
    this.whiteDesign = whiteDesign;
    this.gameStarted = true;
  }

  private getOpponent(player: Player): Player {
    return player === 'black' ? 'white' : 'black';
  }

  private isValidPosition(row: number, col: number): boolean {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  private getFlippableDiscs(row: number, col: number, player: Player): Position[] {
    if (this.board[row][col] !== null) return [];

    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    const opponent = this.getOpponent(player);
    const flippableDiscs: Position[] = [];

    for (const [dx, dy] of directions) {
      const tempFlippable: Position[] = [];
      let currentRow = row + dx;
      let currentCol = col + dy;

      while (
        this.isValidPosition(currentRow, currentCol) &&
        this.board[currentRow][currentCol] === opponent
      ) {
        tempFlippable.push({ row: currentRow, col: currentCol });
        currentRow += dx;
        currentCol += dy;
      }

      if (
        this.isValidPosition(currentRow, currentCol) &&
        this.board[currentRow][currentCol] === player &&
        tempFlippable.length > 0
      ) {
        flippableDiscs.push(...tempFlippable);
      }
    }

    return flippableDiscs;
  }

  isValidMove(row: number, col: number): boolean {
    if (!this.gameStarted) return false;
    return this.getFlippableDiscs(row, col, this.currentPlayer).length > 0;
  }

  makeMove(row: number, col: number): boolean {
    if (!this.isValidMove(row, col)) return false;

    const flippableDiscs = this.getFlippableDiscs(row, col, this.currentPlayer);
    if (flippableDiscs.length === 0) return false;

    this.board[row][col] = this.currentPlayer;
    for (const { row: r, col: c } of flippableDiscs) {
      this.board[r][c] = this.currentPlayer;
    }

    this.currentPlayer = this.getOpponent(this.currentPlayer);

    // 다음 플레이어가 둘 수 있는 곳이 없다면 다시 현재 플레이어로
    if (!this.hasValidMoves()) {
      this.currentPlayer = this.getOpponent(this.currentPlayer);
      // 현재 플레이어도 둘 수 없다면 게임 종료
      if (!this.hasValidMoves()) {
        this.gameStarted = false;
      }
    }

    return true;
  }

  private hasValidMoves(): boolean {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.isValidMove(row, col)) {
          return true;
        }
      }
    }
    return false;
  }

  private calculateValidMoves(): Position[] {
    const validMoves: Position[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.isValidMove(row, col)) {
          validMoves.push({ row, col });
        }
      }
    }
    return validMoves;
  }

  private calculateScores(): { blackScore: number; whiteScore: number } {
    let blackScore = 0;
    let whiteScore = 0;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.board[row][col] === 'black') blackScore++;
        if (this.board[row][col] === 'white') whiteScore++;
      }
    }

    return { blackScore, whiteScore };
  }

  getGameState(): GameState {
    const { blackScore, whiteScore } = this.calculateScores();
    const validMoves = this.calculateValidMoves();
    const gameOver = !this.hasValidMoves() && !this.gameStarted;
    let winner: Player | 'draw' | null = null;

    if (gameOver) {
      if (blackScore > whiteScore) winner = 'black';
      else if (whiteScore > blackScore) winner = 'white';
      else winner = 'draw';
    }

    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      blackScore,
      whiteScore,
      validMoves,
      gameOver,
      winner,
      blackDesign: this.blackDesign,
      whiteDesign: this.whiteDesign,
      gameStarted: this.gameStarted
    };
  }
}

export default OthelloGame;