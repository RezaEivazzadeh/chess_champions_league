import React from 'react';
import './MatchDetailModal.css';
import { formatDuration, statusLabel } from '../../data/matchHistory';

const MatchDetailModal = ({ match, onClose }) => {
  if (!match) return null;

  return (
    <div className="match-modal-overlay" onClick={onClose}>
      <div className="match-modal" onClick={(e) => e.stopPropagation()}>
        <div className={`match-modal-header ${match.status}`}>
          <div className="match-modal-heading">
            <h2>
              vs <span className="neon-text">{match.opponent}</span>
            </h2>
            <span className={`match-status-badge ${match.status}`}>
              {statusLabel(match.status)}
            </span>
          </div>
          <button className="match-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="match-modal-body">
          <div className="match-detail-grid">
            <div className="match-detail-cell">
              <span className="match-detail-label">Date</span>
              <span className="match-detail-value">{match.date}</span>
            </div>
            <div className="match-detail-cell">
              <span className="match-detail-label">Time</span>
              <span className="match-detail-value">{match.time}</span>
            </div>
            <div className="match-detail-cell">
              <span className="match-detail-label">Tournament</span>
              <span className="match-detail-value">{match.tournament}</span>
            </div>
            <div className="match-detail-cell">
              <span className="match-detail-label">League</span>
              <span className="match-detail-value">{match.league}</span>
            </div>
            <div className="match-detail-cell">
              <span className="match-detail-label">Opponent</span>
              <span className="match-detail-value">{match.opponent}</span>
            </div>
            <div className="match-detail-cell">
              <span className="match-detail-label">Total Moves</span>
              <span className="match-detail-value">{match.totalMoves}</span>
            </div>
            <div className="match-detail-cell">
              <span className="match-detail-label">Total Time</span>
              <span className="match-detail-value">
                {formatDuration(match.totalTimeSeconds)}
              </span>
            </div>
            <div className="match-detail-cell">
              <span className="match-detail-label">Status</span>
              <span className="match-detail-value">{statusLabel(match.status)}</span>
            </div>
          </div>

          <div className="match-moves-section">
            <div className="match-moves-heading">
              <span className="neon-text">MOVES</span>
              <div className="match-moves-legend">
                <span className="legend-item">
                  <span className="legend-dot white" /> You (White)
                </span>
                <span className="legend-item">
                  <span className="legend-dot black" /> {match.opponent} (Black)
                </span>
              </div>
            </div>

            <div className="match-moves-table">
              <div className="match-moves-row header">
                <div className="moves-col num">#</div>
                <div className="moves-col white">White</div>
                <div className="moves-col black">Black</div>
              </div>
              {match.moves.map((pair) => (
                <div key={pair.number} className="match-moves-row">
                  <div className="moves-col num">{pair.number}.</div>
                  <div className="moves-col white">{pair.white || '—'}</div>
                  <div className="moves-col black">{pair.black || '—'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="match-modal-footer">
          <button className="match-modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailModal;
