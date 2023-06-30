import React from 'react';

function PasswordHistory({ passwordHistory, copyToClipboard }) {
  const handleCopyToClipboard = async (password) => {
    try {
      await navigator.clipboard.writeText(password);
      console.log('Password copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy password to clipboard:', error);
    }
  };

  return (
    <div>
      <h2>Password History</h2>
      {passwordHistory.map((prevPassword, index) => (
        <div key={index}>
          {prevPassword}
          <button onClick={() => handleCopyToClipboard(prevPassword)}>Copy</button>
        </div>
      ))}
    </div>
  );
}

export default PasswordHistory;
