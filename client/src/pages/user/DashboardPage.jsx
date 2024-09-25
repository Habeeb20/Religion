import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}profile`);
        console.log(response.data); // Log response data to ensure it's correct
        setUser(response.data);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(formData); // Log formData before sending the PUT request
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}update-profile`, formData);
      alert('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}delete-account`);
      alert('Account deleted successfully');
      navigate('/signup');
    } catch (err) {
      setError('Failed to delete account');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="firstname"
          value={formData.firstname || ''}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname || ''}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          disabled
        />
        <input
          type="text"
          name="state"
          value={formData.state || ''}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="localGovtArea"
          value={formData.localGovtArea || ''}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
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
