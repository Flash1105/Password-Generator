import './App.css';
import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PasswordHistory from './PasswordHistory';

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

  const handleGeneratePassword = (notes) => {
    const generatedPassword = generateRandomPassword(numCharacters);
    const entry = { password: generatedPassword, notes: notes };
    setPassword(generatedPassword);
    setPasswordHistory([...passwordHistory, entry]);
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
            <li>
                <link to="/word-password">Word Password Generator</link>
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
                checkPasswordStrength={checkPasswordStrength}
                copyToClipboard={copyToClipboard}
              />
            }
          />
          <Route
            path="/history"
            element={<PasswordHistory passwordHistory={passwordHistory} />}
          />
          <Route path="/word-password" element={<WordPasswordGenerator />} />
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
  checkPasswordStrength,
  copyToClipboard
}) {
  const [notes, setNotes] = useState('');

  const handleCopyPassword = () => {
    copyToClipboard(password);
  };

  const handleGeneratePasswordWithNotes = () => {
    handleGeneratePassword(notes);
    setNotes('');
  };

  return (
    <div>
      <label htmlFor="numCharactersInput">Number of Characters:</label>
      <input
        id="numCharactersInput"
        type="number"
        value={numCharacters}
        onChange={(e) => setNumCharacters(parseInt(e.target.value))}
      />

      <button onClick={handleGeneratePasswordWithNotes}>Generate Password</button>
      <div>
        <h2>Generated Password: {password}</h2>
        <button onClick={handleCopyPassword}>Copy</button>
        <div className="password-strength">
          Password Strength: {checkPasswordStrength(password)}
        </div>
      </div>

      <label htmlFor="notesInput">Notes:</label>
      <input
        id="notesInput"
        type="text"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
}

export default App;
