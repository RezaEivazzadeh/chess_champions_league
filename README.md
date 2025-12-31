

# Chess Champions League
Compete, Conquer, Crown the Champion.

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📖 About
Chess Champions League is a modern, online 3D chess application that brings the timeless game of chess to life in the digital age. Our vision is to create a premier online chess destination that combines cutting-edge technology with the strategic depth of chess. Players from around the world can compete against each other in real-time on our immersive 3D board, challenge our sophisticated AI opponent, and participate in periodic league competitions to prove their mastery. With a focus on community, competition, and a stunning visual experience, Chess Champions League aims to be the ultimate platform for chess enthusiasts of all skill levels.

## ✨ Key Features
- **Real-time Multiplayer**: Play against other users online in real-time.
- **AI Opponent**: Challenge a sophisticated chess engine (AI) to practice and improve your skills.
- **3D Game Board**: An immersive and interactive 3D chessboard rendered in the browser.
- **User Profiles**: Each user has a unique username, a points-based rating (ELO or similar), and a profile.
- **Game History**: A searchable and filterable history of all past games, with the ability to review moves.
- **League Competitions**: Periodic, time-limited competitions where players compete for the top spot on a leaderboard.
- **Matchmaking System**: A system to pair players of similar skill levels.

## 🛠️ Tech Stack
### Frontend
- React.js
- Three.js
- Material-UI

### Backend
- Golang
- Gin Web Framework
- JWT Authentication

### Database
- PostgreSQL

### Real-time
- WebSockets (Gorilla WebSocket)

## 🚀 Getting Started

### Prerequisites
- Go 1.21+
- Node.js 18+
- PostgreSQL 13+

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/RezaEivazzadeh/chess_champions_league.git
   cd chess-champions-league
   ```

2. Set up the backend:
   ```bash
   cd backend
   go mod download
   ```

3. Set up the database:
   - Create a PostgreSQL database named `ccl_db`
   - Run the migration scripts in `backend/migrations`

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret
   ```

5. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application
1. Start the backend server (in one terminal):
   ```bash
   cd backend
   go run main.go
   ```

2. Start the frontend development server (in another terminal):
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.


## 🙏 Acknowledgements
- [Three.js](https://threejs.org/) for the 3D graphics library
- [Gin](https://gin-gonic.com/) for the Go web framework
- [Gorilla WebSocket](https://github.com/gorilla/websocket) for the WebSocket implementation
- [Material-UI](https://mui.com/) for the React UI components
- [Stockfish](https://stockfishchess.org/) for the chess engine inspiration
