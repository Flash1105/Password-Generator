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
      {passwordHistory.map((entry, index) => (
        <div key={index}>
          <div>
            {entry.password}
            <button onClick={() => handleCopyToClipboard(entry.password)}>Copy</button>
          </div>
          <div>Notes: {entry.notes}</div>
        </div>
      ))}
    </div>
  );
}

export default PasswordHistory;
