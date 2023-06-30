import './App.css';
import React, { useState } from 'react';


function App() {
  const [numCharacters, setNumCharacters] = useState(8);
  const [password, setPassword] = useState('');
  const [passwordHistory, setPasswordHistory] = useState([]);

  const generateRandomPassword = (numCharacters) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

  return (
    <div>
      <h1>Password Generator</h1>

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
          <div key={index}>{prevPassword}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
