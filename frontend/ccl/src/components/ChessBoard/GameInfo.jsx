import React, { useState, useEffect } from 'react';
import './GameInfo.css';

const GameInfo = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [minuteAnimation, setMinuteAnimation] = useState(false);
  
  // Mock opponent data
  const opponent = {
    username: "Magnus_C",
    avatar: "https://picsum.photos/seed/opponent/100/100.jpg",
    rank: 1
  };
  
  useEffect(() => {
    if (!isMyTurn) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        
        const newTime = prevTime - 1;
        
        // Trigger animation when a minute passes
        if (newTime % 60 === 0) {
          setMinuteAnimation(true);
          setTimeout(() => setMinuteAnimation(false), 2000);
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isMyTurn]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleWithdraw = () => {
    // Handle withdraw logic
    console.log('Withdraw clicked');
  };
  
  const handleSurrender = () => {
    // Handle surrender logic
    console.log('Surrender clicked');
  };
  
  const isLowTime = timeLeft < 60;
  
  return (
    <div className="game-info">
      <div className="info-header">
        <h2 className="info-title">
          <span className="neon-text">GAME</span> INFO
        </h2>
      </div>
      
      <div className="info-content">
        <div className="clock-container">
          <div className={`clock ${isLowTime ? 'low-time' : ''} ${minuteAnimation ? 'minute-passed' : ''}`}>
            <div className="digital-clock">
              {formatTime(timeLeft).split('').map((digit, index) => (
                <div key={index} className="digit">
                  {digit === ':' ? (
                    <div className="colon">:</div>
                  ) : (
                    <div className="seven-segment">
                      {getSevenSegmentDisplay(digit)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="turn-indicator">
          <div className={`turn-status ${isMyTurn ? 'your-turn' : 'opponent-turn'}`}>
            {isMyTurn ? 'Your Turn' : 'Opponent\'s Turn'}
          </div>
        </div>
        
        <div className="opponent-info">
          <h3 className="opponent-title">Opponent</h3>
          <div className="opponent-details">
            <img 
              src={opponent.avatar} 
              alt={opponent.username} 
              className="opponent-avatar" 
            />
            <div className="opponent-text">
              <div className="opponent-name">{opponent.username}</div>
              <div className="opponent-rank">Rank #{opponent.rank}</div>
            </div>
          </div>
        </div>
        
        <div className="game-actions">
          <button 
            className="action-button withdraw"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
          <button 
            className="action-button surrender"
            onClick={handleSurrender}
          >
            Surrender
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to create seven-segment display for digits
const getSevenSegmentDisplay = (digit) => {
  const segments = {
    '0': ['a', 'b', 'c', 'd', 'e', 'f'],
    '1': ['b', 'c'],
    '2': ['a', 'b', 'g', 'e', 'd'],
    '3': ['a', 'b', 'g', 'c', 'd'],
    '4': ['f', 'g', 'b', 'c'],
    '5': ['a', 'f', 'g', 'c', 'd'],
    '6': ['a', 'f', 'g', 'c', 'd', 'e'],
    '7': ['a', 'b', 'c'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    '9': ['a', 'b', 'c', 'd', 'f', 'g']
  };
  
  const digitSegments = segments[digit] || [];
  
  return (
    <div className="digit-display">
      <div className={`segment horizontal top ${digitSegments.includes('a') ? 'active' : ''}`}></div>
      <div className="segment-group">
        <div className={`segment vertical top-left ${digitSegments.includes('f') ? 'active' : ''}`}></div>
        <div className={`segment vertical top-right ${digitSegments.includes('b') ? 'active' : ''}`}></div>
      </div>
      <div className={`segment horizontal middle ${digitSegments.includes('g') ? 'active' : ''}`}></div>
      <div className="segment-group">
        <div className={`segment vertical bottom-left ${digitSegments.includes('e') ? 'active' : ''}`}></div>
        <div className={`segment vertical bottom-right ${digitSegments.includes('c') ? 'active' : ''}`}></div>
      </div>
      <div className={`segment horizontal bottom ${digitSegments.includes('d') ? 'active' : ''}`}></div>
    </div>
  );
};

export default GameInfo;