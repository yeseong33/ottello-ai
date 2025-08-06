import React, { useState } from 'react';
import OthelloBoard from './OthelloBoard';
import GameInfo from './GameInfo';
import { GameState } from '../utils/OthelloGame';

interface GameScreenProps {
  gameState: GameState;
  onCellClick: (row: number, col: number) => void;
  onNewGame: () => void;
  isAIMode?: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ 
  gameState, 
  onCellClick, 
  onNewGame,
  isAIMode = false
}) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl flex flex-col items-center gap-6">
        <div className="flex justify-between w-full items-center">
          <button
            onClick={() => setShowRules(!showRules)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {showRules ? '룰 숨기기' : '룰 보기'}
          </button>
          <button
            onClick={onNewGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 dark:hover:bg-blue-600 transition-colors"
          >
            새 게임 시작
          </button>
        </div>

        {showRules && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-gray-700 dark:text-gray-200 w-full border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-bold mb-3">게임 룰</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>플레이어는 번갈아가며 돌을 놓습니다.</li>
              <li>돌은 반드시 상대방의 돌을 감쌀 수 있는 위치에 놓아야 합니다.</li>
              <li>감싸인 상대방의 돌은 모두 자신의 돌로 뒤집힙니다.</li>
              <li>더 이상 돌을 놓을 수 없게 되면 게임이 종료됩니다.</li>
              <li>게임 종료 시 더 많은 돌을 가진 플레이어가 승리합니다.</li>
            </ul>
          </div>
        )}

        <GameInfo gameState={gameState} isAIMode={isAIMode} />
        <OthelloBoard gameState={gameState} onCellClick={onCellClick} />
      </div>
    </div>
  );
};

export default GameScreen;