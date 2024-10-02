import React from 'react';
import { useNavigate } from 'react-router-dom';

function Policy() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/lsignup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
          Policy Agreement
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Please read the policy and terms of agreement for becoming a minister.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Name:
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Date:
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              required
            />
            <label className="ml-2 block text-gray-700 text-sm">
              I agree to the terms and conditions.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Policy;
