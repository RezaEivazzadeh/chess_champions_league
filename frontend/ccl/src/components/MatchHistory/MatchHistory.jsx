import React from 'react';
import './MatchHistory.css';

const MatchHistory = () => {
  // Mock data for match history
  const matches = [
    {
      id: 1,
      opponent: "Magnus_C",
      opponentAvatar: "https://picsum.photos/seed/user1/50/50.jpg",
      result: "win",
      timeControl: "10 min",
      date: "2 hours ago",
      moves: 42
    },
    {
      id: 2,
      opponent: "HikaruN",
      opponentAvatar: "https://picsum.photos/seed/user2/50/50.jpg",
      result: "loss",
      timeControl: "5 min",
      date: "5 hours ago",
      moves: 38
    },
    {
      id: 3,
      opponent: "FabianoC",
      opponentAvatar: "https://picsum.photos/seed/user3/50/50.jpg",
      result: "draw",
      timeControl: "15 min",
      date: "1 day ago",
      moves: 67
    },
    {
      id: 4,
      opponent: "Ding_Liren",
      opponentAvatar: "https://picsum.photos/seed/user4/50/50.jpg",
      result: "win",
      timeControl: "3 min",
      date: "2 days ago",
      moves: 28
    },
    {
      id: 5,
      opponent: "Ian_Nepomniachtchi",
      opponentAvatar: "https://picsum.photos/seed/user5/50/50.jpg",
      result: "win",
      timeControl: "10 min",
      date: "3 days ago",
      moves: 55
    }
  ];
  
  return (
    <div className="match-history">
      <div className="match-history-header">
        <h2 className="match-history-title">
          <span className="neon-text">MATCH</span> HISTORY
        </h2>
      </div>
      
      <div className="match-history-content">
        <div className="match-list">
          {matches.map(match => (
            <div key={match.id} className="match-item">
              <div className="match-result">
                <span className={`result-badge ${match.result}`}>
                  {match.result === 'win' ? 'W' : match.result === 'loss' ? 'L' : 'D'}
                </span>
              </div>
              
              <div className="match-details">
                <div className="opponent-info">
                  <img 
                    src={match.opponentAvatar} 
                    alt={match.opponent} 
                    className="opponent-avatar" 
                  />
                  <span className="opponent-name">{match.opponent}</span>
                </div>
                
                <div className="match-meta">
                  <div className="time-control">{match.timeControl}</div>
                  <div className="match-date">{match.date}</div>
                </div>
              </div>
              
              <div className="match-stats">
                <div className="moves-count">{match.moves} moves</div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="view-all-button">View All Matches</button>
      </div>
    </div>
  );
};

export default MatchHistory;