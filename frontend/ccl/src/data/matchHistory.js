// Mock match-history data shared by the history page and the detail modal.
// In a real app this would come from an API.

// A few reusable move sequences (flat list, alternating white/black).
const RUY_LOPEZ = [
  'e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7',
  'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O', 'h3', 'Nb8', 'd4', 'Nbd7',
  'Nbd2', 'Bb7', 'Bc2', 'Re8', 'Nf1', 'Bf8', 'Ng3', 'g6', 'a4', 'c5'
];

const SICILIAN = [
  'e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6',
  'Be2', 'e5', 'Nb3', 'Be7', 'O-O', 'O-O', 'Be3', 'Be6', 'Qd2', 'Nbd7',
  'a4', 'Rc8', 'a5', 'Qc7'
];

const QUEENS_GAMBIT = [
  'd4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O',
  'Nf3', 'h6', 'Bh4', 'b6', 'Bd3', 'Bb7', 'O-O', 'Nbd7', 'Rc1', 'c5'
];

// Build a structured move list (pairs) from a flat sequence.
const buildMoves = (flat, sliceTo) => {
  const seq = flat.slice(0, sliceTo);
  const pairs = [];
  for (let i = 0; i < seq.length; i += 2) {
    pairs.push({
      number: i / 2 + 1,
      white: seq[i] || null,
      black: seq[i + 1] || null
    });
  }
  return pairs;
};

export const matchHistory = [
  {
    id: 1,
    date: '2026-06-17',
    time: '20:14',
    tournament: 'Summer Blitz Cup',
    league: 'Diamond',
    opponent: 'Magnus_C',
    opponentAvatar: 'https://picsum.photos/seed/user1/60/60.jpg',
    status: 'won',
    totalMoves: 30,
    totalTimeSeconds: 612, // 10m 12s
    moves: buildMoves(RUY_LOPEZ, 30)
  },
  {
    id: 2,
    date: '2026-06-17',
    time: '16:02',
    tournament: 'Summer Blitz Cup',
    league: 'Diamond',
    opponent: 'HikaruN',
    opponentAvatar: 'https://picsum.photos/seed/user2/60/60.jpg',
    status: 'lost',
    totalMoves: 24,
    totalTimeSeconds: 287, // 4m 47s
    moves: buildMoves(SICILIAN, 24)
  },
  {
    id: 3,
    date: '2026-06-16',
    time: '21:45',
    tournament: 'Grand Masters Open',
    league: 'Gold',
    opponent: 'FabianoC',
    opponentAvatar: 'https://picsum.photos/seed/user3/60/60.jpg',
    status: 'draw',
    totalMoves: 20,
    totalTimeSeconds: 1820, // 30m 20s
    moves: buildMoves(QUEENS_GAMBIT, 20)
  },
  {
    id: 4,
    date: '2026-06-15',
    time: '11:30',
    tournament: 'Grand Masters Open',
    league: 'Gold',
    opponent: 'Ding_Liren',
    opponentAvatar: 'https://picsum.photos/seed/user4/60/60.jpg',
    status: 'won',
    totalMoves: 16,
    totalTimeSeconds: 168, // 2m 48s
    moves: buildMoves(RUY_LOPEZ, 16)
  },
  {
    id: 5,
    date: '2026-06-14',
    time: '19:08',
    tournament: 'Weekly Arena',
    league: 'Silver',
    opponent: 'Ian_Nepo',
    opponentAvatar: 'https://picsum.photos/seed/user5/60/60.jpg',
    status: 'won',
    totalMoves: 24,
    totalTimeSeconds: 905, // 15m 5s
    moves: buildMoves(SICILIAN, 24)
  },
  {
    id: 6,
    date: '2026-06-13',
    time: '13:22',
    tournament: 'Weekly Arena',
    league: 'Silver',
    opponent: 'AnishG',
    opponentAvatar: 'https://picsum.photos/seed/user6/60/60.jpg',
    status: 'lost',
    totalMoves: 20,
    totalTimeSeconds: 442, // 7m 22s
    moves: buildMoves(QUEENS_GAMBIT, 20)
  },
  {
    id: 7,
    date: '2026-06-11',
    time: '22:50',
    tournament: 'Night Owl Bullet',
    league: 'Bronze',
    opponent: 'WesleyS',
    opponentAvatar: 'https://picsum.photos/seed/user7/60/60.jpg',
    status: 'won',
    totalMoves: 30,
    totalTimeSeconds: 95, // 1m 35s
    moves: buildMoves(RUY_LOPEZ, 30)
  },
  {
    id: 8,
    date: '2026-06-10',
    time: '09:15',
    tournament: 'Night Owl Bullet',
    league: 'Bronze',
    opponent: 'LevonA',
    opponentAvatar: 'https://picsum.photos/seed/user8/60/60.jpg',
    status: 'draw',
    totalMoves: 24,
    totalTimeSeconds: 233, // 3m 53s
    moves: buildMoves(SICILIAN, 24)
  },
  {
    id: 9,
    date: '2026-06-08',
    time: '18:40',
    tournament: 'Grand Masters Open',
    league: 'Gold',
    opponent: 'Magnus_C',
    opponentAvatar: 'https://picsum.photos/seed/user1/60/60.jpg',
    status: 'lost',
    totalMoves: 20,
    totalTimeSeconds: 2105, // 35m 5s
    moves: buildMoves(QUEENS_GAMBIT, 20)
  },
  {
    id: 10,
    date: '2026-06-05',
    time: '14:27',
    tournament: 'Summer Blitz Cup',
    league: 'Diamond',
    opponent: 'HikaruN',
    opponentAvatar: 'https://picsum.photos/seed/user2/60/60.jpg',
    status: 'won',
    totalMoves: 28,
    totalTimeSeconds: 540, // 9m 0s
    moves: buildMoves(RUY_LOPEZ, 28)
  }
];

// Helpers ------------------------------------------------------------------

export const formatDuration = (totalSeconds) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}m ${s.toString().padStart(2, '0')}s`;
};

export const statusLabel = (status) =>
  status === 'won' ? 'Won' : status === 'lost' ? 'Lost' : 'Draw';

// Distinct values for building filter dropdowns.
export const distinctTournaments = [
  ...new Set(matchHistory.map((m) => m.tournament))
];
export const distinctLeagues = [...new Set(matchHistory.map((m) => m.league))];

// Buckets for the "total time spent" filter.
export const timeBuckets = [
  { id: 'all', label: 'Any duration', test: () => true },
  { id: 'lt5', label: 'Under 5 min', test: (s) => s < 300 },
  { id: '5to15', label: '5 – 15 min', test: (s) => s >= 300 && s < 900 },
  { id: '15to30', label: '15 – 30 min', test: (s) => s >= 900 && s < 1800 },
  { id: 'gt30', label: 'Over 30 min', test: (s) => s >= 1800 }
];
