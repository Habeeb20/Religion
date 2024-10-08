import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { BiPhone, BiPhoneIncoming } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdCancel } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

function Video() {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [idToCall, setIdToCall] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
//   const currentUser = useSelector(state => state.user.currentUser);

  const [openChat, setOpenChat] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [message, setMessage] = useState([]);
  const [room, setRoom] = useState('');
  const { interviewId } = useParams();

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  // Get user media and initialize video stream
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });

    return () => {
      socket.off('me');
      socket.off('callUser');
    };
  }, []);

  // Handle chat connection for the interview room
  useEffect(() => {
    socket.emit('join_interview', interviewId);

    socket.on('receive_message', (message) => {
      setMessage((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit('leave_interview', interviewId);
      socket.off('receive_message');
    };
  }, [interviewId]);

  // Send message in the chat
  const sendMessage = () => {
    if (inputMessage !== '') {
      const messageData = {
        author: name,
        message: inputMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      };
      socket.emit('send_message', { interviewId, message: messageData });
      setInputMessage('');
    }
  };

  // Answer incoming call
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  // Call a user
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    peer.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    connectionRef.current = peer;
  };

  // Leave call
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  // Toggle chat box
  const handleChat = () => {
    setOpenChat(!openChat);
  };

  return (
    <div className='w-screen h-screen relative'>
      {/* -------interviewer stream------ */}
      <div className='flex items-center justify-center h-full bg-gray-950'>
        {stream && (
          <div className='absolute top-0 right-0 w-36 h-36'>
            <video className="w-full h-full" playsInline muted ref={myVideo} autoPlay />
            <h2 className='text-white'>{name || 'Name'}</h2>
          </div>
        )}

        {/* -------interviewee stream------ */}
        <div className='w-full h-full'>
          {callAccepted && !callEnded && (
            <video className="w-full h-full" playsInline ref={userVideo} autoPlay />
          )}
        </div>

        {/* Call and Chat UI */}
        <div className='absolute top-0 left-0 w-1/4 h-full flex flex-col items-center justify-center bg-gray-800 p-4'>
          <div className='w-full mb-4'>
            <label className='text-white mb-2 block'>Account Info</label>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 bg-gray-700 text-white'
            />
            <CopyToClipboard text={me}>
              <button className='w-full bg-gray-700 p-2 mt-2 text-white'>Copy your ID</button>
            </CopyToClipboard>
          </div>

          {call.isReceivedCall && !callAccepted && (
            <button className='bg-green-500 p-2 w-full text-white' onClick={answerCall}>
              <BiPhoneIncoming /> Answer
            </button>
          )}

          <div className='w-full'>
            <input
              type='text'
              placeholder='Id to call'
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              className='w-full p-2 bg-gray-700 text-white'
            />
            <button onClick={handleChat} className={`w-full p-2 mt-2 ${!openChat ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
              {!openChat ? 'Open Chat' : 'Close Chat'}
            </button>

            {callAccepted && !callEnded ? (
              <button className='w-full bg-red-500 p-2 mt-2 text-white' onClick={leaveCall}>Hang Up</button>
            ) : (
              <button className='w-full bg-gray-700 p-2 mt-2 text-white' onClick={() => callUser(idToCall)}>
                <BiPhone /> Call
              </button>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`absolute bottom-10 right-5 w-1/3 h-2/3 bg-gray-300 p-4 ${openChat ? 'block' : 'hidden'}`}>
          <MdCancel className='text-red-500 cursor-pointer' onClick={handleChat} />
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
              {message.map((msg, index) => (
                <div key={index} className={`p-2 my-2 rounded ${msg.author === name ? 'bg-blue-200 ml-auto' : 'bg-gray-200'}`}>
                  <strong>{msg.author}</strong>: {msg.message}
                  <small className="block text-gray-500">{msg.time}</small>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <button
                onClick={() => {
                  const messageData = {
                    author: name,
                    message: `My ID is: ${me}`,
                    time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
                  };
                  socket.emit('send_message', { interviewId, message: messageData });
                }}
                className="w-full mb-2 bg-green-500 p-2 text-white rounded"
              >
                Send Your ID
              </button>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-grow p-2 border border-gray-500"
                />
                <button onClick={sendMessage} className="bg-blue-500 p-2 text-white">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
