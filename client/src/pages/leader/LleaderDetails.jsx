import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LleaderDetails = () => {
  const { id } = useParams();
  const [leader, setLeader] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL2}/lleaderdetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLeader(data);
        setError(null); // Clear error if successful
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load profile. Please try again later.');
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!leader) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-12 px-4'>
      <h2 className='text-lg font-semibold mb-4'>
        Profile of {leader.title} {leader.firstname} {leader.lastname}
      </h2>
      <div className="p-4 rounded-lg shadow-lg bg-[#f5f0e1] text-left relative">
        {/* Leader Image */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={leader.profilePicture || 'https://example.com/default-avatar.jpg'}
            alt={`${leader.firstname} ${leader.lastname}`}
            className="rounded-full w-24 h-24 object-cover"
          />
          <div>
            <h3 className="font-bold text-[#1f1f7a] px-5 text-2xl">
              {leader.title} {leader.firstname} {leader.lastname}
            </h3>
            <p className="text-sm text-gray-500">
              Ministry: {leader.ministryname}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="text-sm text-gray-600 mt-2">
          <h4 className="font-semibold">Bio:</h4>
          <p>{leader.bio || "No bio available."}</p>
        </div>

        {/* Religion & Location */}
        <div className="mt-4 text-sm text-gray-700">
          <h4 className="font-semibold">Religion:</h4>
          <p>{leader.religion}</p>
          <p>{leader.category}</p>
          <h4 className="font-semibold">Location:</h4>
          <p>
            {leader.localGovtArea}, {leader.state}
          </p>
        </div>

        {/* Contact Details */}
        <div className="mt-4 text-sm">
          <h4 className="font-semibold">Contact:</h4>
          <p>Email: {leader.email}</p>
        </div>

        {/* Bank Details */}
        <div className="mt-4 text-sm">
          <h4 className="font-semibold">Bank Details:</h4>
          <p>Account Name: {leader.accountName}</p>
          <p>Account Number: {leader.accountNumber}</p>
          <p>Bank Name: {leader.bankName}</p>
        </div>
      </div>
    </div>
  );
};

export default LleaderDetails;
