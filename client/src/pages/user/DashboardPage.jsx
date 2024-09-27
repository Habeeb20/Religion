import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('general'); 
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({}); 

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        });
        setUser(response.data.user);
      } catch (err) {
        console.error(err); 
        if (err.response?.status === 401) {
          setError('Unauthorized access, please login again');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to fetch profile');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);
  const handleEdit = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };
  const handleSave = async () => {
    try {
      // Make API call to save edited data
      await axios.put(`${import.meta.env.VITE_API_URL}/edit`, editedData, {
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



  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/delete-account`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Account deleted successfully');
      localStorage.removeItem('token');
      navigate('/signup');
    } catch (err) {
      console.error(err);
      setError('Failed to delete account');
    }
  };

  if (loading) return <p className="text-center text-indigo-900">Loading profile...</p>;

  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!user) return <p className="text-center text-indigo-900">User not found</p>;

  return (
    <div className="min-h-screen bg-butter">
  <div className="bg-indigo-900 p-8">
        {/* <h1 className="text-white text-3xl font-bold">User Profile</h1> */}
      </div>
      <div className="flex flex-col md:flex-row bg-gray-100 p-4 md:p-8">
      <div className="bg-white shadow-md rounded p-4 w-full md:w-1/3 flex flex-col items-center">
      {user.profilePicture && (
            <div className="mb-4">
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          )}
          <h2 className="text-xl font-bold text-center"> {user.firstname} {user.lastname}</h2>
          <p className="text-gray-600 text-center">{user.email}</p>

               {/* Navigation for Profile Sections */}
               <div className="mt-8 w-full flex flex-col space-y-2">
            <button className="bg-indigo-900 text-white py-2 px-4 rounded-lg w-full">home</button>
            <Link to='/chat'><button className="bg-indigo-900 text-white py-2 px-4 rounded-lg w-full">Go to your chat</button></Link>
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
              {/* GALLERY
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'review' ? 'text-indigo-900 border-b-2 border-indigo-900' : 'text-gray-500'}`}
              onClick={() => setActiveTab('review')}
            > */}
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
                    <p className="text-gray-600"><strong>First Name:</strong> {user.firstname}</p>
                  )}
                  <p className="text-gray-600"><strong>Last Name:</strong> {user.lastname}</p>
                  <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
                  <p className="text-gray-600"><strong>state:</strong> {user.state}</p>
                  <p className="text-gray-600"><strong>LGA:</strong> {user.localGovtArea}</p>

                </div>
                <div>
                  <p className="text-gray-600"><strong>Phone Number:</strong> {user.phone}</p>
                  <p className="text-gray-600"><strong>Address:</strong> {user.address}</p>
                  <p className="text-gray-600"><strong>unique Num:</strong> {user.uniqueNumber}</p>
                  <p className="text-gray-600"><strong>Religion:</strong> {user.religion}</p>
                  <p className="text-gray-600"><strong>Category:</strong> {user.category}</p>
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
              <p className="text-gray-600"><strong>Account Name:</strong> {user.accountName}</p>
              <p className="text-gray-600"><strong>Account Number:</strong> {user.accountNumber}</p>
              <p className="text-gray-600"><strong>Bank Name:</strong> {user.bankName}</p>
            </div>
          )}

          {/* Gallery Section */}
          {/* {activeTab === 'gallery' && (
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
          )} */}

       


      
      </div>

      {/* <div className="flex justify-center space-x-4 mt-6">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
          onClick={handleDelete}
        >
          Delete Account
        </button> */}

      
      </div>
    </div>
  );
};

export default DashboardPage;
