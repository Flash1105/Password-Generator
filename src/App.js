import React, { useState } from 'react';

function App() {
  const [numCharacters, setNumCharacters] = useState(8); // Initial value is 8

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

      
    </div>
  );
}

export default App;
