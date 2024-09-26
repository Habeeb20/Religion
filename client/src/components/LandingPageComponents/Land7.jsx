import React, { useEffect, useState } from 'react';
import im from '../../assets/religion/image 6.png';
import e from '../../assets/religion/n.png';
import c from '../../assets/religion/n1.png';
import r from '../../assets/religion/Rectangle 326 (2).png';

const Land7 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ministers, setMinisters] = useState([]);
  const [filteredMinisters, setFilteredMinisters] = useState([]);

  // Fetch minister data from API
  useEffect(() => {
    const fetchMinisters = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL2}/getallleaders`);
        const data = await response.json();
        setMinisters(data);
        setFilteredMinisters(data); // Initialize with all ministers
      } catch (error) {
        console.error('Error fetching ministers:', error);
      }
    };

    fetchMinisters();
  }, []);

  // Filter ministers based on search term
  useEffect(() => {
    if (searchTerm) {
      const results = ministers.filter((minister) =>
        minister.localGovtArea.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMinisters(results);
    } else {
      setFilteredMinisters(ministers);
    }
  }, [searchTerm, ministers]);

  return (
    <div className="bg-yellow-50 min-h-screen p-8">
      {/* Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={im}
            alt="Man thinking"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Search Section */}
        <div className="w-full md:w-1/2 text-center md:text-left p-4">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4">
            Don't know where to worship? <br />
            Scan through our database to see worship centers around you
          </h1>
          <div className="flex flex-col md:flex-row items-center md:justify-start space-y-2 md:space-y-0">
            <input
              type="text"
              placeholder="Search by Local Government Area"
              className="p-2 border border-gray-400 rounded-md w-full md:w-2/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="ml-2 bg-indigo-900 text-white p-2 rounded-md hover:bg-indigo-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-indigo-900 mb-6">Search Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredMinisters.length > 0 ? (
            filteredMinisters.map((minister, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-sm font-semibold text-indigo-900">Name of Imam/pastor: {minister.title} {minister.firstname} {minister.lastname}</h3>
                <p className="text-black-600 text-sm mb-2">LGA: {minister.localGovtArea}</p>
                <p className="text-black-600 text-sm mb-2">church/mosque: {minister.ministryname}</p>
                <p className="text-black-600 text-sm mb-2">Religion: {minister.religion}</p>
                <div className="flex items-center">
                  <a href={`mailto:${minister.email}`} className="text-indigo-600 hover:underline">
                    {minister.email}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No results found.</p>
          )}
        </div>
      </div>

      {/* Our Other Choices */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-indigo-900 mb-6">Our Other Choices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="flex items-center space-x-4">
            <img
              src={e}
              alt="e-ride"
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">e-ride</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet consectetur. Et rhoncus nunc dictum massa.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center space-x-4">
            <img
              src={r}
              alt="hauling"
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">hauling</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet consectetur. Et rhoncus nunc dictum massa.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center space-x-4">
            <img
              src={c}
              alt="Pride of Nigeria"
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">Pride of Nigeria</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet consectetur. Et rhoncus nunc dictum massa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Land7;
