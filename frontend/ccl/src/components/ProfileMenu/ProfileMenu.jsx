import React, { useEffect, useRef, useState } from 'react';
import './ProfileMenu.css';

const ProfileMenu = ({ onEditProfile, onViewHistory }) => {
  // Mock user data (kept in sync with UserPoints mock)
  const user = {
    fullName: "Alex Carlsen",
    username: "ChessMaster99",
    avatar: "https://picsum.photos/seed/currentuser/100/100.jpg",
    rank: 15,
    userId: "USR-0042",
    email: "alex.carlsen@chessarena.gg"
  };

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleAction = (callback) => {
    setIsOpen(false);
    if (callback) callback();
  };

  return (
    <div className="profile-menu" ref={menuRef}>
      <button
        className="profile-trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img src={user.avatar} alt={user.fullName} className="profile-trigger-avatar" />
        <span className="profile-trigger-name">{user.username}</span>
        <span className={`profile-trigger-caret ${isOpen ? 'open' : ''}`}>▾</span>
      </button>

      {isOpen && (
        <div className="profile-dropdown" role="menu">
          <div className="profile-card-header">
            <img src={user.avatar} alt={user.fullName} className="profile-card-avatar" />
            <div className="profile-card-identity">
              <h3 className="profile-card-name">{user.fullName}</h3>
              <span className="profile-card-username">@{user.username}</span>
              <span className="profile-card-rank">Rank #{user.rank}</span>
            </div>
          </div>

          <div className="profile-card-details">
            <div className="profile-detail-row">
              <span className="profile-detail-label">User ID</span>
              <span className="profile-detail-value">{user.userId}</span>
            </div>
            <div className="profile-detail-row">
              <span className="profile-detail-label">Email</span>
              <span className="profile-detail-value">{user.email}</span>
            </div>
          </div>

          <div className="profile-card-actions">
            <button
              className="profile-action-button edit"
              onClick={() => handleAction(onEditProfile)}
            >
              Edit Profile
            </button>
            <button
              className="profile-action-button history"
              onClick={() => handleAction(onViewHistory)}
            >
              History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
