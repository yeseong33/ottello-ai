import React from 'react';
import { Difficulty } from '../ai/OthelloAI';

interface AISettingsProps {
  blackDifficulty: Difficulty;
  whiteDifficulty: Difficulty;
  onBlackDifficultyChange: (difficulty: Difficulty) => void;
  onWhiteDifficultyChange: (difficulty: Difficulty) => void;
  moveDelay: number;
  onMoveDelayChange: (delay: number) => void;
  onStartGame: () => void;
}

const AISettings: React.FC<AISettingsProps> = ({
  blackDifficulty,
  whiteDifficulty,
  onBlackDifficultyChange,
  onWhiteDifficultyChange,
  moveDelay,
  onMoveDelayChange,
  onStartGame
}) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'pro'];
  const delayOptions = [
    { value: 500, label: '빠름 (0.5초)' },
    { value: 1000, label: '보통 (1초)' },
    { value: 2000, label: '느림 (2초)' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">AI 대전 설정</h2>
      
      <div className="space-y-6">
        {/* 흑 AI 난이도 */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            흑 플레이어 (AI) 난이도
          </label>
          <div className="grid grid-cols-2 gap-2">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                className={`py-2 px-4 rounded transition-colors
                  ${blackDifficulty === difficulty
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => onBlackDifficultyChange(difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* 백 AI 난이도 */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            백 플레이어 (AI) 난이도
          </label>
          <div className="grid grid-cols-2 gap-2">
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                className={`py-2 px-4 rounded transition-colors
                  ${whiteDifficulty === difficulty
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => onWhiteDifficultyChange(difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* 이동 속도 */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            AI 이동 속도
          </label>
          <div className="grid grid-cols-3 gap-2">
            {delayOptions.map(option => (
              <button
                key={option.value}
                className={`py-2 px-4 rounded transition-colors
                  ${moveDelay === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => onMoveDelayChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 시작 버튼 */}
        <button
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 
            transition-colors text-xl font-bold mt-8"
          onClick={onStartGame}
        >
          AI 대전 시작
        </button>
      </div>
    </div>
  );
};

export default AISettings;