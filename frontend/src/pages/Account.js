import React, { useState } from 'react';
import '../css/Account.css';

const Account = () => {
  const [isRegister, setIsRegister] = useState(false);  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isRegister && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (isRegister) {
      console.log('Registering:', { email, password });
      
    } else {
      console.log('Signing in:', { email, password });
      
    }
  };

  return (
    <div className="account-container">
      <h2>{isRegister ? 'Create Account' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isRegister && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="submit-btn">
          {isRegister ? 'Register' : 'Sign In'}
        </button>
      </form>
      <p onClick={() => setIsRegister(!isRegister)} className="toggle-link">
        {isRegister ? 'Already have an account? Sign In' : 'New user? Create an account'}
      </p>
    </div>
  );
};

export default Account;
