import React from 'react';
import './SideBar.css';

const SideBar = ({ username, elo }) => {
  const handleNewGame = () => {
    // Logic to open a modal for "Find Match" or "Play AI"
    console.log('Requesting new game...');
  };

  const handleGameHistory = () => {
    console.log('Navigating to game history...');
  };

  return (
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
  );
};

export default SideBar;