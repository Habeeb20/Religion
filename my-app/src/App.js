import React,{useState, useEffect} from 'react'
import Video from './Video'
import { io } from 'socket.io-client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

const socket = io('http://localhost:8000')
const App = () => {
 
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.on('notification', (data) => {
      alert(data.message); 
    });

    socket.on('meeting_notification', (meetingDetails) => {
      alert('you have a new meeting scheduled: ${meetingDetails}')
    })

    return () => {
      socket.off('connect');
      socket.off('notification');
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/video" element={<Video />} />
      </Routes>
    </Router>
   
  )
}

export default App










// import React from 'react';
// import VideoPlayer from './components/VideoPlayer';
// import Sidebar from './components/Sidebar';
// import Notifications from './components/Notifications';

// const App = () => {
//   return (
//     <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg border-2 border-gray-300 rounded-lg mt-10 mb-6 mx-auto flex flex-row justify-center items-center w-full max-w-4xl p-4 sm:p-6">
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center">Video Chat</h2>
//       </div>
//       <div className="w-full flex flex-col lg:flex-row lg:space-x-6 items-start px-4">
//         <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
//           <VideoPlayer />
//         </div>
//         <div className="w-full lg:w-1/3">
//           <Sidebar>
//             <Notifications />
//           </Sidebar>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;




