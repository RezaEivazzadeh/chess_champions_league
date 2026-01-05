import React, { useState } from 'react';
import GameArea from '../GameArea/GameArea';
import './MainPage.css';
import SideBar from '../SideBar/SideBar';

// This data would typically come from a global state (like Redux or Context)
// or a fetch request to your backend API after login.
const user = {
  username: 'ChessMaster',
  elo: 1520,
};

const MainPage = () => {
  const hasActiveGame = useState(false);

  return (
    <div className="main-page">
      <SideBar 
        username={user.username} 
        elo={user.elo} 
        hasActiveGame={hasActiveGame}
      />
      <GameArea hasActiveGame={hasActiveGame}/>
    </div>
  );
};

export default MainPage;
