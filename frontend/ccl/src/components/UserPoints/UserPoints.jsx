import React from 'react';
import './UserPoints.css';

const UserPoints = () => {
  // Mock user data
  const userData = {
    username: "ChessMaster99",
    avatar: "https://picsum.photos/seed/currentuser/100/100.jpg",
    totalPoints: 2680,
    rank: 15,
    wins: 42,
    losses: 18,
    draws: 7,
    winRate: 63.6
  };
  
  return (
    <div className="user-points">
      <div className="user-profile">
        <img 
          src={userData.avatar} 
          alt={userData.username} 
          className="user-avatar" 
        />
        <h3 className="user-name">{userData.username}</h3>
        <div className="user-rank">Rank #{userData.rank}</div>
      </div>
      
      <div className="points-container">
        <div className="points-display">
          <div className="points-label">Total Points</div>
          <div className="points-value neon-text">{userData.totalPoints}</div>
        </div>
        
        <div className="points-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${userData.winRate}%` }}
            ></div>
          </div>
          <div className="progress-text">Win Rate: {userData.winRate}%</div>
        </div>
      </div>
      
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-value win">{userData.wins}</div>
          <div className="stat-label">Wins</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value loss">{userData.losses}</div>
          <div className="stat-label">Losses</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value draw">{userData.draws}</div>
          <div className="stat-label">Draws</div>
        </div>
      </div>
      
      <button className="profile-button">View Full Profile</button>
    </div>
  );
};

export default UserPoints;