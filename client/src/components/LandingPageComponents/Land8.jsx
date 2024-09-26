import React, { useState } from 'react';
import m from '../../assets/religion/thinking.png'
const Land8 = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleRequest = () => {
    alert('Request submitted for further research!');
    // Add actual request handling logic here
  };

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col md:flex-row justify-between items-center p-8">
      {/* Text Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
          Can’t find your religion
          <br />
          Book a request
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We have a bogus database of religious gathering, but we know we might
          not be able to gather everything, how about helping us solve that
          issue and we would carry out our research.
        </p>
        <button
          onClick={handleRequest}
          className="bg-indigo-900 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition"
        >
          Make a Request
        </button>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
        <img
          src={m} // Replace with the correct image path
          alt="Thinking man"
          className="w-68 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Land8;
