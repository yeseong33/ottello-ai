import React, { useEffect, useRef, useState } from 'react';
import { GameState } from '../utils/OthelloGame';
import { stoneDesigns } from '../types/StoneDesign';

interface OthelloBoardProps {
  gameState: GameState;
  onCellClick: (row: number, col: number) => void;
}

const OthelloBoard: React.FC<OthelloBoardProps> = ({ gameState, onCellClick }) => {
  const { board, validMoves, currentPlayer, blackDesign, whiteDesign, gameStarted } = gameState;
  const boardRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState('3.5rem');
  const [gapSize, setGapSize] = useState('6px');

  useEffect(() => {
    const updateCellSize = () => {
      if (!boardRef.current) return;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const horizontalPadding = screenWidth < 640 ? 32 : 64;
      const verticalPadding = screenWidth < 640 ? 120 : 160;

      const maxAvailableWidth = screenWidth - horizontalPadding;
      const maxAvailableHeight = screenHeight - verticalPadding;

      const maxBoardSize = Math.min(
        maxAvailableWidth,
        maxAvailableHeight,
        480
      );

      const gap = Math.max(6, Math.floor(maxBoardSize * 0.015));
      setGapSize(`${gap}px`);

      const totalGapSpace = gap * 9;
      const newCellSize = Math.floor((maxBoardSize - totalGapSpace) / 8);
      setCellSize(`${newCellSize}px`);
    };

    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, []);

  const getStoneDesign = (player: 'black' | 'white') => {
    const designId = player === 'black' ? blackDesign : whiteDesign;
    return stoneDesigns.find(design => design.id === designId);
  };

  const isValidMove = (row: number, col: number): boolean => {
    return validMoves.some(move => move.row === row && move.col === col);
  };

  const boardSize = `calc((${cellSize} * 8) + (${gapSize} * 9))`;
  const stoneSizeRatio = 0.7;

  return (
    <div
      ref={boardRef}
      className="inline-block bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-200"
      style={{
        width: boardSize,
        height: boardSize,
      }}
    >
      <div
        className="w-full h-full"
        style={{
          padding: gapSize,
        }}
      >
        <div
          className="grid grid-cols-8 w-full h-full"
          style={{
            gap: gapSize,
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const cellKey = `${rowIndex}-${colIndex}`;
              const design = cell ? getStoneDesign(cell) : null;
              const isValid = isValidMove(rowIndex, colIndex);
              const currentDesign = getStoneDesign(currentPlayer);

              return (
                <button
                  key={cellKey}
                  className={`
                    border border-gray-300 dark:border-gray-600 
                    bg-gray-50 dark:bg-gray-700
                    relative transition-all duration-200 ease-in-out
                    hover:bg-gray-100 dark:hover:bg-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500
                    ${isValid && gameStarted ? 'ring-2 ring-blue-400' : ''}
                    ${!gameStarted ? 'cursor-not-allowed opacity-80' : ''}
                  `}
                  style={{
                    width: cellSize,
                    height: cellSize,
                  }}
                  onClick={() => gameStarted && onCellClick(rowIndex, colIndex)}
                  disabled={!gameStarted}
                >
                  {/* 실제 돌 */}
                  {cell && design && (
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        flex items-center justify-center
                        transition-all duration-300 ease-in-out
                        transform hover:scale-105"
                      style={{
                        fontSize: `calc(${cellSize} * ${stoneSizeRatio})`,
                        lineHeight: 1,
                        filter: `drop-shadow(0 2px 2px ${design.shadowColor})`,
                      }}
                    >
                      {design.emoji}
                    </div>
                  )}

                  {/* 둘 수 있는 위치 표시 */}
                  {isValid && !cell && gameStarted && currentDesign && (
                    <div
                      className="synchronized-bounce"
                      style={{
                        fontSize: `calc(${cellSize} * ${stoneSizeRatio})`,
                        lineHeight: 1,
                        filter: `drop-shadow(0 1px 1px ${currentDesign.shadowColor})`,
                      }}
                    >
                      {currentDesign.emoji}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default OthelloBoard;