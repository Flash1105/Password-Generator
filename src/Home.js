//functional component//
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
  
        
      </div>
    );
  }
  
  export default Home;