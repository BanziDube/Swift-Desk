import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      alert('Please fill in all required fields.');
      return;
    }

    // Simulate a login action (add your authentication logic here)
    alert('Login successful!');
    
    // After successful login, navigate to the EmployeeQueryPage
    navigate('/employee-query');  // Replace with the actual route for EmployeeQueryPage
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form" id="login-form">
        <h1 className="login__title">Login</h1>
        <div className="login__content">
          <div className="login__row">
            <div className="login__box">
              <i className="bx bx-user"></i>
              <div className="login__box-input">
                <input
                  type="text"
                  required
                  className="login__input"
                  id="username"
                  placeholder=""
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="login__label">Username</label>
              </div>
            </div>
          </div>
          <div className="login__row">
            <div className="login__box">
              <i className="bx bx-lock"></i>
              <div className="login__box-input">
                <input
                  type="password"
                  required
                  className="login__input"
                  id="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="login__label">Password</label>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="login__button">
          Login
        </button>
        <p className="login__register">
          Forgot your password? <a href="/forgot-password">Reset here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
