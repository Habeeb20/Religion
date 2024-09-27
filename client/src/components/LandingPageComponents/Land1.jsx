import React, { useState, useEffect } from 'react';
import im1 from '../../assets/religion/Rectangle 1.png';
import im2 from '../../assets/religion/Rectangle 2.png';
import { useNavigate, Link } from 'react-router-dom';

const Land1 = () => {
  const [religion, setReligion] = useState('');
  const [state, setState] = useState('');
  const [localGovtArea, setLocalGovtArea] = useState('');
  const [userLocation, setUserLocation] = useState(''); // User's location input
  const [ministers, setMinisters] = useState([]);
  const [leadersInLga, setLeadersInLga] = useState([]);
  const [googleMapsLink, setGoogleMapsLink] = useState(''); // Google Maps link

  const navigate = useNavigate();

  // Fetch ministers data from API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL2}/getallleaders`)
      .then((res) => res.json())
      .then((data) => {
        setMinisters(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleClick = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL2}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
         
        },
      });
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Handle search and filter ministers based on religion, state, and local government area
  const handleSearch = () => {
    const filteredByLga = ministers.filter(
      (minister) =>
        minister.religion.toLowerCase().includes(religion.toLowerCase()) &&
        minister.state.toLowerCase().includes(state.toLowerCase()) &&
        minister.localGovtArea.toLowerCase().includes(localGovtArea.toLowerCase())
    );

    if (filteredByLga.length === 0) {
      const filteredByState = ministers.filter(
        (minister) =>
          minister.religion.toLowerCase().includes(religion.toLowerCase()) &&
          minister.state.toLowerCase().includes(state.toLowerCase())
      );
      setLeadersInLga(filteredByState);
    } else {
      setLeadersInLga(filteredByLga);
    }

    // Create Google Maps link if user location and localGovtArea are provided
    if (userLocation && localGovtArea) {
      const encodedUserLocation = encodeURIComponent(userLocation);
      const encodedLga = encodeURIComponent(localGovtArea);
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodedUserLocation}&destination=${encodedLga}`;
      setGoogleMapsLink(googleMapsUrl);
    }
  };

  return (
    <div className="bg-[#f5f0e1] min-h-screen">
      <div className="relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-70 bg-[url('/your-image.jpg')]"></div>
        <div className="relative z-10 text-center pt-16 px-4 md:px-16">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1f1f7a]">
            Find, worship and Book with Ministries in Nigeria
          </h1>
          <p className="text-sm md:text-lg mt-4 text-[#1f1f7a]">
            Connect with over 100000 ministers worldwide from the comfort of your home and meet with genuine Men of God
          </p>

          {/* Search Bar with Religion, State, Local Government Area, and User Location Inputs */}
          <div className="flex flex-col md:flex-row justify-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Religion e.g christian, muslim"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              className="p-3 rounded-lg border text-gray-800 border-gray-200 bg-white w-full md:w-auto"
            />
            <input
              type="text"
              placeholder="State e.g Lagos, Abuja"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-3 rounded-lg border text-gray-800 border-gray-200 bg-white w-full md:w-auto"
            />
            <input
              type="text"
              placeholder="Local Govt Area"
              value={localGovtArea}
              onChange={(e) => setLocalGovtArea(e.target.value)}
              className="p-3 rounded-lg border text-gray-800 border-gray-200 bg-white w-full md:w-auto"
            />
            {/* User Location Input */}
            <input
              type="text"
              placeholder="Your Location (e.g. Ikeja)"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              className="p-3 rounded-lg border text-gray-800 border-gray-200 bg-white w-full md:w-auto"
            />
            <button
              onClick={handleSearch}
              className="p-3 bg-indigo-900 text-white rounded-lg w-full md:w-auto"
            >
              Search
            </button>
          </div>

          {/* Images */}
          <div className="flex flex-col md:flex-row justify-center items-center mt-12 space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex justify-center">
              <img
                src={im2}
                alt="Worship Image"
                className="rounded-lg shadow-lg"
                style={{
                  width: '150px',
                  height: 'auto',
                  border: '3px dashed orange',
                }}
              />
            </div>
            <div className="flex justify-center">
              <img
                src={im1}
                alt="Minister Image"
                className="rounded-full shadow-lg"
                style={{
                  width: '150px',
                  height: 'auto',
                  border: '3px dashed yellow',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leaders in Selected LGA */}
      <div className="mt-12 text-center px-4">
        {leadersInLga.length > 0 ? (
          <div>
            <h2 className="text-lg font-semibold mb-4">Religious Leaders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {leadersInLga.map((leader, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg shadow-lg bg-[#f5f0e1] text-left relative"
                  style={{
                    border: '1px solid #e2e2e2',
                    backgroundColor: '#faf5e5',
                  }}
                >
                  {/* Response Time Badge */}
                  <div className="absolute top-2 right-2 bg-[#E5E6E9] text-gray-600 text-xs px-2 py-1 rounded-full">
                    20mins response time
                  </div>
                  <div className="mt-2 text-sm text-blue-500">
      <p>Joined on: {new Date(leader.createdAt).toLocaleDateString()}</p>
    </div>

                  {/* Leader Image */}
                  <div className="flex items-center space-x-4 mb-2">
                    <img
                      src={leader.profilePicture || '/path-to-default-avatar.jpg'}
                      alt={`${leader.firstname} ${leader.lastname}`}
                      className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                      {/* Leader Name */}
                      <h3 className="font-bold text-[#1f1f7a] px-5">
                        {leader.title} {leader.firstname} {leader.lastname}
                      </h3>
                      {/* Ministry Name */}
                      <p className="text-sm text-gray-500 flex items-center space-x-1">
                        <span role="img" aria-label="church">
                          ⛪
                        </span>
                        <span>{leader.ministryName}</span>
                      </p>
                    </div>
                  </div>

                  {/* Leader Bio */}
                  <div className="text-sm text-gray-600 mt-2">
                    <p>{leader.bio}</p>
                  </div>

                  {/* Religion & Location */}
                  <div className="mt-2 text-sm text-gray-700">
                    <p className="flex items-center space-x-1">
                      <span>{leader.religion}</span>
                    </p>
                    <p>
                        category:    {leader.category}
                    </p>
                    <p>
                      {leader.localGovtArea}, {leader.state}
                    </p>
                    <p>
                        unique number:    {leader.uniqueNumber}
                    </p>
                    <p>
                    status: <span className='text-yellow-400'>   {leader.status}</span>
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="mt-2 text-sm">
                    <p>{leader.email}</p>
                    <p>{leader.phone}</p>
                  </div>
                
                  {/* View Profile Button */}
                  <Link
                    to={`/leader/${leader._id}`}
                    className="block mt-4 text-center text-indigo-900 bg-white border border-indigo-900 hover:bg-indigo-900 hover:text-white py-2 px-4 rounded-md"
                  > <button onClick={() => handleClick()}>
                      View Profile

                  </button>
                  
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No religious leaders found for the selected area.</p>
        )}
      </div>

      {/* Google Maps Link */}
      {googleMapsLink && (
        <div className="text-center mt-6">
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-900 text-white py-2 px-4 rounded-md"
          >
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default Land1;
