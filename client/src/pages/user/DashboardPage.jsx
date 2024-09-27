// import { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const DashboardPage = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         console.log(token);

//         if (!token) {
//           throw new Error('No token found');
//         }

//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/getprofile`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true
//         });
//         setUser(response.data.user);
//       } catch (err) {
//         console.error(err); 
//         if (err.response?.status === 401) {
//           setError('Unauthorized access, please login again');
//           localStorage.removeItem('token');
//           navigate('/login');
//         } else {
//           setError('Failed to fetch profile');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [navigate]);

//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`${import.meta.env.VITE_API_URL}/delete-account`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       alert('Account deleted successfully');
//       localStorage.removeItem('token');
//       navigate('/signup');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to delete account');
//     }
//   };

//   if (loading) return <p>Loading profile...</p>;

//   if (error) return <p className="text-red-500">{error}</p>;

//   if (!user) return <p>User not found</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Profile</h2>
//       <div className="space-y-4">
//         <img src={user.profilePicture} alt="" />
//         <p><strong>First Name:</strong> {user.firstname}</p>
//         <p><strong>Last Name:</strong> {user.lastname}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>State:</strong> {user.state}</p>
//         <p><strong>Local Government Area:</strong> {user.localGovtArea}</p>
//         <p><strong>Unique number:</strong> {user.uniqueNumber}</p>
//       </div>
//       <button
//         className="bg-red-500 text-white p-2 rounded mt-4"
//         onClick={handleDelete}
//       >
//         Delete Account
//       </button>
//       <Link to='/chat'>
//       <button
//         className="bg-green-500 text-white p-2 rounded mt-4"
     
//       >
//         chat
//       </button>
//       </Link>
 
//     </div>
//   );
// };

// export default DashboardPage;



import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className="p-6 mx-auto max-w-3xl bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-indigo-900 mb-6">Profile</h2>
      <div className="space-y-4">
        <img
          className="w-32 h-32 rounded-full object-cover mx-auto"
          src={user.profilePicture} 
          alt={`${user.firstname} ${user.lastname}`} 
        />
        <div className="text-center space-y-2">
          <p><strong>First Name:</strong> {user.firstname}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>State:</strong> {user.state}</p>
          <p><strong>Local Government Area:</strong> {user.localGovtArea}</p>
          <p><strong>Unique Number:</strong> {user.uniqueNumber}</p>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
          onClick={handleDelete}
        >
          Delete Account
        </button>

        <Link to="/chat">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Chat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
