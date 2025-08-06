import React from 'react';
import { StoneDesign, StoneDesignType, stoneDesigns } from '../types/StoneDesign';

interface StoneDesignSelectorProps {
  onSelect: (designId: string) => void;
  selectedDesign: string | null;
  disabledDesigns?: string[];
  opponentDesign?: string | null;
}

const StoneDesignSelector: React.FC<StoneDesignSelectorProps> = ({
  onSelect,
  selectedDesign,
  disabledDesigns = [],
  opponentDesign = null
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {stoneDesigns.map((design) => {
        const isSelected = selectedDesign === design.id;
        const isDisabled = disabledDesigns.includes(design.id);

        return (
          <button
            key={design.id}
            className={`
              p-4 rounded-lg transition-all transform
              ${isSelected
                ? 'bg-blue-500 text-white scale-105 shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={() => !isDisabled && onSelect(design.id)}
            disabled={isDisabled}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-4xl filter drop-shadow">{design.emoji}</span>
              <p className="font-medium">{design.name}</p>
              <p className="text-sm text-gray-600">{design.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default StoneDesignSelector;