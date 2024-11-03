import React, { useState } from 'react';
import '../LoginPopup/LoginPopup.css';
import { assets } from '../../src/assets/assets.js';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  axios.defaults.withCredentials = true
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = { email, password };
    if (currState === 'Sign Up') {
      bodyData.name = name;
    }

    try {
      const endpoint = currState === 'Sign Up'
        ? 'http://localhost:4000/api/user/signUp'
        : 'http://localhost:4000/api/user/signIn';

      const response = await axios.post(endpoint, bodyData, { withCredentials: true });
      console.log(response.data);

      setName('');
      setEmail('');
      setPassword('');
      setShowLogin(false);

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Sign Up' && (
            <input
              type="text"
              placeholder='Your Name'
              required
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder='Your Email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Your Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        <div className='login-popup-condition'>
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
