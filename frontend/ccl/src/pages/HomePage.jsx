import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import RotatingBanner from '../components/RotatingBanner/RotatingBanner';
import Leaderboard from '../components/LeaderBoard/LeaderBoard';
import MatchHistory from '../components/MatchHistory/MatchHistory';
import UserPoints from '../components/UserPoints/UserPoints';
import ProfileMenu from '../components/ProfileMenu/ProfileMenu';

const HomePage = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    // Placeholder: wire up to an edit-profile flow / route when available
    alert('Edit Profile coming soon!');
  };

  const handleViewHistory = () => {
    navigate('/history');
  };

  return (
    <div className="home-page">
      <header className="app-header">
        <div className="header-left">
          <ProfileMenu
            onEditProfile={handleEditProfile}
            onViewHistory={handleViewHistory}
          />
        </div>
        <h1 className="app-title">
          <span className="neon-text">CHESS</span> ARENA
        </h1>
        <div className="header-right" />
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