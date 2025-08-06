import React, { useState, useEffect } from 'react';
import OthelloGame from '../utils/OthelloGame';
import OthelloAI, { Difficulty } from '../ai/OthelloAI';
import GameScreen from './GameScreen';

interface AIGameProps {
  blackDifficulty: Difficulty;
  whiteDifficulty: Difficulty;
  moveDelay?: number; // AI 이동 간 지연 시간 (ms)
  onGameEnd?: (winner: 'black' | 'white' | 'draw') => void;
}

const AIGame: React.FC<AIGameProps> = ({
  blackDifficulty,
  whiteDifficulty,
  moveDelay = 1000,
  onGameEnd
}) => {
  const [game, setGame] = useState(() => new OthelloGame());
  const [blackAI] = useState(() => new OthelloAI(blackDifficulty));
  const [whiteAI] = useState(() => new OthelloAI(whiteDifficulty));
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    // 게임 시작 시 기본 돌 디자인 설정
    game.setPlayerDesigns('black', 'white');
    setGame(new OthelloGame(game));
  }, []);

  useEffect(() => {
    const makeAIMove = async () => {
      if (isThinking || game.getGameState().gameOver) return;

      const gameState = game.getGameState();
      const currentAI = gameState.currentPlayer === 'black' ? blackAI : whiteAI;
      
      setIsThinking(true);
      
      // AI 사고 시간 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, moveDelay));

      const move = currentAI.getBestMove(gameState.board, gameState.currentPlayer);
      
      if (move) {
        game.makeMove(move.row, move.col);
        setGame(new OthelloGame(game));
      }

      setIsThinking(false);

      // 게임 종료 체크
      const newGameState = game.getGameState();
      if (newGameState.gameOver && onGameEnd) {
        onGameEnd(newGameState.winner || 'draw');
      }
    };

    makeAIMove();
  }, [game, blackAI, whiteAI, isThinking, moveDelay, onGameEnd]);

  return (
    <div className="relative">
      <GameScreen
        gameState={game.getGameState()}
        onCellClick={() => {}} // AI 게임에서는 사용자 입력 무시
        onNewGame={() => {
          setGame(new OthelloGame());
          game.setPlayerDesigns('black', 'white');
        }}
      />
      {isThinking && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
          AI가 생각중...
        </div>
      )}
    </div>
  );
};

export default AIGame;