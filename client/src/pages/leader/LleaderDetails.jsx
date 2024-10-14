// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios'; // Import axios

// const LleaderDetails = () => {
//   const { id } = useParams();
//   console.log("parameter:", id)
//   const [leader, setLeader] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if(!id){
//       setError("user id is not found")
//     }
    
//     axios.get(`${import.meta.env.VITE_API_URL2}/lleaderdetails/${id}`)
//       .then((response) => {
//         // console.log('Response data:', response.data); 
//         setLeader(response.data.user); 
//         setError(null);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setError('Failed to load profile. Please try again later.');
//       });
//   }, [id]);

//   if (error) {
//     return (
//       <div>
//         {error}
//         <button
//           onClick={() => window.location.reload()}
//           className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//         >
//           {error}
//         </button>
//       </div>
//     );
//   }

//   if (!leader) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
//         <p className="text-lg font-semibold mt-4">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className='mt-12 px-4'>
//       <h2 className='text-lg font-semibold mb-4'>
//         Profile of {leader.title} {leader.firstname} {leader.lastname}
//       </h2>
//       <div className="p-4 rounded-lg shadow-lg bg-[#f5f0e1] text-left relative">
//         {/* Leader Image and Basic Info */}
//         <div className="flex flex-col sm:flex-row items-center space-x-4 mb-4">
//           <img
//             src={leader.profilePicture || 'https://via.placeholder.com/150'}
//             alt={`${leader.firstname} ${leader.lastname}`}
//             className="rounded-full w-24 h-24 object-cover"
//           />
//           <div className="mt-4 sm:mt-0">
//             <h3 className="font-bold text-[#1f1f7a] px-5 text-2xl">
//               {leader.title} {leader.firstname} {leader.lastname}
//             </h3>
//             {leader.ministryname && (
//               <p className="text-sm text-gray-500">
//                 Ministry: {leader.ministryname}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Bio */}
//         {leader.bio && (
//           <div className="text-sm text-gray-600 mt-2">
//             <h4 className="font-semibold">Bio:</h4>
//             <p>{leader.bio}</p>
//             <p>{leader.uniqueNumber}</p>
//           </div>
//         )}

//         {/* Religion & Location */}
//         <div className="mt-4 text-sm text-gray-700">
//           {leader.religion && (
//             <>
//               <h4 className="font-semibold">Religion:</h4>
//               <p>{leader.religion}</p>
//               <p>{leader.category}</p>
//             </>
//           )}
//           {leader.category && (
//             <p>Category: {leader.category}</p>
//           )}
//           <h4 className="font-semibold mt-2">Location:</h4>
//           <p>
//             {leader.state}
//           </p>
//           <p>
//             {leader.localGovtArea}, {leader.state}
//           </p>
//           <p>{leader.address}</p>
//         </div>


//         <div className="mt-4 text-sm text-gray-700">
//           <h4 className='font-semibold'>Years of Ministration</h4>
//           <p>{leader.yearsInProfession} years</p>
//         </div>
//         {
//           leader.isVerified && (
//             <div className="mt-4 text-sm text-gray-700">
//           <h4 className='font-semibold'>Verification status</h4>
//           <p>{leader.status} </p>
//         </div>
//           )
//         }

        


//         {/* Contact Details */}
//         {leader.email && (
//           <div className="mt-4 text-sm">
//             <h4 className="font-semibold">Contact:</h4>
//             <p>Email: {leader.email}</p>
//           </div>
//         )}

//         {/* Bank Details */}
//         {(leader.accountName || leader.accountNumber || leader.bankName) && (
//           <div className="mt-4 text-sm">
//             <h4 className="font-semibold">Bank Details:</h4>
//             {leader.accountName && <p>Account Name: {leader.accountName}</p>}
//             {leader.accountNumber && <p>Account Number: {leader.accountNumber}</p>}
//             {leader.bankName && <p>Bank Name: {leader.bankName}</p>}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LleaderDetails;






