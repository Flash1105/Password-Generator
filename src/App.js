import './App.css';
import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PasswordHistory from'./passwordHistory';

function App() {
  const [numCharacters, setNumCharacters] = useState(8);
  const [password, setPassword] = useState('');
  const [passwordHistory, setPasswordHistory] = useState([]);

  const generateRandomPassword = (numCharacters) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!$?";
    let password = "";

    for (let i = 0; i < numCharacters; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  };

  const handleGeneratePassword = () => {
    const generatedPassword = generateRandomPassword(numCharacters);
    setPassword(generatedPassword);
    setPasswordHistory([...passwordHistory, generatedPassword]);
  };

  const checkPasswordStrength = (password) => {
    const passwordStrength = zxcvbn(password);
    const lengthFactor = Math.min(password.length / 10, 1);
    return passwordStrength.score * lengthFactor;
  };

  const copyToClipboard = async (password) => {
    try {
      await navigator.clipboard.writeText(password);
      console.log('Password copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy password to clipboard:', error);
    }
  };

  return (
    <Router>
      <div>
        <h1>Password Generator</h1>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/history">Password History</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                numCharacters={numCharacters}
                setNumCharacters={setNumCharacters}
                handleGeneratePassword={handleGeneratePassword}
                password={password}
                setPassword={setPassword}
                setPasswordHistory={setPasswordHistory}
                passwordHistory={passwordHistory}
                checkPasswordStrength={checkPasswordStrength}
                copyToClipboard={copyToClipboard}
              />
            }
          />
          <Route
            path="/history"
            element={
              <History
                passwordHistory={passwordHistory}
                copyToClipboard={copyToClipboard}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function Home({
  numCharacters,
  setNumCharacters,
  handleGeneratePassword,
  password,
  setPassword,
  setPasswordHistory,
  passwordHistory,
  checkPasswordStrength,
  copyToClipboard
}) {
  return (
    <div>
      <label htmlFor="numCharactersInput">Number of Characters:</label>
      <input
        id="numCharactersInput"
        type="number"
        value={numCharacters}
        onChange={(e) => setNumCharacters(parseInt(e.target.value))}
      />

      <button onClick={handleGeneratePassword}>Generate Password</button>
      <div>
        <h2>Generated Password: {password}</h2>
        <h2>Previous Passwords</h2>
        {passwordHistory.map((prevPassword, index) => (
          <div key={index}>
            {prevPassword}
            <button onClick={() => copyToClipboard(prevPassword)}>Copy</button>
          </div>
        ))}

        <div className="password-strength">Password Strength: {checkPasswordStrength(password)}</div>
      </div>
    </div>
  );
}

function PasswordHistory({ passwordHistory }) {
    return (
        <div>
            <h2>Password History</h2>
            {passwordHistory.map((prevPassword, index) => (
          <div key={index}>{prevPassword}</div>  
        ))}
        </div>
    );
}
export default App;
