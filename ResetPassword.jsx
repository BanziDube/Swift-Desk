import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Replace useHistory with useNavigate
import './resetPassword.css'; 

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;

    if (id === 'new-password') {
      setNewPassword(value);
    } else if (id === 'confirm-password') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Additional validation for password length or strength can be added here

    // Simulate password reset success
    setError('');
    setSuccess(true);

    // Navigate to login page after successful password reset
    setTimeout(() => {
      navigate('/login'); // Redirect to login page
    }, 2000);  // You can adjust the delay as needed

    // Here you would usually send the password to the backend to update it.
    console.log('Password reset successful');
  };

  return (
    <div className="reset-password">
      <h1 className="reset-title">Reset Your Password</h1>

      {success ? (
        <div className="success-message">
          <p>Password reset successful! You can now log in with your new password.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="reset-form">
          <div className="reset-input">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={handlePasswordChange}
              required
              placeholder="Enter your new password"
            />
          </div>

          <div className="reset-input">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handlePasswordChange}
              required
              placeholder="Confirm your new password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="reset-button">Reset Password</button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
