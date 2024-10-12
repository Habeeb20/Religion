// components/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success,setSuccess] = useState('')
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/forgot-password`, { email });
      toast.success("Password reset email sent");
      setSuccess("email has been sent sucessfully")
        navigate('/reset-password/:token')
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
      setError("failed")
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        {success && <p className='text-green-600 text-center'>{success}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded mt-4 hover:bg-indigo-600">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
