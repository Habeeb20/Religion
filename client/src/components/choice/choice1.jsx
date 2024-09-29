import React, { useEffect, useState } from 'react';


import axios from 'axios';
import toast from 'react-hot-toast';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

const Choice = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    profilePicture: null,
    religion: '',
    category: '',
    uniqueNumber: '',
    LGA:'',
  });

  const [error, setError] = useState('');
  const [ministers, setMinisters] = useState([]);
  const [location, setLocation] = useState('');
  const [religion, setReligion] = useState('');
  const [localGovtAreas, setLocalGovtAreas] = useState([]);
  const [filteredMinisters, setFilteredMinisters] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/getprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });
        setFormData(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchMinisterData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL2}/getallleaders`);
        setMinisters(res.data);
        setLocalGovtAreas([...new Set(res.data.map(minister => minister.localGovtArea))]);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchMinisterData();
  }, []);

  const handleSearch = () => {
    const filtered = ministers.filter(
      (minister) =>
        minister.religion.toLowerCase().includes(religion.toLowerCase()) &&
        minister.state.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredMinisters(filtered);
    const filteredLGAs = [...new Set(filtered.map(minister => minister.localGovtArea))];
    setLocalGovtAreas(filteredLGAs);
  };

  const filterByLGA = (lga) => {
    const filteredByLGA = ministers.filter(minister => minister.localGovtArea === lga);
    setFilteredMinisters(filteredByLGA);
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-yellow-100 p-8 border-r border-purple-300 flex flex-col items-center mt-10">
        <img src={formData.profilePicture} alt="profile" className="w-24 h-24 rounded-full mb-4 mt-4" />
        <h1 className="text-blue-900 font-bold text-xl">
          {formData.firstname} {formData.lastname}
        </h1>
        <p className="text-gray-600">{formData.email}</p>
        <p className="text-gray-600">state: {formData.state}</p>
        <p className="text-gray-600">Local Govt Area: {formData.localGovtArea}</p>
        <p className="text-gray-600">Your unique number: {formData.uniqueNumber}</p>
        <p className="text-gray-600">Relion: {formData.religion}</p>
        <p className="text-gray-600">category in religion: {formData.category}</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8 flex flex-col items-center">
        <div className="mt-8 text-center w-full lg:w-2/3">
          <h2 className="text-lg font-bold text-blue-900">
            Identify the religion of your choice
          </h2>
          <p className="text-sm text-gray-600">
            Note: This is not your saved religion. This is just based on your current request.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center mt-6 space-y-2 lg:space-y-0 lg:space-x-2">
            <input
              type="text"
              placeholder="Religion"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              className="bg-white border border-gray-300 px-4 py-3 rounded-md w-full lg:w-1/3"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white border border-gray-300 px-4 py-3 rounded-md w-full lg:w-1/3"
            />
          </div>

          <button onClick={handleSearch} className="mt-6 bg-blue-900 text-white px-8 py-3 rounded-lg">
            Search
          </button>
        </div>

        {filteredMinisters.length > 0 && (
          <div className="mt-8 w-full">
            <h2 className="text-2xl font-bold text-center text-blue-900">
              Search Results of {religion} Leaders in {location}
            </h2>

            <div className="flex justify-center mt-6 space-x-4">
              <button className="bg-indigo-800 text-white px-7 py-3 rounded-lg">Our Top Pick</button>
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg">Regular Ministries</button>
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg">Most Popular</button>
              <div className="bg-gray-100 text-blue-900 px-6 py-3 rounded-lg">
                <CountUp end={filteredMinisters.length} duration={2}  /> religious leader
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold text-gray-700">Only show results in:</h3>
              <div className="flex flex-wrap justify-center space-x-2 mt-4">
                {localGovtAreas.map((lga) => (
                  <button
                    key={lga}
                    onClick={() => filterByLGA(lga)}
                    className="bg-yellow-300 text-blue-900 px-4 py-2 rounded-lg"
                  >
                    {lga}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMinisters.map((minister) => (
                <div key={minister.id} className="bg-yellow-100 p-4 rounded-lg shadow-md border border-gray-300">
                  <img
                    src={minister.profilePicture }
                    alt={minister.firstName}
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                  <h3 className="text-center mt-4 text-xl font-semibold text-blue-900">
                    {minister.firstName} {minister.lastName}
                  </h3>
                  <p className="text-center text-gray-600">{minister.ministryName}</p>
                  <p className="text-center text-gray-600">Email: {minister.email}</p>
                  <p className="text-center text-gray-600">Bio: {minister.bio}</p>
                  <p className="text-center text-gray-600">Religion: {minister.religion}</p>
                  <p className="text-center text-gray-600">State: {minister.state}</p>
                  <p className="text-center text-gray-600">Local Govt Area: {minister.localGovtArea}</p>
                  <Link to='/popupchoice'>
                  <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg w-full">
                    Book Appointment
                  </button>
                  </Link>
                
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Choice;
