import './App.css';
import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PasswordHistory from './PasswordHistory';
import WordPasswordGenerator from './WordPasswordGenerator';

function App() {
  const [numCharacters, setNumCharacters] = useState(8);
  const [password, setPassword] = useState('');
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchPasswordHistory();
  }, []);

  const fetchPasswordHistory = async () => {
    try {
      const response = await fetch('http://localhost:3001/passwords');
      const data = await response.json();
      setPasswordHistory(data);
    } catch (error) {
      console.error('Failed to fetch password history:', error);
    }
  };

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
    const entry = { password: generatedPassword, notes: notes };
    setPassword(generatedPassword);
    setNotes('');
    savePassword(entry);
  };

  const savePassword = async (entry) => {
    try {
      const generatedEntry = { password: entry.password, notes: entry.notes };
      const response = await fetch('http://localhost:3001/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatedEntry),
      });
      if (response.ok) {
        fetchPasswordHistory();
        console.log('Password saved successfully!');
      } else {
        console.error('Failed to save password.');
      }
    } catch (error) {
      console.error('Failed to save password:', error);
    }
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

  const handleCopyPassword = () => {
    copyToClipboard(password);
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
              <Link to="/word-password">Word Password Generator</Link>
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
                notes={notes}
                setNotes={setNotes}
                savePassword={savePassword} 
              />
            }
          />
          <Route
            path="/history"
            element={<PasswordHistory passwordHistory={passwordHistory} />}
          />
          <Route
            path="/word-password"
            element={
              <WordPasswordGenerator
                setPasswordHistory={setPasswordHistory}
                passwordHistory={passwordHistory}
                savePassword={savePassword} 
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
  checkPasswordStrength,
  copyToClipboard,
  notes,
  setNotes,
  savePassword, 
}) {
  const handleCopyPassword = () => {
    copyToClipboard(password);
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

      <button onClick={handleGeneratePassword}>Generate Password</button>

      <div>
        <h2>Generated Password: {password}</h2>
        <button onClick={handleCopyPassword}>Copy</button>
        <div className="password-strength">
          Password Strength: {checkPasswordStrength(password)}
        </div>
      </div>

      <label htmlFor="notesInput">Notes for Password:</label>
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
