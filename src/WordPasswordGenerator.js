import React, { useState } from 'react';
import './WordPasswordGenerator.css';

const WordPasswordGenerator = ({ setPasswordHistory, passwordHistory }) => {
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');

  const generateWordPassword = () => {
    const wordList1 = ['red', 'blue', 'orange', 'green', 'yellow', 'purple', 'pink', 'brown', 'black', 'white', 'gray', 'teal', 'cyan', 'magenta', 'navy', 'turquoise', 'lavender', 'maroon', 'olive', 'salmon', 'gold', 'silver', 'indigo', 'coral', 'plum'];
    const wordList2 = ['elephant', 'zebra', 'tiger', 'lion', 'giraffe', 'penguin', 'koala', 'kangaroo', 'hippopotamus', 'crocodile', 'cheetah', 'rhinoceros', 'gorilla', 'panda', 'lemur', 'jaguar', 'seagull', 'dolphin', 'squirrel', 'camel', 'flamingo', 'octopus', 'parrot', 'ostrich', 'turtle'];
    const numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    const word1 = getRandomWord(wordList1);
    const word2 = getRandomWord(wordList2);
    const randomNumber = getRandomNumber(numberList);

    const generatedPassword = `${word1}-${word2}${randomNumber}`;

    setPassword(generatedPassword);
    setPasswordHistory(prevHistory => [...prevHistory, { password: generatedPassword, notes }]);
  };

  const getRandomWord = (wordList) => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const getRandomNumber = (numberList) => {
    const randomIndex = Math.floor(Math.random() * numberList.length);
    return numberList[randomIndex];
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        alert('Password copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy password:', error);
      });
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div>
      <h1>Generated Password:</h1>
      <p>{password}</p>
      <button onClick={handleCopyClick}>Copy Password</button>
      <button onClick={generateWordPassword}>Generate New Password</button>
      <p>Note: Please enter any notes or context for this password before generating a new one.</p>
      <div>
        <label>Notes:</label>
        <input type="text" value={notes} onChange={handleNotesChange} />
      </div>
    </div>
  );
};

export default WordPasswordGenerator;
