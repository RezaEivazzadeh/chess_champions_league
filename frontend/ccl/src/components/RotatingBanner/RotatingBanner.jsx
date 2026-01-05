import React, { useState, useEffect } from 'react';
import './RotatingBanner.css';

const RotatingBanner = () => {
  const [currentLeagueIndex, setCurrentLeagueIndex] = useState(0);
  
  // Mock data for leagues
  const leagues = [
    {
      id: 1,
      name: "Grand Masters League",
      participants: 128,
      prize: "$5,000",
      endDate: "5 days left",
      image: "https://picsum.photos/seed/chess1/800/400.jpg"
    },
    {
      id: 2,
      name: "Rapid Chess Championship",
      participants: 256,
      prize: "$3,000",
      endDate: "12 days left",
      image: "https://picsum.photos/seed/chess2/800/400.jpg"
    },
    {
      id: 3,
      name: "Blitz Tournament",
      participants: 64,
      prize: "$2,000",
      endDate: "3 days left",
      image: "https://picsum.photos/seed/chess3/800/400.jpg"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLeagueIndex((prevIndex) => (prevIndex + 1) % leagues.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [leagues.length]);
  
  const goToLeague = (index) => {
    setCurrentLeagueIndex(index);
  };
  
  return (
    <div className="rotating-banner">
      <div className="banner-container">
        <div className="banner-image-container">
          <img 
            src={leagues[currentLeagueIndex].image} 
            alt={leagues[currentLeagueIndex].name}
            className="banner-image"
          />
          <div className="banner-overlay">
            <h2 className="league-name">{leagues[currentLeagueIndex].name}</h2>
            <div className="league-details">
              <div className="league-detail">
                <span className="detail-label">Participants:</span>
                <span className="detail-value">{leagues[currentLeagueIndex].participants}</span>
              </div>
              <div className="league-detail">
                <span className="detail-label">Prize Pool:</span>
                <span className="detail-value neon-text">{leagues[currentLeagueIndex].prize}</span>
              </div>
              <div className="league-detail">
                <span className="detail-label">Ends In:</span>
                <span className="detail-value warning">{leagues[currentLeagueIndex].endDate}</span>
              </div>
            </div>
            <button className="join-button">Join Tournament</button>
          </div>
        </div>
      </div>
      
      <div className="banner-indicators">
        {leagues.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentLeagueIndex ? 'active' : ''}`}
            onClick={() => goToLeague(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default RotatingBanner;