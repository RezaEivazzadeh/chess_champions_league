import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchHistoryPage.css';
import MatchDetailModal from '../components/MatchHistory/MatchDetailModal';
import {
  matchHistory,
  formatDuration,
  statusLabel,
  distinctTournaments,
  distinctLeagues,
  timeBuckets
} from '../data/matchHistory';

const initialFilters = {
  tournament: 'all',
  league: 'all',
  status: 'all',
  timeBucket: 'all',
  fromDate: '',
  toDate: ''
};

const MatchHistoryPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(initialFilters);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(initialFilters);

  const filteredMatches = useMemo(() => {
    const bucket = timeBuckets.find((b) => b.id === filters.timeBucket);

    return matchHistory.filter((match) => {
      if (filters.tournament !== 'all' && match.tournament !== filters.tournament)
        return false;
      if (filters.league !== 'all' && match.league !== filters.league) return false;
      if (filters.status !== 'all' && match.status !== filters.status) return false;
      if (bucket && !bucket.test(match.totalTimeSeconds)) return false;
      if (filters.fromDate && match.date < filters.fromDate) return false;
      if (filters.toDate && match.date > filters.toDate) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="history-page">
      <header className="history-page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 className="history-page-title">
          <span className="neon-text">MATCH</span> HISTORY
        </h1>
        <div className="history-header-spacer" />
      </header>

      <main className="history-page-content">
        {/* Filter bar */}
        <div className="history-filters">
          <div className="filter-group">
            <label className="filter-label">Tournament</label>
            <select
              className="filter-select"
              value={filters.tournament}
              onChange={(e) => updateFilter('tournament', e.target.value)}
            >
              <option value="all">All tournaments</option>
              {distinctTournaments.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">League</label>
            <select
              className="filter-select"
              value={filters.league}
              onChange={(e) => updateFilter('league', e.target.value)}
            >
              <option value="all">All leagues</option>
              {distinctLeagues.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              className="filter-select"
              value={filters.status}
              onChange={(e) => updateFilter('status', e.target.value)}
            >
              <option value="all">All results</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="draw">Draw</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Time spent</label>
            <select
              className="filter-select"
              value={filters.timeBucket}
              onChange={(e) => updateFilter('timeBucket', e.target.value)}
            >
              {timeBuckets.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">From date</label>
            <input
              type="date"
              className="filter-input"
              value={filters.fromDate}
              onChange={(e) => updateFilter('fromDate', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">To date</label>
            <input
              type="date"
              className="filter-input"
              value={filters.toDate}
              onChange={(e) => updateFilter('toDate', e.target.value)}
            />
          </div>

          <button className="filter-reset" onClick={resetFilters}>
            Reset
          </button>
        </div>

        <div className="history-result-count">
          {filteredMatches.length} match
          {filteredMatches.length === 1 ? '' : 'es'} found
        </div>

        {/* Match table */}
        <div className="history-table">
          <div className="history-table-row header">
            <div className="hcol date">Date / Time</div>
            <div className="hcol tournament">Tournament</div>
            <div className="hcol league">League</div>
            <div className="hcol opponent">Opponent</div>
            <div className="hcol moves">Moves</div>
            <div className="hcol time">Total Time</div>
            <div className="hcol status">Status</div>
          </div>

          {filteredMatches.length === 0 ? (
            <div className="history-empty">No matches match your filters.</div>
          ) : (
            filteredMatches.map((match) => (
              <button
                key={match.id}
                className="history-table-row item"
                onClick={() => setSelectedMatch(match)}
              >
                <div className="hcol date">
                  <span className="cell-date">{match.date}</span>
                  <span className="cell-time">{match.time}</span>
                </div>
                <div className="hcol tournament">{match.tournament}</div>
                <div className="hcol league">
                  <span className={`league-tag ${match.league.toLowerCase()}`}>
                    {match.league}
                  </span>
                </div>
                <div className="hcol opponent">
                  <img
                    src={match.opponentAvatar}
                    alt={match.opponent}
                    className="opponent-avatar-sm"
                  />
                  <span>{match.opponent}</span>
                </div>
                <div className="hcol moves">{match.totalMoves}</div>
                <div className="hcol time">
                  {formatDuration(match.totalTimeSeconds)}
                </div>
                <div className="hcol status">
                  <span className={`status-pill ${match.status}`}>
                    {statusLabel(match.status)}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </main>

      <MatchDetailModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </div>
  );
};

export default MatchHistoryPage;
