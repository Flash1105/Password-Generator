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
      {passwordHistory.length > 0 ? (
        passwordHistory.map((entry, index) => (
          <div key={index}>
            <div>
              Password: {String(entry.password)}
              <button onClick={() => handleCopyToClipboard(String(entry.password))}>Copy</button>
            </div>
            <div>Notes: {String(entry.notes)}</div>
          </div>
        ))
      ) : (
        <div>No password history available.</div>
      )}
    </div>
  );
}

export default PasswordHistory;
