import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Assuming user details are stored in localStorage after login
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL2}getprofile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        setUserData(response.data); // Set the user data after fetching it
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  if (!userData) return <div>Loading profile...</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded shadow-md max-w-lg w-full space-y-4">
        <h1 className="text-xl font-bold">Profile</h1>

        {/* Display Profile Picture */}
        {userData.profilePicture && (
          <div className="flex justify-center mb-4">
            <img 
              src={userData.profilePicture} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}

        <p><strong>Title:</strong> {userData.title}</p>
        <p><strong>First Name:</strong> {userData.firstname}</p>
        <p><strong>Last Name:</strong> {userData.lastname}</p>
        <p><strong>Ministry Name:</strong> {userData.ministryname}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Bio:</strong> {userData.bio}</p>
        <p><strong>Religion:</strong> {userData.religion}</p>
        <p><strong>Category:</strong> {userData.category}</p>
        <p><strong>State:</strong> {userData.state}</p>
        <p><strong>Local Govt Area:</strong> {userData.localGovtArea}</p>
        <p><strong>Address:</strong> {userData.address}</p>
        <p><strong>Bank Name:</strong> {userData.bankName}</p>
        <p><strong>Account Name:</strong> {userData.accountName}</p>
        <p><strong>Account Number:</strong> {userData.accountNumber}</p>
        <p><strong>Referee Name:</strong> {userData.refereename}</p>
        <p><strong>Referee Email:</strong> {userData.refereeemail}</p>
        <p><strong>Referee Phone:</strong> {userData.refereephone}</p>
        <p><strong>Relationship:</strong> {userData.relationship}</p>
      </div>
    </div>
  );
};

export default LProfile;
