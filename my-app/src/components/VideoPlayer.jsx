import React, { useContext } from 'react';

import { SocketContext } from '../context';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center w-full">
        {/* My Video */}
        {stream && (
          <div className="bg-white shadow-lg border-2 border-black rounded-lg p-4 w-full mx-auto">
            <h5 className="text-lg font-semibold mb-2">{name || 'Name'}</h5>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="w-full max-w-[550px] h-auto rounded-lg border-2 border-gray-300"
            />
          </div>
        )}

        {/* User's Video */}
        {callAccepted && !callEnded && (
          <div className="bg-white shadow-lg border-2 border-black rounded-lg p-4 w-full mx-auto">
            <h5 className="text-lg font-semibold mb-2">{call.name || 'Name'}</h5>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="w-full max-w-[550px] h-auto rounded-lg border-2 border-gray-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
