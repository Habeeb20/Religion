import React, { useEffect, useState } from 'react';
import sc from '../../assets/religion/sc.png';
import sc1 from '../../assets/religion/sc1.png';
import sc3 from '../../assets/religion/sc3.png';
import { FaEnvelope } from 'react-icons/fa';

const Land4 = () => {
  const [ministers, setMinisters] = useState([]);

  // Fetch minister data from API
  useEffect(() => {
    const fetchMinisters = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL2}/getallleaders`);
        const data = await response.json();
        setMinisters(data);
      } catch (error) {
        console.error('Error fetching ministers:', error);
      }
    };

    fetchMinisters();
  }, []);

  return (
    <div className="bg-indigo-900 text-white min-h-screen flex items-center justify-center px-6 py-12 mt-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-2xl font-bold text-white leading-tight mb-4">
            Serve God Anywhere in the world <br /> and avoid <span className="text-white">SCAMMERS</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God.            Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God.
          </p>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-400">
            Report a scam
          </button>
        </div>
        {/* Image Container */}
        <div className="flex flex-col items-center">
          <img src={sc} alt="Image 1" className="w-32 h-auto mb-2 md:w-60" />
          <div className="flex justify-center w-full">
            <img src={sc1} alt="Image 2" className="w-32 h-auto md:w-40 mx-2 " />
            <img src={sc3} alt="Image 3" className="w-32 h-auto md:w-40 mx-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Land4;
