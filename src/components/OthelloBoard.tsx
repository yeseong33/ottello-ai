import React, { useEffect, useState, useRef } from 'react';
import { Player, Board, GameState } from '../utils/OthelloGame';
import { stoneDesigns } from '../types/StoneDesign';

interface OthelloBoardProps {
  gameState: GameState;
  onCellClick: (row: number, col: number) => void;
}

const OthelloBoard: React.FC<OthelloBoardProps> = ({ gameState, onCellClick }) => {
  const { board, validMoves, currentPlayer, blackDesign, whiteDesign, gameStarted } = gameState;
  const [cellSize, setCellSize] = useState('3.5rem');
  const [gapSize, setGapSize] = useState('6px');
  const boardRef = useRef<HTMLDivElement>(null);

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

  const getStoneDesign = (player: Player) => {
    const designId = player === 'black' ? blackDesign : whiteDesign;
    return stoneDesigns.find(design => design.id === designId);
  };

  const renderCell = (row: number, col: number) => {
    const cell = board[row][col];
    const isValidMove = validMoves[row][col];
    const cellKey = `${row}-${col}`;
    const design = cell ? getStoneDesign(cell) : null;

    const stoneSizeRatio = 0.7; // 이모지 크기 비율

    return (
      <button
        key={cellKey}
        className={`
          border border-gray-300 bg-gray-50 
          relative transition-all duration-200 ease-in-out
          hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300
          ${isValidMove && gameStarted ? 'ring-2 ring-blue-300' : ''}
          ${!gameStarted ? 'cursor-not-allowed opacity-80' : ''}
        `}
        style={{
          width: cellSize,
          height: cellSize,
        }}
        onClick={() => gameStarted && onCellClick(row, col)}
        disabled={!gameStarted || gameState.gameOver}
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
        {isValidMove && !cell && gameStarted && (
          <div
            className="absolute left-1/2 top-1/2 synchronized-bounce
              flex items-center justify-center"
            style={{
              fontSize: `calc(${cellSize} * ${stoneSizeRatio})`, // 실제 돌과 동일한 크기
              lineHeight: 1,
              filter: `drop-shadow(0 1px 1px ${getStoneDesign(currentPlayer)?.shadowColor || 'transparent'})`,
            }}
          >
            {getStoneDesign(currentPlayer)?.emoji}
          </div>
        )}
      </button>
    );
  };

  const boardSize = `calc((${cellSize} * 8) + (${gapSize} * 9))`;

  return (
    <div 
      ref={boardRef}
      className="inline-block bg-gray-100 rounded-lg shadow-lg"
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
            row.map((_, colIndex) => renderCell(rowIndex, colIndex))
          )}
        </div>
      </div>
    </div>
  );
};

export default OthelloBoard;