import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const LleaderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [leader, setLeader] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('GENERAL'); // State for switching tabs

  useEffect(() => {
    if (!id) {
      setError("user id is not found");
    }

    axios.get(`${import.meta.env.VITE_API_URL2}/lleaderdetails/${id}`)
      .then((response) => {
        setLeader(response.data.user);
        setError(null);
      })
      .catch((error) => {
        setError('Failed to load profile. Please try again later.');
      });
  }, [id]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Reload
        </button>
      </div>
    );
  }

  if (!leader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="text-lg font-semibold mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col sm:flex-row mt-12 px-4'>
      {/* Sidebar */}
      <div className="w-full sm:w-1/3 p-4 bg-[#f5f0e1]  rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center">
          <img
            src={leader.profilePicture || 'https://via.placeholder.com/150'}
            alt={`${leader.firstname} ${leader.lastname}`}
            className="rounded-full w-24 h-24 object-cover mb-4"
          />
          <h3 className="font-bold text-xl text-[#1f1f7a]">{leader.title} {leader.firstname} {leader.lastname}</h3>
          <p className="text-gray-500">{leader.email}</p>
          <div className="flex space-x-2 mt-4">
            <button className="flex flex-col items-center">
              <i className="fas fa-home text-xl text-gray-500"></i>
              <span className="text-xs text-gray-500">Home</span>
            </button>
            <button className="flex flex-col items-center">
              <i className="fas fa-bell text-xl text-gray-500"></i>
              <span className="text-xs text-gray-500">Notifications</span>
            </button>
            <button className="flex flex-col items-center">
              <i className="fas fa-comment-dots text-xl text-gray-500"></i>
              <span className="text-xs text-gray-500">Messages</span>
            </button>
          </div>
          <Link to='/chat'>
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-full w-full">want to have a chat?</button>

          </Link>
         
          <button className="border border-blue-500 text-blue-500 px-4 py-2 mt-4 rounded-full w-full"    onClick={() => {
                navigate('/leaderpayment', {
                  state: {
                    bankName: leader.bankName,
                    accountNumber: leader.accountNumber,
                    accountName: leader.accountName,
                    email: leader.email,
                    amount: 1000 
                  }
                });
              }}>Book A video call session</button>

       
         

        </div>
      </div>

      {/* Main Profile Section */}
      <div className="w-full sm:w-2/3 p-4 bg-gray rounded-lg shadow-lg">
        <ul className="flex border-b mb-4">
          <li className="mr-6">
            <button
              onClick={() => setActiveTab('GENERAL')}
              className={`text-blue-600 pb-2 ${activeTab === 'GENERAL' ? 'border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              GENERAL
            </button>
          </li>
          <li className="mr-6">
            <button
              onClick={() => setActiveTab('ACCOUNT')}
              className={`text-blue-600 pb-2 ${activeTab === 'ACCOUNT' ? 'border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              ACCOUNT
            </button>
          </li>
        </ul>

        {activeTab === 'GENERAL' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600">First Name</label>
              <input type="text" value={leader.firstname} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">Last Name</label>
              <input type="text" value={leader.lastname} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">Unique Number</label>
              <input type="text" value={leader.uniqueNumber} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <input type="email" value={leader.email} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">Phone num</label>
              <input type="email" value={leader.phonenum} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">Country</label>
              <input type="text" value={leader.country} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">State</label>
              <input type="text" value={leader.state} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">LGA</label>
              <input type="text" value={leader.localGovtArea} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">Address</label>
              <input type="text" value={leader.address} className="w-full p-2 border rounded" readOnly />
            </div>
            {/* <div>
              <label className="text-gray-600">Address</label>
              <input type="text" value={leader.address} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">Country</label>
              <input type="text" value={leader.country} className="w-full p-2 border rounded" readOnly />
            </div> */}
            <div className="col-span-2">
              <label className="text-gray-600">Bio</label>
              <textarea value={leader.bio} className="w-full p-2 border rounded" readOnly></textarea>
            </div>
            
            <div>
              <label className="text-gray-600">Years of Ministration</label>
              <input type="text" value={leader.yearsInProfession} years className="w-full p-2 border rounded" readOnly />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600">Bank Name</label>
              <input type="text" value={leader.bankName} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">Account Number</label>
              <input type="text" value={leader.accountNumber} className="w-full p-2 border rounded" readOnly />
            </div>
            <div>
              <label className="text-gray-600">Account Name</label>
              <input type="text" value={leader.accountName} className="w-full p-2 border rounded" readOnly />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LleaderDetails;
