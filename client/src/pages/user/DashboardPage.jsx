import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getprofile`, {
          headers: {
            Authorization: `Bearer ${token}` 
          },
          withCredentials: true
        });
        console.log(response.data);
        setUser(response.data);
      } catch (err) {
        console.error(err); // Log error for debugging
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token for the delete request
      await axios.delete(`${import.meta.env.VITE_API_URL}delete-account`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in headers
        }
      });
      alert('Account deleted successfully');
      navigate('/signup');
    } catch (err) {
      console.error(err);
      setError('Failed to delete account');
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        <p><strong>First Name:</strong> {user.firstname}</p>
        <p><strong>Last Name:</strong> {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>State:</strong> {user.state}</p>
        <p><strong>Local Government Area:</strong> {user.localGovtArea}</p>
      </div>
      <button
        className="bg-red-500 text-white p-2 rounded mt-4"
        onClick={handleDelete}
      >
        Delete Account
      </button>
    </div>
  );
};

export default DashboardPage;
