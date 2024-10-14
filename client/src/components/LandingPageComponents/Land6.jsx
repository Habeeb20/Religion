import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importing axios
import im from '../../assets/religion/Container (1).png'; // Default image if required
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Land6 = () => {
  const [ministers, setMinisters] = useState([]);

  // Fetch minister data from API using Axios
  useEffect(() => {
    const fetchMinisters = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL2}/getallleaders`);
        setMinisters(response.data);
      } catch (error) {
        console.error('Error fetching ministers:', error);
      }
    };

    fetchMinisters();
  }, []);

  const MinisterCard = ({ minister }) => {
    const { title, firstname, lastname, bio, religion, ministryname,phonenum, email, profilePicture, yearsInProfession,state,localGovtArea, address } = minister;

    const userEmail = "user@example.com"; // Replace this with the actual user's email

    return (
      <div className="border rounded-md p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        <div className="flex items-center mb-4">
            
          <img
            src={profilePicture}
            alt={`${firstname} ${lastname}`}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
          <div className="absolute top-2 right-2 bg-[#E5E6E9] text-gray-600 text-xs px-2 py-1 rounded-full">
                    20mins response time
                  </div>
            <h2 className="text-xl font-bold text-gray-800">{`${title} ${firstname} ${lastname}`}</h2>
            <p className="text-gray-500">{ministryname}</p>
          
          </div>
        </div>
        <p className="text-black-700 mb-2">bio: {bio}</p>
        <p className="text-black-700 mb-2">phone num: {phonenum}</p>
        <p className="text-black-500 mb-2">years of being a/an {title}: {yearsInProfession}  years</p>
        <p className="text-black-500 mb-2">state: {state}</p>
        <p className="text-black-500 mb-2">LGA: {localGovtArea}</p>
        <p className="text-black-500 mb-2">Address: {address}</p>
        <p className="text-black-500 mb-2">religion: {religion}</p>
    
        <span className="flex items-center mb-4">
          <FaEnvelope className="text-gray-600 mr-2" />
          <a href={`mailto:${email}?cc=${userEmail}`} className="text-blue-500 hover:underline">
            {email}
          </a>
        </span>
        <Link to='/userlogin'><button>View More</button></Link>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          QUICKLY CONNECT
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Connect with Servants of God on a click
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Related around you</h2>
        <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
          <span className="bg-red-500 w-4 h-4 rounded-full inline-block mr-2"></span>
          {/* <span className="text-gray-700">Lagos</span> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {ministers.map((minister, index) => (
          <MinisterCard key={index} minister={minister} />
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Churches around you</h2>
      </div>
      {/* Add more content if needed */}
    </div>
  );
};

export default Land6;
