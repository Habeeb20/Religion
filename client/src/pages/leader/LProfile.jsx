import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LProfile = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('general'); 
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({}); 

  useEffect(() => {
    console.log('token', localStorage.getItem('token'));
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL2}/getprofile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        setUserData(response.data.user);
        setEditedData(response.data.user); // Set initial edited data
        console.log(response);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleSave = async () => {
    try {
      // Make API call to save edited data
      await axios.put(`${import.meta.env.VITE_API_URL2}/ledit`, editedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIsEditing(false); // Exit edit mode
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!userData) return <div>Loading profile...</div>;

  return (
    <div className="min-h-screen bg-butter">
      {/* Top Background Section */}
      <div className="bg-indigo-900 p-8">
        {/* <h1 className="text-white text-3xl font-bold">User Profile</h1> */}
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row bg-gray-100 p-4 md:p-8">
        {/* Left Section: Profile Picture, Name, and Email */}
        <div className="bg-white shadow-md rounded p-4 w-full md:w-1/3 flex flex-col items-center">
          {userData.profilePicture && (
            <div className="mb-4">
              <img 
                src={userData.profilePicture} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          )}
          <h2 className="text-xl font-bold text-center">{userData.title} {userData.firstname} {userData.lastname}</h2>
          <p className="text-gray-600 text-center">{userData.email}</p>

          {/* Navigation for Profile Sections */}
          <div className="mt-8 w-full flex flex-col space-y-2">
            <button className="bg-indigo-900 text-white py-2 px-4 rounded-lg w-full">Go to Church profile</button>
            <button className="bg-indigo-900 text-white py-2 px-4 rounded-lg w-full">Go to your chat</button>
          </div>
        </div>

        {/* Right Section: Profile Details and Tabs */}
        <div className="flex-1 bg-white shadow-md rounded p-4 mt-8 md:mt-0 md:ml-8">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`py-2 px-4 ${activeTab === 'general' ? 'text-indigo-900 border-b-2 border-indigo-900' : 'text-gray-500'}`}
              onClick={() => setActiveTab('general')}
            >
              GENERAL
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'account' ? 'text-indigo-900 border-b-2 border-indigo-900' : 'text-gray-500'}`}
              onClick={() => setActiveTab('account')}
            >
              ACCOUNT
            </button>
            {/* <button
              className={`py-2 px-4 ${activeTab === 'history' ? 'text-indigo-900 border-b-2 border-indigo-900' : 'text-gray-500'}`}
              onClick={() => setActiveTab('history')}
            >
              HISTORY
            </button> */}
            <button
              className={`py-2 px-4 ${activeTab === 'gallery' ? 'text-indigo-900 border-b-2 border-indigo-900' : 'text-gray-500'}`}
              onClick={() => setActiveTab('gallery')}
            >
              GALLERY
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'review' ? 'text-indigo-900 border-b-2 border-indigo-900' : 'text-gray-500'}`}
              onClick={() => setActiveTab('review')}
            >
              REVIEW
            </button>
          </div>

          {/* General Section */}
          {activeTab === 'general' && (
            <div className="mt-6">
              <h1 className="text-xl font-bold mb-4">General Information</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {isEditing ? (
                    <input
                      className="border rounded px-3 py-2 w-full"
                      type="text"
                      name="firstname"
                      value={editedData.firstname}
                      onChange={handleChange}
                    />
                  ) : (
                    <p className="text-gray-600"><strong>First Name:</strong> {userData.firstname}</p>
                  )}
                  <p className="text-gray-600"><strong>Last Name:</strong> {userData.lastname}</p>
                  <p className="text-gray-600"><strong>Email:</strong> {userData.email}</p>
                  <p className="text-gray-600"><strong>state:</strong> {userData.state}</p>
                  <p className="text-gray-600"><strong>LGA:</strong> {userData.localGovtArea}</p>
                  <p className="text-gray-600"><strong>Years in Profession:</strong> {userData.yearsInProfession} years</p>
                </div>
                <div>
                  <p className="text-gray-600"><strong>country:</strong> {userData.country}</p>
                  <p className="text-gray-600"><strong>Address:</strong> {userData.address}</p>
                  <p className="text-gray-600"><strong>unique Num:</strong> {userData.uniqueNumber}</p>
                  <p className="text-gray-600"><strong>Religion:</strong> {userData.religion}</p>
                  <p className="text-gray-600"><strong>Category:</strong> {userData.category}</p>
                </div>
              </div>
              {/* Edit and Save Buttons */}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={handleEdit}
                  className="bg-indigo-900 text-white py-2 px-4 rounded"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Account Section */}
          {activeTab === 'account' && (
            <div className="mt-6">
              <h1 className="text-xl font-bold mb-4">Account Information</h1>
              <p className="text-gray-600"><strong>Account Name:</strong> {userData.accountName}</p>
              <p className="text-gray-600"><strong>Account Number:</strong> {userData.accountNumber}</p>
              <p className="text-gray-600"><strong>Bank Name:</strong> {userData.bankName}</p>
            </div>
          )}

          {/* Gallery Section */}
          {activeTab === 'gallery' && (
            <div className="mt-6">
              <h1 className="text-xl font-bold mb-4">Gallery</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userData.gallery?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-40 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Review Section */}
          {activeTab === 'review' && (
            <div className="mt-6">
                <p className="text-gray-600"><strong>Referee name:</strong> {userData.refereename}</p>
                <p className="text-gray-600"><strong>Referee phone number:</strong> {userData.refereephone}</p>
                <p className="text-gray-600"><strong>Referee email:</strong> {userData.refereeemail}</p>
                <p className="text-gray-600"><strong>Relationshipt with referee:</strong> {userData.relationship}</p>
              <h1 className="text-xl font-bold mb-4">Reviews</h1>
              <p className="text-gray-600">This is where the user reviews would appear...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LProfile;
