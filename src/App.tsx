import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import ModeSelection from './components/ModeSelection';
import StoneSelectionScreen from './components/StoneSelectionScreen';
import GameScreen from './components/GameScreen';
import OthelloGame from './utils/OthelloGame';
import { OthelloAI, Difficulty } from './ai/OthelloAI';

type Screen = 'welcome' | 'mode' | 'selection' | 'game';
type GameMode = 'pvp' | 'ai';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [game, setGame] = useState(() => new OthelloGame());
  const [player1Design, setPlayer1Design] = useState<string | null>(null);
  const [player2Design, setPlayer2Design] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [aiDifficulty, setAiDifficulty] = useState<Difficulty | null>(null);
  const [ai, setAi] = useState<OthelloAI | null>(null);

  const handleStoneSelection = (playerId: 1 | 2, designId: string) => {
    if (playerId === 1) {
      setPlayer1Design(designId);
    } else {
      setPlayer2Design(designId);
    }
  };

  const handleBack = () => {
    setPlayer2Design(null);
  };

  const startGame = () => {
    if (player1Design && player2Design) {
      game.setPlayerDesigns(player1Design, player2Design);
      if (gameMode === 'ai' && aiDifficulty) {
        setAi(new OthelloAI(aiDifficulty));
      }
      setCurrentScreen('game');
    }
  };

  const handleNewGame = () => {
    setGame(new OthelloGame());
    setPlayer1Design(null);
    setPlayer2Design(null);
    setCurrentScreen('welcome');
    setGameMode(null);
    setAiDifficulty(null);
    setAi(null);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!game.isValidMove(row, col)) return;

    // 플레이어의 수를 둠
    game.makeMove(row, col);
    setGame(new OthelloGame(game));

    // AI 모드에서 AI의 수를 둠
    if (gameMode === 'ai' && ai && !game.getGameState().gameOver) {
      setTimeout(() => {
        const gameState = game.getGameState();
        const aiMove = ai.getBestMove(gameState.board, gameState.currentPlayer);
        if (aiMove) {
          game.makeMove(aiMove.row, aiMove.col);
          setGame(new OthelloGame(game));
        }
      }, 500); // AI 응답 시간
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={() => setCurrentScreen('mode')} />
      )}
      
      {currentScreen === 'mode' && (
        <ModeSelection
          onSelectMode={setGameMode}
          onSelectDifficulty={setAiDifficulty}
          selectedMode={gameMode}
          selectedDifficulty={aiDifficulty}
          onContinue={() => setCurrentScreen('selection')}
        />
      )}
      
      {currentScreen === 'selection' && (
        <StoneSelectionScreen
          onSelectStone={handleStoneSelection}
          onBack={handleBack}
          onStart={startGame}
          player1Design={player1Design}
          player2Design={player2Design}
          isAIMode={gameMode === 'ai'}
        />
      )}
      
      {currentScreen === 'game' && (
        <GameScreen
          gameState={game.getGameState()}
          onCellClick={handleCellClick}
          onNewGame={handleNewGame}
          isAIMode={gameMode === 'ai'}
        />
      )}
    </div>
  );
}

export default App;