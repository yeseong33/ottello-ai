import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen w-full cursor-pointer bg-white"
      onClick={onStart}
    >
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8 animate-pulse">
        오셀로 게임
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 animate-bounce">
        게임 시작하기
      </p>
      <p className="text-sm text-gray-500 mt-4">
        화면을 클릭하세요
      </p>
    </div>
  );
};

export default WelcomeScreen;