import React, { useEffect, useState } from 'react';
import { AiOutlineHome, AiOutlineUser, AiOutlineTeam, AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllLeaders = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleVerify = async (userId) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL2}/leaderisverified/${userId}`);
      if (response.status === 200) {
        // Update the user's verified status locally
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isVerified: true } : user
          )
        );
        toast.success('User verified successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to verify user. Please try again.');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL2}/getallleaders`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white p-4 hidden md:flex flex-col">
        <div className="flex items-center space-x-2 text-white mb-6">
          <img src="/apple-logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold"> | Admin</span>
        </div>
        <nav className="flex flex-col space-y-4">
          <NavLink to="/admin" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
            <AiOutlineHome className="h-6 w-6" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/users" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg ">
            <AiOutlineUser className="h-6 w-6" />
            <span>All Users</span>
          </NavLink>
          <NavLink to="/admin/leaders" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg bg-indigo-700 font-bold">
            <AiOutlineTeam className="h-6 w-6" />
            <span>All Leaders</span>
          </NavLink>
          <NavLink to="/verify-users" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
            <AiOutlineCheckCircle className="h-6 w-6" />
            <span>Verify Users</span>
          </NavLink>
          <NavLink to="/reportedaccounts" className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
            <AiOutlineExclamationCircle className="h-6 w-6" />
            <span>Reported Accounts</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">All Users</h1>

        {loading ? (
          <p>Loading religious leaders...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-indigo-800 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">FirstName</th>
                  <th className="py-2 px-4 text-left">LastName</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Religion</th>
                  <th className="py-2 px-4 text-left">MinistryName</th>
                  <th className="py-2 px-4 text-left">State</th>
                  <th className="py-2 px-4 text-left">LGA</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="border-b">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{user.firstname}</td>
                    <td className="py-2 px-4">{user.lastname}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{formatDate(user.createdAt)}</td>
                    <td className="py-2 px-4">{user.status}</td>
                    <td className="py-2 px-4">{user.religion}</td>
                    <td className="py-2 px-4">{user.ministryname}</td>
                    <td className="py-2 px-4">{user.state}</td>
                    <td className="py-2 px-4">{user.localGovtArea}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      {!user.isVerified ? (
                        <button
                          onClick={() => handleVerify(user._id)}
                          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                        >
                          Verify
                        </button>
                      ) : (
                        <span className="bg-gray-500 text-white px-4 py-1 rounded">Verified</span>
                      )}
                      <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Block</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        {/* Mobile Sidebar Toggle Button */}
        <div className="md:hidden fixed bottom-4 left-4 bg-indigo-900 text-white p-2 rounded-full shadow-lg">
          <button onClick={toggleSidebar} className="text-xl">☰</button>
        </div>

        {/* Sidebar (conditionally rendered) */}
        {isSidebarVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 p-4">
              <h2 className="text-2xl font-bold mb-4">Sidebar Menu</h2>
              <ul>
                <li className="mb-2"><a href="/admin" className="block p-2">Dashboard</a></li>
                <li className="mb-2"><a href="/admin/users" className="block p-2">All users</a></li>
                <li className="mb-2"><a href="/admin/leaders" className="block p-2">All leaders</a></li>
                <li className="mb-2"><a href="/verify-users" className="block p-2">Verify users</a></li>
                <li className="mb-2"><a href="/reportedaccounts" className="block p-2">reported accounts</a></li>
              </ul>
              <button onClick={toggleSidebar} className="mt-4 text-red-500">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLeaders;
