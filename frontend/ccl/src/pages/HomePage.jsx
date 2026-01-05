import React from 'react';
import './HomePage.css';
import RotatingBanner from '../components/RotatingBanner/RotatingBanner';
import Leaderboard from '../components/LeaderBoard/LeaderBoard';
import MatchHistory from '../components/MatchHistory/MatchHistory';
import UserPoints from '../components/UserPoints/UserPoints';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="app-header">
        <h1 className="app-title">
          <span className="neon-text">CHESS</span> ARENA
        </h1>
      </header>
      
      <main className="main-content">
        <div className="left-column">
          <RotatingBanner />
          <UserPoints />
        </div>
        
        <div className="center-column">
          <Leaderboard />
        </div>
        
        <div className="right-column">
          <MatchHistory />
        </div>
      </main>
    </div>
  );
};

export default HomePage;