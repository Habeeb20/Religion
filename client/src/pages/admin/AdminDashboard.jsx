// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [leaders, setLeaders] = useState([]);

 
//   const token = localStorage.getItem('token'); 

//   useEffect(() => {
//     const fetchUsersAndLeaders = async () => {
//       try {
//         const userRes = await axios.get(`${import.meta.env.VITE_API_URL}/getallusers`, {
//         //   headers: { Authorization: `Bearer ${token}` }, 
//         });
//         const leaderRes = await axios.get(`${import.meta.env.VITE_API_URL2}/getallleaders`, {
//         //   headers: { Authorization: `Bearer ${token}` }, 
//         });
//         setUsers(userRes.data);
//         setLeaders(leaderRes.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchUsersAndLeaders();
//   }, [token]);

//   const handleStatusChange = async (id, type, entityType) => {
//     const url = entityType === 'user' 
//       ? `${import.meta.env.VITE_API_URL5}/users/status` 
//       : `${import.meta.env.VITE_API_URL5}/leaders/status`;

//     try {
//       await axios.put(
//         url,
//         { [`${entityType}Id`]: id, actionType: type },
//         {
//           headers: { Authorization: `Bearer ${token}` }, // Include JWT token in headers
//         }
//       );

//       // Fetch updated users and leaders again after status change
//       const userRes = await axios.get(`${import.meta.env.VITE_API_URL5}/users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const leaderRes = await axios.get(`${import.meta.env.VITE_API_URL5}/leaders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(userRes.data);
//       setLeaders(leaderRes.data);

//       alert(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} updated successfully.`);
//     } catch (error) {
//       console.error('Failed to update status', error);
//       alert('An error occurred while updating the status.');
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//       <div className="my-6">
//         <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td className="border px-4 py-2">{user.firstname} {user.lastname}</td>
//                 <td className="border px-4 py-2">{user.email}</td>
//                 <td className="border px-4 py-2">{user.isVerified ? 'Verified' : 'Not Verified'} | {user.status}</td>
//                 <td className="border px-4 py-2">
//                   <button 
//                     className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                     onClick={() => handleStatusChange(user._id, 'verify', 'user')}
//                     disabled={user.isVerified}
//                   >
//                     {user.isVerified ? 'Verified' : 'Verify'}
//                   </button>
//                   <button 
//                     className={`px-2 py-1 rounded ${user.status === 'blocked' ? 'bg-green-500' : 'bg-red-500'} text-white`}
//                     onClick={() => handleStatusChange(user._id, user.status === 'blocked' ? 'activate' : 'block', 'user')}
//                   >
//                     {user.status === 'blocked' ? 'Activate' : 'Block'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="my-6">
//         <h2 className="text-xl font-semibold mb-2">Manage Leaders</h2>
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Email</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaders.map((leader) => (
//               <tr key={leader._id}>
//                 <td className="border px-4 py-2">{leader.firstname} {leader.lastname}</td>
//                 <td className="border px-4 py-2">{leader.email}</td>
//                 <td className="border px-4 py-2">{leader.isVerified ? 'Verified' : 'Not Verified'} | {leader.status}</td>
//                 <td className="border px-4 py-2">
//                   <button 
//                     className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
//                     onClick={() => handleStatusChange(leader._id, 'verify', 'leader')}
//                     disabled={leader.isVerified}
//                   >
//                     {leader.isVerified ? 'Verified' : 'Verify'}
//                   </button>
//                   <button 
//                     className={`px-2 py-1 rounded ${leader.status === 'blocked' ? 'bg-green-500' : 'bg-red-500'} text-white`}
//                     onClick={() => handleStatusChange(leader._id, leader.status === 'blocked' ? 'activate' : 'block', 'leader')}
//                   >
//                     {leader.status === 'blocked' ? 'Activate' : 'Block'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
} from 'react-icons/ai';
import Dashboard from './Dashboard';
import AllUsers from './AllUsers';
import AllLeaders from './AllLeaders';
import VerifyUsers from './VerifyUsers';
import VerifyLeaders from './VerifyLeaders';
import ReportedAccounts from './ReportedAccount';

const Admin = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col p-4">
        <div className="flex items-center space-x-2 text-white mb-6">
          {/* <img src="/apple-logo.png" alt="Logo" className="h-8 w-8" /> */}
          <span className="text-xl font-bold"> | Admin</span>
        </div>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg ${
                isActive ? 'bg-indigo-700 font-bold text-white' : ''
              }`
            }
          >
            <AiOutlineHome className="h-6 w-6" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg ${
                isActive ? 'bg-indigo-700 font-bold text-white' : ''
              }`
            }
          >
            <AiOutlineUser className="h-6 w-6" />
            <span>All Users</span>
          </NavLink>
          <NavLink
            to="/leaders"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg ${
                isActive ? 'bg-indigo-700 font-bold text-white' : ''
              }`
            }
          >
            <AiOutlineTeam className="h-6 w-6" />
            <span>All Leaders</span>
          </NavLink>
          <NavLink
            to="/verify-users"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg ${
                isActive ? 'bg-indigo-700 font-bold text-white' : ''
              }`
            }
          >
            <AiOutlineCheckCircle className="h-6 w-6" />
            <span>Verify Users</span>
          </NavLink>
          <NavLink
            to="/verify-leaders"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg ${
                isActive ? 'bg-indigo-700 font-bold text-white' : ''
              }`
            }
          >
            <AiOutlineCheckCircle className="h-6 w-6" />
            <span>Verify Leaders</span>
          </NavLink>
          <NavLink
            to="/reported"
            className={({ isActive }) =>
              `flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-lg ${
                isActive ? 'bg-indigo-700 font-bold text-white' : ''
              }`
            }
          >
            <AiOutlineExclamationCircle className="h-6 w-6" />
            <span>Reported Accounts</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin/users" element={<AllUsers />} />
          <Route path="/leaders" element={<AllLeaders />} />
          <Route path="/verify-users" element={<VerifyUsers />} />
          <Route path="/verify-leaders" element={<VerifyLeaders />} />
          <Route path="/reported" element={<ReportedAccounts />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
