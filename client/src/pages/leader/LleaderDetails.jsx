import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios

const LleaderDetails = () => {
  const { id } = useParams();
  console.log("parameter:", id)
  const [leader, setLeader] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!id){
      setError("user id is not found")
    }
    
    axios.get(`${import.meta.env.VITE_API_URL2}/lleaderdetails/${id}`)
      .then((response) => {
        // console.log('Response data:', response.data); 
        setLeader(response.data.user); 
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load profile. Please try again later.');
      });
  }, [id]);

  if (error) {
    return (
      <div>
        {error}
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          {error}
        </button>
      </div>
    );
  }

  if (!leader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="text-lg font-semibold mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className='mt-12 px-4'>
      <h2 className='text-lg font-semibold mb-4'>
        Profile of {leader.title} {leader.firstname} {leader.lastname}
      </h2>
      <div className="p-4 rounded-lg shadow-lg bg-[#f5f0e1] text-left relative">
        {/* Leader Image and Basic Info */}
        <div className="flex flex-col sm:flex-row items-center space-x-4 mb-4">
          <img
            src={leader.profilePicture || 'https://via.placeholder.com/150'}
            alt={`${leader.firstname} ${leader.lastname}`}
            className="rounded-full w-24 h-24 object-cover"
          />
          <div className="mt-4 sm:mt-0">
            <h3 className="font-bold text-[#1f1f7a] px-5 text-2xl">
              {leader.title} {leader.firstname} {leader.lastname}
            </h3>
            {leader.ministryname && (
              <p className="text-sm text-gray-500">
                Ministry: {leader.ministryname}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {leader.bio && (
          <div className="text-sm text-gray-600 mt-2">
            <h4 className="font-semibold">Bio:</h4>
            <p>{leader.bio}</p>
            <p>{leader.uniqueNumber}</p>
          </div>
        )}

        {/* Religion & Location */}
        <div className="mt-4 text-sm text-gray-700">
          {leader.religion && (
            <>
              <h4 className="font-semibold">Religion:</h4>
              <p>{leader.religion}</p>
              <p>{leader.category}</p>
            </>
          )}
          {leader.category && (
            <p>Category: {leader.category}</p>
          )}
          <h4 className="font-semibold mt-2">Location:</h4>
          <p>
            {leader.state}
          </p>
          <p>
            {leader.localGovtArea}, {leader.state}
          </p>
          <p>{leader.address}</p>
        </div>


        <div className="mt-4 text-sm text-gray-700">
          <h4 className='font-semibold'>Years of Ministration</h4>
          <p>{leader.yearsInProfession} years</p>
        </div>

        {/* Contact Details */}
        {leader.email && (
          <div className="mt-4 text-sm">
            <h4 className="font-semibold">Contact:</h4>
            <p>Email: {leader.email}</p>
          </div>
        )}

        {/* Bank Details */}
        {(leader.accountName || leader.accountNumber || leader.bankName) && (
          <div className="mt-4 text-sm">
            <h4 className="font-semibold">Bank Details:</h4>
            {leader.accountName && <p>Account Name: {leader.accountName}</p>}
            {leader.accountNumber && <p>Account Number: {leader.accountNumber}</p>}
            {leader.bankName && <p>Bank Name: {leader.bankName}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LleaderDetails;
