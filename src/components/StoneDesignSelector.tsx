import React from 'react';
import { StoneDesign, StoneDesignType, stoneDesigns } from '../types/StoneDesign';
import { Player } from '../utils/OthelloGame';

interface StoneDesignSelectorProps {
  player: Player;
  selectedDesign: StoneDesignType | null;
  opponentDesign: StoneDesignType | null;
  onSelect: (design: StoneDesignType) => void;
}

const StoneDesignSelector: React.FC<StoneDesignSelectorProps> = ({
  selectedDesign,
  opponentDesign,
  onSelect,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        동물 선택
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {stoneDesigns.map((design) => {
          const isSelected = selectedDesign === design.id;
          const isDisabled = opponentDesign === design.id;
          
          return (
            <button
              key={design.id}
              onClick={() => !isDisabled && onSelect(design.id)}
              disabled={isDisabled}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : isDisabled
                    ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }
              `}
            >
              {/* 동물 미리보기 */}
              <div
                className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: design.backgroundColor,
                  boxShadow: `0 3px 6px ${design.shadowColor}`,
                }}
              >
                <span className="text-5xl transform hover:scale-110 transition-transform">
                  {design.emoji}
                </span>
              </div>
              
              {/* 동물 정보 */}
              <div className="text-center">
                <h4 className="font-semibold text-gray-800">{design.name}</h4>
                <p className="text-sm text-gray-600">{design.description}</p>
              </div>

              {/* 선택 표시 */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              )}

              {/* 비활성화 표시 */}
              {isDisabled && (
                <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center rounded-lg">
                  <p className="text-sm text-gray-600 font-medium">
                    상대가 선택함
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StoneDesignSelector;