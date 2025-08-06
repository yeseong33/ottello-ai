import React from 'react';
import { GameState } from '../utils/OthelloGame';
import { stoneDesigns } from '../types/StoneDesign';

interface GameInfoProps {
  gameState: GameState;
  isAIMode?: boolean;
}

const GameInfo: React.FC<GameInfoProps> = ({ gameState, isAIMode = false }) => {
  const { currentPlayer, blackScore, whiteScore, gameOver, winner, blackDesign, whiteDesign } = gameState;

  const getDesignEmoji = (designId: string | null) => {
    return stoneDesigns.find(d => d.id === designId)?.emoji || '';
  };

  const getCurrentPlayerText = () => {
    if (isAIMode) {
      return currentPlayer === 'black' ? '플레이어' : 'AI';
    } else {
      return `Player ${currentPlayer === 'black' ? '1' : '2'}`;
    }
  };

  const getWinnerText = () => {
    if (winner === 'draw') return '무승부입니다!';
    if (isAIMode) {
      return `승자: ${winner === 'black' ? '플레이어' : 'AI'}`;
    }
    return `승자: Player ${winner === 'black' ? '1' : '2'}`;
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-600">
      {!gameOver ? (
        <div className="text-center">
          <p className="text-xl text-gray-700 dark:text-gray-200 mb-4">
            현재 턴: {getCurrentPlayerText()} {getDesignEmoji(currentPlayer === 'black' ? blackDesign : whiteDesign)}
          </p>
          <div className="flex justify-center gap-8">
            <p className="text-lg text-gray-700 dark:text-gray-200">
              {isAIMode ? '플레이어' : 'Player 1'} {getDesignEmoji(blackDesign)} : {blackScore}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              {isAIMode ? 'AI' : 'Player 2'} {getDesignEmoji(whiteDesign)} : {whiteScore}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">게임 종료!</p>
          <p className="text-xl text-gray-700 dark:text-gray-200">{getWinnerText()}</p>
          <div className="flex justify-center gap-8 mt-4">
            <p className="text-lg text-gray-700 dark:text-gray-200">
              {isAIMode ? '플레이어' : 'Player 1'} {getDesignEmoji(blackDesign)} : {blackScore}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              {isAIMode ? 'AI' : 'Player 2'} {getDesignEmoji(whiteDesign)} : {whiteScore}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameInfo;