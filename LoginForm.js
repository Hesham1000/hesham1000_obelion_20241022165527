import React, { useState } from 'react';
import axios from 'axios';
import './3. LoginForm.js.css';

function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTabClick = (isRegister) => {
    setIsRegistering(isRegister);
    setError('');
    setSuccess('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isRegistering ? '/api/auth/register' : '/api/auth/login';
    try {
      const response = await axios.post(apiUrl, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (isRegistering) {
        setSuccess('Registration successful. Please log in.');
      } else {
        setSuccess('Login successful');
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data.error || 'Error processing request');
    }
  };

  return (
    <div className="login-form">
      <div className="branding-section">
        <img src="logo.png" alt="Company Logo" />
        <h1>{isRegistering ? 'Create an Account' : 'Login'}</h1>
      </div>
      <div className="form-section">
        <div className="nav-tabs">
          <button onClick={() => handleTabClick(true)} className={isRegistering ? 'active' : ''}>
            Register
          </button>
          <button onClick={() => handleTabClick(false)} className={!isRegistering ? 'active' : ''}>
            Login
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">{isRegistering ? 'Email' : 'Registered Email'}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="primary-action-button">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <div className="additional-links">
          <a href="/forgot-password">Forgot Password</a>
          <a href="/terms-and-conditions">Terms & Conditions</a>
        </div>
      </div>
      <footer>
        <p>© 2023 Company Name. All rights reserved.</p>
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default LoginForm;
