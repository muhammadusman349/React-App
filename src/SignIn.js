// src/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import accountApi from './accountApi';
import './styles/styles.css'; // Import CSS file directly

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await accountApi.post('signin/', formData);
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token); // Save access token

      navigate('/movies'); // Navigate to movies page
    } catch (error) {
      console.error('Sign-in error:', error.response.data);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password:</label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="form-button" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
