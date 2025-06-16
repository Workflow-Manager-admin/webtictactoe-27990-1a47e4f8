import React, { useState } from 'react';
import './App.css';

/* Theme colors based on task requirements */
const COLORS = {
  primary: '#4CAF50',
  secondary: '#FFC107',
  accent: '#2196F3',
  lightBg: '#f9f9f9', // for a light theme background
  darkText: '#222',
};

/** Square component - represents each cell in the Tic Tac Toe board */
function Square({ value, onClick, isWinning }) {
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      style={{
        background: isWinning ? COLORS.accent : COLORS.lightBg,
        color: isWinning ? 'white' : COLORS.darkText,
        border: `2px solid ${COLORS.primary}`,
        fontWeight: 'bold',
        fontSize: '2.5rem',
        height: 70,
        width: 70,
        cursor: value || !onClick ? 'default' : 'pointer',
        transition: 'background 0.2s',
        outline: 'none',
        borderRadius: 8,
        margin: 0
      }}
      disabled={!!value}
    >
      {value}
    </button>
  );
}

/** PUBLIC_INTERFACE
 * Main WebTicTacToe App Component.
 * Board, Player Turn Indicator, and Reset Button.
 */
function App() {
  // State for board: 9 elements (string: 'X', 'O', or null)
  const [board, setBoard] = useState(Array(9).fill(null));
  // State for player turn: true for X (player 1), false for O (player 2)
  const [isX, setIsX] = useState(true);

  // Get winner info
  const winnerInfo = calculateWinner(board);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  // Handle Cell Clicks
  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || winner) return;
    const nextBoard = board.slice();
    nextBoard[idx] = isX ? 'X' : 'O';
    setBoard(nextBoard);
    setIsX(!isX);
  }

  // Reset board to initial state
  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsX(true);
  }

  // Game status (turn or winner)
  let status;
  if (winner) {
    status = (
      <span>
        Winner: <span style={{ color: winner==='X' ? COLORS.primary : COLORS.secondary, fontWeight: 600 }}>{winner}</span>
      </span>
    );
  } else if (board.every(Boolean)) {
    status = (
      <span>
        <span style={{ color: COLORS.accent, fontWeight: 600 }}>Draw! No winner.</span>
      </span>
    );
  } else {
    status = (
      <span>
        Turn: <span style={{ color: isX ? COLORS.primary : COLORS.secondary, fontWeight: 600 }}>{isX ? 'X' : 'O'}</span>
      </span>
    );
  }

  return (
    <div className="app" style={{
      background: COLORS.lightBg,
      minHeight: "100vh"
    }}>
      <nav className="navbar" style={{background: COLORS.primary, color: '#fff'}}>
        <div className="container" style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
          <div className="logo" style={{fontWeight:'700', fontSize:'1.3rem', letterSpacing:'1px'}}>
            <span className="logo-symbol" style={{color: COLORS.accent, fontWeight: 900, marginRight:4}}>◼</span> WebTicTacToe
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main>
        <div className="container" style={{paddingTop: 120, display:'flex', flexDirection:'column', alignItems:'center', minHeight:'80vh'}}>
          <h1 className="title" style={{marginBottom:16, color: COLORS.primary, letterSpacing:'2px'}}>Tic Tac Toe</h1>
          
          {/* Player Turn Indicator */}
          <div className="ttt-status" style={{
            fontSize:'1.35rem',
            marginBottom: 18,
            color: '#222',
            minHeight:32
          }}>
            {status}
          </div>

          {/* Game Board */}
          <div className="ttt-board" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 70px)',
            gridTemplateRows: 'repeat(3, 70px)',
            gap: 8,
            marginBottom: 28,
            background: '#fff',
            padding: 18,
            borderRadius: 14,
            boxShadow: '0 6px 16px rgba(60,80,120,0.12)'
          }}>
            {board.map((value, idx) => (
              <Square
                key={idx}
                value={value}
                onClick={() => handleSquareClick(idx)}
                isWinning={winningLine.includes(idx)}
              />
            ))}
          </div>

          {/* Reset Button */}
          <button
            className="btn btn-large"
            onClick={handleReset}
            style={{
              background: COLORS.secondary,
              color: COLORS.darkText,
              border: 'none',
              borderRadius: 5,
              fontWeight: 700,
              padding: '12px 32px',
              fontSize: '1.13rem',
              cursor: 'pointer',
              letterSpacing: '1px',
              transition: 'background 0.2s'
            }}
          >
            Reset Game
          </button>
        </div>
      </main>
    </div>
  );
}

/** PUBLIC_INTERFACE
 * Returns winner info if there is a winner in the current board.
 * @param {array} squares - 9-element array of X, O, or null
 * @returns {object|null} - {winner: 'X'|'O', line:[...]} | null
 */
function calculateWinner(squares) {
  // lines is the list of all winning triplets (row/col/diagonal)
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for (let i=0; i<lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a,b,c]};
    }
  }
  return null;
}

export default App;
