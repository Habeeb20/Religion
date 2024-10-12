import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';


const socket = io('http://localhost:8000');

const VideoCall = () => {
  const [peerConnection, setPeerConnection] = useState(null);
  const [myId, setMyId] = useState(''); 
  const [otherUserId, setOtherUserId] = useState('');
  const [callStatus, setCallStatus] = useState(''); 
  const [incomingCall, setIncomingCall] = useState(false); 
  const [callerId, setCallerId] = useState(''); 

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
  
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
      ],
    });

    //I used this to Access user's media (camera and microphone)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
    });

    //I used this to Handle ICE candidates (network information exchange)
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', {
          target: otherUserId,
          candidate: event.candidate,
        });
      }
    };

    //i used this to  Handle remote stream (when you receive the other user's video)
    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
      setCallStatus('Call Connected');
    };

    // I used this to Receive offer from another peer
    socket.on('offer', async (data) => {
      setCallerId(data.caller);
      setIncomingCall(true);
    });

    //I used this to Receive answer from the other peer
    socket.on('answer', (answer) => {
      pc.setRemoteDescription(new RTCSessionDescription(answer));
      setCallStatus('Call Connected');
    });

    //this  Receive ICE candidate from the other peer
    socket.on('ice-candidate', (candidate) => {
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    //this is to Handle when the other user ends the call
    socket.on('call-ended', () => {
      pc.close();
      setCallStatus('Call Ended');
      alert('The other user has ended the call.');
    });

    setPeerConnection(pc);

    // Generate and set unique user ID
    socket.on('connect', () => {
      setMyId(socket.id);
    });

  }, [otherUserId]);


  const createOffer = async () => {
    setCallStatus('Calling...');
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit('offer', { sdp: offer, target: otherUserId, caller: myId });
  };


  const acceptCall = async () => {
    setIncomingCall(false);
    setCallStatus('Call Connected');
    const pc = peerConnection;
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit('answer', { sdp: answer, caller: callerId });
  };


  const hangUp = () => {
    if (peerConnection) {
      peerConnection.close();
      socket.emit('end-call', { target: otherUserId });
      setCallStatus('Call Ended');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Video Call App</h1>

        {/* Display your ID */}
        <div className="mb-4">
          <span className="font-bold">Your ID: </span> 
          <span className="text-blue-500">{myId}</span>
        </div>

    
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder="Enter User ID to call"
          value={otherUserId}
          onChange={(e) => setOtherUserId(e.target.value)}
        />

     
        <button
          onClick={createOffer}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4"
        >
          Start Call
        </button>

   
        {callStatus && (
          <div className="text-center mb-4 text-lg font-semibold text-gray-700">
            {callStatus}
          </div>
        )}

    
        {incomingCall && (
          <div className="bg-yellow-100 p-4 rounded-lg text-center mb-4">
            <p className="mb-2">Incoming call from: {callerId}</p>
            <button
              onClick={acceptCall}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Accept
            </button>
            <button
              onClick={() => setIncomingCall(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        )}

    
        <div className="flex justify-between mb-4">
          <video ref={localVideoRef} autoPlay muted className="w-1/2 rounded-lg shadow" />
          <video ref={remoteVideoRef} autoPlay className="w-1/2 rounded-lg shadow" />
        </div>

   
        {callStatus === 'Call Connected' && (
          <button
            onClick={hangUp}
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            End Call
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;

















// import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:8000');

// const VideoCall = () => {
//   const [peerConnection, setPeerConnection] = useState(null);
//   const [myId, setMyId] = useState(''); // Your ID
//   const [otherUserId, setOtherUserId] = useState(''); // The ID of the user you are calling
//   const [callStatus, setCallStatus] = useState(''); // Status of the call
//   const [incomingCall, setIncomingCall] = useState(false); // Incoming call state
//   const [callerId, setCallerId] = useState(''); // Caller ID
//   const [callAccepted, setCallAccepted] = useState(false); // Call accepted state
//   const [callDuration, setCallDuration] = useState(0); // Duration of the call

//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const timerRef = useRef(); // For call duration timer

//   useEffect(() => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//     });

//     // Access local media (video and audio)
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach((track) => pc.addTrack(track, stream));
//     });

//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit('ice-candidate', {
//           target: otherUserId,
//           candidate: event.candidate,
//         });
//       }
//     };

//     // Handle remote stream from peer
//     pc.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     socket.on('offer', async (data) => {
//       setCallerId(data.caller);
//       setIncomingCall(true);
//       setCallStatus('Incoming call...');
//     });

//     socket.on('answer', (answer) => {
//       pc.setRemoteDescription(new RTCSessionDescription(answer));
//       setCallStatus('Call Connected');
//       setCallAccepted(true);
//       startCallTimer();
//     });

//     socket.on('ice-candidate', (candidate) => {
//       pc.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     // Handle call rejection
//     socket.on('call-rejected', () => {
//       setCallStatus('Call Rejected');
//       setIncomingCall(false);
//     });

//     // Handle when the other user ends the call
//     socket.on('call-ended', () => {
//       endCall('Call Ended by the other user');
//     });

//     setPeerConnection(pc);

//     socket.on('connect', () => {
//       setMyId(socket.id);
//     });

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [otherUserId]);

//   // Start call timer
//   const startCallTimer = () => {
//     timerRef.current = setInterval(() => {
//       setCallDuration((prev) => prev + 1);
//     }, 1000);
//   };

//   // Format call duration in minutes and seconds
//   const formatDuration = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   // Create an offer to start the call
//   const createOffer = async () => {
//     setCallStatus('Calling...');
//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);
//     socket.emit('offer', { sdp: offer, target: otherUserId, caller: myId });
//   };

//   // Accept the incoming call
//   const acceptCall = async () => {
//     setIncomingCall(false);
//     const pc = peerConnection;
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);
//     socket.emit('answer', { sdp: answer, caller: callerId });
//     setCallStatus('Call Connected');
//     setCallAccepted(true);
//     startCallTimer();
//   };

//   // Hang up the call
//   const hangUp = () => {
//     if (peerConnection) {
//       peerConnection.close();
//       socket.emit('end-call', { target: otherUserId });
//       endCall('Call Ended');
//     }
//   };

//   // End the call and clear state
//   const endCall = (statusMessage) => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     setCallStatus(statusMessage);
//     setCallAccepted(false);
//     setCallDuration(0);
//     setIncomingCall(false);
//     alert(statusMessage);
//   };

//   // Reject the incoming call
//   const rejectCall = () => {
//     socket.emit('reject-call', { target: callerId });
//     setIncomingCall(false);
//     setCallStatus('Call Rejected');
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h1 className="text-2xl font-bold text-center mb-4">Video Call App</h1>

//         {/* Display your ID */}
//         <div className="mb-4">
//           <span className="font-bold">Your ID: </span> 
//           <span className="text-blue-500">{myId}</span>
//         </div>

//         {/* Input for the other user ID */}
//         <input
//           type="text"
//           className="border border-gray-300 p-2 rounded w-full mb-4"
//           placeholder="Enter User ID to call"
//           value={otherUserId}
//           onChange={(e) => setOtherUserId(e.target.value)}
//         />

//         {/* Button to start the call */}
//         <button
//           onClick={createOffer}
//           className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4"
//         >
//           Start Call
//         </button>

//         {/* Display call status */}
//         {callStatus && (
//           <div className="text-center mb-4 text-lg font-semibold text-gray-700">
//             {callStatus}
//           </div>
//         )}

//         {/* Display call duration if call is accepted */}
//         {callAccepted && (
//           <div className="text-center mb-4 text-lg font-semibold text-gray-700">
//             Duration: {formatDuration(callDuration)}
//           </div>
//         )}

//         {/* Notification for incoming call */}
//         {incomingCall && (
//           <div className="bg-yellow-100 p-4 rounded-lg text-center mb-4">
//             <p className="mb-2">Incoming call from: {callerId}</p>
//             <button
//               onClick={acceptCall}
//               className="bg-green-500 text-white px-4 py-2 rounded mr-2"
//             >
//               Accept
//             </button>
//             <button
//               onClick={rejectCall}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Reject
//             </button>
//           </div>
//         )}

//         {/* Local and remote video displays */}
//         <div className="flex justify-between mb-4">
//           <video ref={localVideoRef} autoPlay muted className="w-1/2 rounded-lg shadow" />
//           <video ref={remoteVideoRef} autoPlay className="w-1/2 rounded-lg shadow" />
//         </div>

//         {/* Hang up button */}
//         {callAccepted && (
//           <button
//             onClick={hangUp}
//             className="bg-red-500 text-white px-4 py-2 rounded w-full"
//           >
//             End Call
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoCall;




























































// export default VideoCall;
// import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';

// // Connect to the backend socket server
// const socket = io('http://localhost:8000');

// const VideoCall = () => {
//   const [peerConnection, setPeerConnection] = useState(null);
//   const [myId, setMyId] = useState(''); // Unique ID for the current user
//   const [otherUserId, setOtherUserId] = useState(''); // ID of the user to call
//   const [callStatus, setCallStatus] = useState(''); // To show the call status
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();

//   useEffect(() => {
//     // Create a new RTCPeerConnection instance
//     const pc = new RTCPeerConnection({
//       iceServers: [
//         { urls: 'stun:stun.l.google.com:19302' },
//       ],
//     });

//     // Access user's media (camera and microphone)
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       localVideoRef.current.srcObject = stream;
//       stream.getTracks().forEach(track => pc.addTrack(track, stream));
//     });

//     // Handle ICE candidates (network information exchange)
//     pc.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit('ice-candidate', {
//           target: otherUserId,
//           candidate: event.candidate,
//         });
//       }
//     };

//     // Handle remote stream (when you receive the other user's video)
//     pc.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//       setCallStatus('Call Connected');
//     };

//     // Receive offer from another peer
//     socket.on('offer', async (data) => {
//       setCallStatus('Receiving Call...');
//       await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socket.emit('answer', { sdp: answer, caller: data.caller });
//       setCallStatus('Call Connected');
//     });

//     // Receive answer from the other peer
//     socket.on('answer', (answer) => {
//       pc.setRemoteDescription(new RTCSessionDescription(answer));
//       setCallStatus('Call Connected');
//     });

//     // Receive ICE candidate from the other peer
//     socket.on('ice-candidate', (candidate) => {
//       pc.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     setPeerConnection(pc);

//     // Generate and set unique user ID
//     socket.on('connect', () => {
//       setMyId(socket.id);
//     });

//   }, [otherUserId]);

//   // Function to initiate a call
//   const createOffer = async () => {
//     setCallStatus('Calling...');
//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);
//     socket.emit('offer', { sdp: offer, target: otherUserId });
//   };

//   // Function to hang up the call
//   const hangUp = () => {
//     if (peerConnection) {
//       peerConnection.close();
//       setCallStatus('Call Ended');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h1 className="text-2xl font-bold text-center mb-4">Video Call App</h1>

//         {/* Display your ID */}
//         <div className="mb-4">
//           <span className="font-bold">Your ID: </span> 
//           <span className="text-blue-500">{myId}</span>
//         </div>

//         {/* Input field for the other user's ID */}
//         <input
//           type="text"
//           className="border border-gray-300 p-2 rounded w-full mb-4"
//           placeholder="Enter User ID to call"
//           value={otherUserId}
//           onChange={(e) => setOtherUserId(e.target.value)}
//         />

//         {/* Button to start the call */}
//         <button
//           onClick={createOffer}
//           className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4"
//         >
//           Start Call
//         </button>

//         {/* Display the call status */}
//         {callStatus && (
//           <div className="text-center mb-4 text-lg font-semibold text-gray-700">
//             {callStatus}
//           </div>
//         )}

//         {/* Local and Remote video elements */}
//         <div className="flex justify-between mb-4">
//           <video ref={localVideoRef} autoPlay muted className="w-1/2 rounded-lg shadow" />
//           <video ref={remoteVideoRef} autoPlay className="w-1/2 rounded-lg shadow" />
//         </div>

//         {/* Button to hang up the call */}
//         {callStatus === 'Call Connected' && (
//           <button
//             onClick={hangUp}
//             className="bg-red-500 text-white px-4 py-2 rounded w-full"
//           >
//             End Call
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoCall;
