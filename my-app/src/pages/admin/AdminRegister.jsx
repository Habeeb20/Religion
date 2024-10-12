import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [admin, setAdmin] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (admin.password !== admin.confirmPassword) {
    //   return setError("Passwords don't match");
    // }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL5}/register`, admin);
      navigate('/adminlogin'); // Navigate to login page after registration
    } catch (err) {
      setError('Registration failed. Try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-extrabold text-gray-700">Admin Registration</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            value={admin.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-600"
            required
          />
          <input
            type="text"
            name="lastname"
            value={admin.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-600"
            required
          />
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-600"
            required
          />
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-600"
            required
          />
          {/* <input
            type="password"
            name="confirmPassword"
            value={admin.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-600"
            required
          /> */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
