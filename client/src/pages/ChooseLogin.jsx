import React, { useState } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
const ChooseLogin = () => {
    const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true);

  const userModal = () => {
    navigate('/login')
    setIsOpen(false);
  };
  const leaderModal = () => {
    navigate('/llogin')
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={leaderModal}
      ></div>

      {/* Modal box */}
      <div className="relative bg-white p-10 rounded-lg shadow-lg w-full max-w-lg text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <AiFillInfoCircle className="w-16 h-16 text-blue-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">
            EReligion
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          Do you want to login as a user or minister of God
        </p>

        {/* Policy button */}
        <div>
        <button
          className="px-6 py-2 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all "
          onClick={userModal}
        >
          User
        </button>
    
  
        <button
          className="px-6 py-2 bg-indigo-800 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all"
          onClick={leaderModal}
        >
          Minister
        </button>

        </div>
    
      </div>
    </div>
  );
};

export default ChooseLogin;
