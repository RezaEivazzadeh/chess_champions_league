import React, { useState } from 'react';
import './LeaderBoard.css';


const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  
  // Mock data for leaderboards
  const monthlyLeaderboard = [
    { id: 1, username: "Magnus_C", points: 2847, avatar: "https://picsum.photos/seed/user1/50/50.jpg" },
    { id: 2, username: "HikaruN", points: 2820, avatar: "https://picsum.photos/seed/user2/50/50.jpg" },
    { id: 3, username: "FabianoC", points: 2805, avatar: "https://picsum.photos/seed/user3/50/50.jpg" },
    { id: 4, username: "Ding_Liren", points: 2791, avatar: "https://picsum.photos/seed/user4/50/50.jpg" },
    { id: 5, username: "Ian_Nepomniachtchi", points: 2793, avatar: "https://picsum.photos/seed/user5/50/50.jpg" },
    { id: 6, username: "Wesley_So", points: 2778, avatar: "https://picsum.photos/seed/user6/50/50.jpg" },
    { id: 7, username: "Levon_Aronian", points: 2775, avatar: "https://picsum.photos/seed/user7/50/50.jpg" },
    { id: 8, username: "Shakhriyar_Mamedyarov", points: 2769, avatar: "https://picsum.photos/seed/user8/50/50.jpg" },
    { id: 9, username: "Anish_Giri", points: 2764, avatar: "https://picsum.photos/seed/user9/50/50.jpg" },
    { id: 10, username: "Viswanathan_Anand", points: 2754, avatar: "https://picsum.photos/seed/user10/50/50.jpg" }
  ];
  
  const weeklyLeaderboard = [
    { id: 1, username: "HikaruN", points: 520, avatar: "https://picsum.photos/seed/user2/50/50.jpg" },
    { id: 2, username: "Magnus_C", points: 515, avatar: "https://picsum.photos/seed/user1/50/50.jpg" },
    { id: 3, username: "FabianoC", points: 502, avatar: "https://picsum.photos/seed/user3/50/50.jpg" },
    { id: 4, username: "Ian_Nepomniachtchi", points: 498, avatar: "https://picsum.photos/seed/user5/50/50.jpg" },
    { id: 5, username: "Ding_Liren", points: 485, avatar: "https://picsum.photos/seed/user4/50/50.jpg" },
    { id: 6, username: "Wesley_So", points: 476, avatar: "https://picsum.photos/seed/user6/50/50.jpg" },
    { id: 7, username: "Levon_Aronian", points: 468, avatar: "https://picsum.photos/seed/user7/50/50.jpg" },
    { id: 8, username: "Shakhriyar_Mamedyarov", points: 452, avatar: "https://picsum.photos/seed/user8/50/50.jpg" },
    { id: 9, username: "Anish_Giri", points: 441, avatar: "https://picsum.photos/seed/user9/50/50.jpg" },
    { id: 10, username: "Viswanathan_Anand", points: 432, avatar: "https://picsum.photos/seed/user10/50/50.jpg" }
  ];
  
  const yearlyLeaderboard = [
    { id: 1, username: "Magnus_C", points: 12450, avatar: "https://picsum.photos/seed/user1/50/50.jpg" },
    { id: 2, username: "FabianoC", points: 12320, avatar: "https://picsum.photos/seed/user3/50/50.jpg" },
    { id: 3, username: "HikaruN", points: 12280, avatar: "https://picsum.photos/seed/user2/50/50.jpg" },
    { id: 4, username: "Ding_Liren", points: 12190, avatar: "https://picsum.photos/seed/user4/50/50.jpg" },
    { id: 5, username: "Ian_Nepomniachtchi", points: 12150, avatar: "https://picsum.photos/seed/user5/50/50.jpg" },
    { id: 6, username: "Wesley_So", points: 12080, avatar: "https://picsum.photos/seed/user6/50/50.jpg" },
    { id: 7, username: "Levon_Aronian", points: 12010, avatar: "https://picsum.photos/seed/user7/50/50.jpg" },
    { id: 8, username: "Shakhriyar_Mamedyarov", points: 11950, avatar: "https://picsum.photos/seed/user8/50/50.jpg" },
    { id: 9, username: "Anish_Giri", points: 11890, avatar: "https://picsum.photos/seed/user9/50/50.jpg" },
    { id: 10, username: "Viswanathan_Anand", points: 11820, avatar: "https://picsum.photos/seed/user10/50/50.jpg" }
  ];
  
  // Current user data (mock)
  const currentUser = {
    username: "You",
    monthlyRank: 15,
    monthlyPoints: 2680,
    weeklyRank: 12,
    weeklyPoints: 415,
    yearlyRank: 18,
    yearlyPoints: 11650,
    avatar: "https://picsum.photos/seed/currentuser/50/50.jpg"
  };
  
  const getLeaderboard = () => {
    switch(activeTab) {
      case 'weekly':
        return weeklyLeaderboard;
      case 'yearly':
        return yearlyLeaderboard;
      default:
        return monthlyLeaderboard;
    }
  };
  
  const getUserRank = () => {
    switch(activeTab) {
      case 'weekly':
        return currentUser.weeklyRank;
      case 'yearly':
        return currentUser.yearlyRank;
      default:
        return currentUser.monthlyRank;
    }
  };
  
  const getUserPoints = () => {
    switch(activeTab) {
      case 'weekly':
        return currentUser.weeklyPoints;
      case 'yearly':
        return currentUser.yearlyPoints;
      default:
        return currentUser.monthlyPoints;
    }
  };
  
  const leaderboard = getLeaderboard();
  const userRank = getUserRank();
  const userPoints = getUserPoints();
  const userInTopTen = userRank <= 10;
  
  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">
          <span className="neon-text">LEADERBOARD</span>
        </h2>
        <div className="leaderboard-tabs">
          <button 
            className={`tab ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`tab ${activeTab === 'yearly' ? 'active' : ''}`}
            onClick={() => setActiveTab('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>
      
      <div className="leaderboard-content">
        <div className="leaderboard-list">
          {leaderboard.map((player, index) => {
            const isCurrentUser = !userInTopTen && index === 9 && player.id === 10;
            
            return (
              <div 
                key={player.id} 
                className={`leaderboard-item ${index < 3 ? `top-${index + 1}` : ''} ${isCurrentUser ? 'user-gap' : ''}`}
              >
                <div className="rank">
                  {index < 3 ? (
                    <span className={`rank-medal rank-${index + 1}`}>{index + 1}</span>
                  ) : (
                    <span className="rank-number">{index + 1}</span>
                  )}
                </div>
                <div className="player-info">
                  <img src={player.avatar} alt={player.username} className="player-avatar" />
                  <span className="player-name">{player.username}</span>
                </div>
                <div className="player-points">{player.points}</div>
              </div>
            );
          })}
          
          {!userInTopTen && (
            <>
              <div className="leaderboard-gap"></div>
              <div className="leaderboard-item user-rank">
                <div className="rank">
                  <span className="rank-number">{userRank}</span>
                </div>
                <div className="player-info">
                  <img src={currentUser.avatar} alt={currentUser.username} className="player-avatar" />
                  <span className="player-name">{currentUser.username}</span>
                </div>
                <div className="player-points">{userPoints}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;