import React, { useState } from 'react';

function App() {
  const [numCharacters, setNumCharacters] = useState(8); // Initial value is 8
  const initialString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const [password, setPassword] = useState('');

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
      <div>Password: {password}</div>
    </div>
  );
}

export default App;
