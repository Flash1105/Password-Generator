import React, { useState, useEffect } from 'react';
import { randomWord } from 'random-words';

const WordPasswordGenerator = () => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    const generateWordPassword = async () => {
      const word1 = await randomWord();
      const word2 = await randomWord();
      const password = `${word1}-${word2}`;
      setPassword(password);
    };

    generateWordPassword();
  }, []);

  return (
    <div>
      <h1>Generated Password:</h1>
      <p>{password}</p>
    </div>
  );
};

export default WordPasswordGenerator;
