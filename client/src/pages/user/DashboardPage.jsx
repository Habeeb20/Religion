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
        setUser(response.data);
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

  if (loading) return <p>Loading profile...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
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
