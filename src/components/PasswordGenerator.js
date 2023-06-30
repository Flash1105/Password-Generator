import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-={}[]|:;<>,.?/~';

    let validChars = '';
    if (includeUppercase) {
      validChars += uppercaseChars;
    }
    if (includeLowercase) {
      validChars += lowercaseChars;
    }
    if (includeNumbers) {
      validChars += numberChars;
    }
    if (includeSymbols) {
      validChars += symbolChars;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  return (
    <div>
      <h2>Password Generator</h2>
      <div>
        <label>Password Length:</label>
        <input
          type="number"
          value={length}
          min="1"
          max="20"
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Include Uppercase:</label>
        <input
          type="checkbox"
          checked={includeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
        />
      </div>
      <div>
        <label>Include Lowercase:</label>
        <input
          type="checkbox"
          checked={includeLowercase}
          onChange={(e) => setIncludeLowercase(e.target.checked)}
        />
      </div>
      <div>
        <label>Include Numbers:</label>
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
        />
      </div>
      <div>
        <label>Include Symbols:</label>
        <input
          type="checkbox"
          checked={includeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}
        />
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      <div>
        <label>Generated Password:</label>
        <input type="text" value={password} readOnly />
      </div>
    </div>
  );
};

export default PasswordGenerator;
