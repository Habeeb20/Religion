import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { BiPhone, BiPhoneIncoming } from 'react-icons/bi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdCancel } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);

function Video() {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [idToCall, setIdToCall] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [openChat, setOpenChat] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');
  const { interviewId } = useParams();

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        console.log('Stream obtained:', currentStream);
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    socket.on('getOnlineUsers', (id) => {
      console.log('Connected user ID:', id);
      setMe(id);
    });

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      console.log('Call received from:', from, 'Caller name:', callerName);
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });

    return () => {
      socket.off('getOnlineUsers');
      socket.off('callUser');
    };
  }, []);

  useEffect(() => {
    console.log('Joining interview room:', interviewId);
    socket.emit('join_interview', interviewId);

    socket.on('receive_message', (message) => {
      console.log('Message received:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      console.log('Leaving interview room:', interviewId);
      socket.emit('leave_interview', interviewId);
      socket.off('receive_message');
    };
  }, [interviewId]);

  const sendMessage = () => {
    if (inputMessage !== '') {
      const messageData = {
        author: name,
        message: inputMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };
      console.log('Sending message:', messageData);
      socket.emit('send_message', { interviewId, message: messageData });
      setInputMessage('');
    } else {
      console.log('Input message is empty, not sending.');
    }
  };

  const answerCall = () => {
    if (!call.signal) {
      console.error('No call signal to answer.');
      return;
    }
    console.log('Answering call from:', call.from);
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log('Sending signal to:', call.from);
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      console.log('Receiving stream');
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.on('error', (err) => {
      console.error('Peer error:', err);
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    if (!id) {
      console.error('No user ID to call.');
      return;
    }
    console.log('Calling user:', id);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log('Signal sent to:', id);
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    socket.on('callAccepted', (signal) => {
      console.log('Call accepted, signaling peer');
      setCallAccepted(true);
      peer.signal(signal);
    });

    peer.on('stream', (currentStream) => {
      console.log('Receiving user stream');
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.on('error', (err) => {
      console.error('Peer error:', err);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    console.log('Ending call');
    setCallEnded(true);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    window.location.reload();
  };

  const handleChat = () => {
    console.log('Toggling chat:', !openChat);
    setOpenChat((prev) => !prev);
  };

  return (
    <div className="w-screen overflow-hidden h-screen border-2 border-gray-400">
      {/* -------interviewer stream------ */}
      <div className="w-full h-full relative flex items-center justify-center gap-5 bg-gray-950">
        {stream && (
          <div className="border-orange-400 text-center w-36 h-36 absolute top-0 right-0">
            <video className="" playsInline muted ref={myVideo} autoPlay />
            <h2 className="bg-[rgba(255,_255,_255,_0.2)] rounded-xl [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[1px] border-[rgba(255,255,255,0.3)] text-white">
              {name || 'Name'}
            </h2>
          </div>
        )}
        {/* -------interviewee stream------ */}
        <div className="bg-cover bg-gray-950 block w-screen h-screen">
          {callAccepted && !callEnded && (
            <video className="block w-screen h-screen" playsInline ref={userVideo} autoPlay />
          )}

          {!callAccepted && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <button
                className="flex items-center justify-center gap-2 text-xl px-4 py-2 bg-red-400 text-white rounded-full"
                onClick={answerCall}
              >
                <BiPhoneIncoming /> Answer
              </button>
            </div>
          )}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="absolute flex flex-col gap-20 items-center justify-center top-0 left-0 text-center w-1/4 h-full bg-[rgba(255,_255,_255,_0.2)] rounded-xl [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[5px] border-[rgba(255,255,255,0.3)] py-4"
          >
            <div className="flex flex-col items-center justify-start w-3/4 gap-2">
              <label className="text-center font-semibold text-white text-xl" htmlFor="name">
                Account Info
              </label>
              <input
                className="mx-auto w-full rounded-sm py-2 bg-transparent border-b-2 text-gray-100 px-2 bg-blue-300 outline-none"
                id="name"
                value={name}
                placeholder="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <CopyToClipboard text={me}>
                <button className="bg-gray-700 p-2 px-4 rounded-sm text-white w-full">Copy your Id</button>
              </CopyToClipboard>
            </div>
            {callAccepted && !callEnded ? (
              <button className="bg-red-500 p-2 px-4 rounded-sm text-white w-full" onClick={leaveCall}>
                Hang Up
              </button>
            ) : (
              <div className="flex flex-col items-center justify-start w-3/4 gap-2">
                <label className="text-center font-semibold text-white text-xl">Make a call</label>
                <input
                  className="mx-auto w-full py-2 bg-transparent border-b-2 text-gray-100 px-2 bg-blue-300 outline-none"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  placeholder="Enter Id"
                />
                <button
                  className="bg-gray-700 p-2 px-4 rounded-sm text-white w-full"
                  onClick={() => callUser(idToCall)}
                >
                  <BiPhone /> Call
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Video;
