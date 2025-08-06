import React from 'react';
import { stoneDesigns } from '../types/StoneDesign';

interface StoneSelectionScreenProps {
  onSelectStone: (playerId: 1 | 2, designId: string) => void;
  onBack: () => void;
  onStart: () => void;
  player1Design: string | null;
  player2Design: string | null;
  isAIMode?: boolean;
}

const StoneSelectionScreen: React.FC<StoneSelectionScreenProps> = ({
  onSelectStone,
  onBack,
  onStart,
  player1Design,
  player2Design,
  isAIMode = false
}) => {
  const isPlayer1Selected = player1Design !== null;
  const isPlayer2Selected = player2Design !== null;
  const bothPlayersSelected = isPlayer1Selected && isPlayer2Selected;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-gray-50 rounded-lg p-6 w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">돌 디자인 선택</h2>
          {isPlayer2Selected && !bothPlayersSelected && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              뒤로가기
            </button>
          )}
        </div>

        {/* Player 1 Selection */}
        {!isPlayer1Selected && (
          <div className="mb-8">
            <h3 className="text-xl text-gray-700 mb-4">
              {isAIMode ? "플레이어의 돌을 선택하세요" : "Player 1의 돌을 선택하세요"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stoneDesigns.map(design => (
                <button
                  key={design.id}
                  onClick={() => onSelectStone(1, design.id)}
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <span className="text-4xl mb-2">{design.emoji}</span>
                  <span className="text-gray-600">{design.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Player 2/AI Selection */}
        {isPlayer1Selected && !isPlayer2Selected && (
          <div className="mb-8">
            <h3 className="text-xl text-gray-700 mb-4">
              {isAIMode ? "AI의 돌을 선택하세요" : "Player 2의 돌을 선택하세요"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stoneDesigns.map(design => (
                <button
                  key={design.id}
                  onClick={() => onSelectStone(2, design.id)}
                  disabled={design.id === player1Design}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors border
                    ${design.id === player1Design 
                      ? 'bg-gray-100 cursor-not-allowed opacity-50 border-gray-200' 
                      : 'bg-white hover:bg-gray-100 border-gray-200'}`}
                >
                  <span className="text-4xl mb-2">{design.emoji}</span>
                  <span className="text-gray-600">{design.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Designs Display */}
        {(isPlayer1Selected || isPlayer2Selected) && (
          <div className="mb-8">
            <h3 className="text-xl text-gray-700 mb-4">선택된 돌</h3>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  {isAIMode ? "플레이어" : "Player 1"}
                </p>
                {player1Design && (
                  <div className="text-4xl bg-white p-4 rounded-lg border border-gray-200">
                    {stoneDesigns.find(d => d.id === player1Design)?.emoji}
                  </div>
                )}
              </div>
              {isPlayer2Selected && (
                <div className="text-center">
                  <p className="text-gray-600 mb-2">
                    {isAIMode ? "AI" : "Player 2"}
                  </p>
                  <div className="text-4xl bg-white p-4 rounded-lg border border-gray-200">
                    {stoneDesigns.find(d => d.id === player2Design)?.emoji}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Start Game Button */}
        {bothPlayersSelected && (
          <button
            onClick={onStart}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors text-xl font-bold"
          >
            게임 시작하기
          </button>
        )}
      </div>
    </div>
  );
};

export default StoneSelectionScreen;