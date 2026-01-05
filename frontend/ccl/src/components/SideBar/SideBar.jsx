// SideBar.jsx
import React, { useState } from 'react';
import './SideBar.css';
import { DifficultyModal, ConfirmationModal } from '../Modal/Modal';


const SideBar = ({ username, elo, hasActiveGame = false, onSurrender, onNewGame }) => {
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleNewGame = () => {
    if (hasActiveGame) {
      setShowConfirmationModal(true);
    } else {
      setShowDifficultyModal(true);
    }
  };

  const handleConfirmNewGame = async () => {
    setShowConfirmationModal(false);
    
    // Call surrender API
    try {
      await fetch('/api/surrender', { method: 'POST' });
      if (onSurrender) onSurrender();
    } catch (error) {
      console.error('Error surrendering game:', error);
    }
    
    // Show difficulty modal after surrender
    setShowDifficultyModal(true);
  };

  const handleSelectDifficulty = (difficulty) => {
    setShowDifficultyModal(false);
    
    // Start new game with selected difficulty
    if (onNewGame) {
      onNewGame(difficulty);
    }
  };

  const handleGameHistory = () => {
    console.log('Navigating to game history...');
  };

  return (
    <>
      <aside className="sidebar">
        <div className="user-profile">
          <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
          <h2 className="user-username">{username}</h2>
          <p className="user-elo">ELO: {elo}</p>
        </div>
        <nav>
          <ul className="nav-menu">
            <li><button onClick={handleNewGame}>New Game</button></li>
            <li><button onClick={handleGameHistory}>Game History</button></li>
            <li><button>Leaderboard</button></li>
            <li><button>Settings</button></li>
          </ul>
        </nav>
      </aside>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          onConfirm={handleConfirmNewGame}
          onCancel={() => setShowConfirmationModal(false)}
        />
      )}

      {/* Difficulty Selection Modal */}
      {showDifficultyModal && (
        <DifficultyModal
          onSelectDifficulty={handleSelectDifficulty}
          onClose={() => setShowDifficultyModal(false)}
        />
      )}
    </>
  );
};

export default SideBar;