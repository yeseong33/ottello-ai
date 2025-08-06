import React from 'react';
import { Difficulty } from '../ai/OthelloAI';

interface ModeSelectionProps {
  onSelectMode: (mode: 'pvp' | 'ai') => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  selectedMode: 'pvp' | 'ai' | null;
  selectedDifficulty: Difficulty | null;
  onContinue: () => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({
  onSelectMode,
  onSelectDifficulty,
  selectedMode,
  selectedDifficulty,
  onContinue
}) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'pro'];

  const getDifficultyLabel = (difficulty: Difficulty): string => {
    switch (difficulty) {
      case 'easy': return '쉬움';
      case 'medium': return '보통';
      case 'hard': return '어려움';
      case 'pro': return '프로';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-gray-50 rounded-lg p-8 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          게임 모드 선택
        </h2>

        <div className="space-y-6">
          {/* 모드 선택 버튼 */}
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`p-6 rounded-lg transition-all transform hover:scale-105
                ${selectedMode === 'pvp'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => onSelectMode('pvp')}
            >
              <div className="text-4xl mb-2">👥</div>
              <div className="font-bold">2인 대전</div>
            </button>

            <button
              className={`p-6 rounded-lg transition-all transform hover:scale-105
                ${selectedMode === 'ai'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => onSelectMode('ai')}
            >
              <div className="text-4xl mb-2">🤖</div>
              <div className="font-bold">AI 대전</div>
            </button>
          </div>

          {/* AI 난이도 선택 */}
          {selectedMode === 'ai' && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                AI 난이도 선택
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    className={`py-3 px-4 rounded-lg transition-colors
                      ${selectedDifficulty === difficulty
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => onSelectDifficulty(difficulty)}
                  >
                    {getDifficultyLabel(difficulty)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 계속하기 버튼 */}
          <button
            className={`w-full py-4 rounded-lg text-white font-bold text-lg mt-8
              transition-colors
              ${(selectedMode === 'pvp' || (selectedMode === 'ai' && selectedDifficulty))
                ? 'bg-green-500 hover:bg-green-400'
                : 'bg-gray-300 cursor-not-allowed'}`}
            onClick={onContinue}
            disabled={!(selectedMode === 'pvp' || (selectedMode === 'ai' && selectedDifficulty))}
          >
            계속하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;