import React from 'react';
// import './EmailVerifiedPage.css'; // Link to the CSS file

const EmailVerifiedPage = ({ navigateTo }) => {
  return (
    <div className="verify-container">
      <div className="verify-card">
        <h1 className="verify-title">🎉 Email Verified!</h1>
        <p className="verify-message">Your email has been successfully verified. You can now login.</p>
        <button
          className="verify-button"
          onClick={() => navigateTo("login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default EmailVerifiedPage;
