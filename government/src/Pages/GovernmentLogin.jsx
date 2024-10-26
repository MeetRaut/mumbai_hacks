import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const InstituteLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage(''); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/government/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const token = response.data.token;
      console.log('Token:', token);
      alert('Login successful!');
      localStorage.setItem('token', token);

      // Clear form data
      setFormData({
        email: '',
        password: '',
      });

      // Navigate to the home page
      navigate('/'); // Navigate to home page

    } catch (error) {
      // Enhanced error handling
      const message = error.response?.data?.message || 'An error occurred. Please try again.';
      setErrorMessage(message); // Set the error message state
      console.error('Login error:', message); // Log error for debugging
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Government Login</h2>
        {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>} {/* Error message display */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              required // Make input required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
              required // Make input required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?
          <Link to="/Institute/InstituteSignUp" className="text-orange-600 hover:underline ml-1">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default InstituteLogin;
