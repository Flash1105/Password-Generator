import wordList from 'word-list';

export const generateRandomPassword = (numCharacters) => {
  
};

export const generateWordBasedPassword = () => {
  const words = wordList.split('\n');
  const randomIndex1 = Math.floor(Math.random() * words.length);
  const randomIndex2 = Math.floor(Math.random() * words.length);
  const word1 = words[randomIndex1];
  const word2 = words[randomIndex2];
  return `${word1}-${word2}`;
};
