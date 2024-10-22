import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.js.css';

const RegisterForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTabSwitch = (isRegister) => {
    setIsRegister(isRegister);
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`http://localhost:8000/api/auth/${isRegister ? 'register' : 'login'}`, {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data) {
        if (isRegister) {
          setSuccess('Registration successful! Please check your email for confirmation.');
        } else {
          setSuccess('Login successful! Redirecting...');
          // Redirect to the dashboard or other page
        }
      }
    } catch (err) {
      setError(err.response.data.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <div className="branding">
        <img src="logo.png" alt="Company Logo" className="logo" />
        <h1>{isRegister ? 'Create an Account' : 'Login'}</h1>
      </div>
      <div className="form-section">
        <div className="navigation-tabs">
          <button onClick={() => handleTabSwitch(true)} className={isRegister ? 'active' : ''}>Register</button>
          <button onClick={() => handleTabSwitch(false)} className={!isRegister ? 'active' : ''}>Login</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">{isRegister ? 'Email' : 'Registered Email'}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="primary-action-button">
            {isRegister ? 'Register' : 'Login'}
          </button>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="additional-links">
            <a href="/forgot-password">Forgot Password</a>
            <a href="/terms">Terms & Conditions</a>
          </div>
        </form>
      </div>
      <footer>
        <p>&copy; 2023 Company Name. All rights reserved.</p>
        <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default RegisterForm;
