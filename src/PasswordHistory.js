import React from 'react';

function PasswordHistory({ passwordHistory }) {
  return (
    <div>
      <h2>Password History</h2>
      {passwordHistory.map((prevPassword, index) => (
        <div key={index}>
          {prevPassword}
        </div>
      ))}
    </div>
  );
}

export default PasswordHistory;
