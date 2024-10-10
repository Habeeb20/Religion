import React, { useState, useContext } from 'react';
import { SocketContext } from '../context';

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <div className="flex flex-col items-center w-full md:w-[600px] mt-8 mb-8 px-4">
      <div className="shadow-lg border-2 border-black p-5 w-full rounded-lg">
        <form className="w-full space-y-6">
          <div className="flex flex-col md:flex-row w-full space-y-6 md:space-y-0">
            {/* Account Info Section */}
            <div className="flex-1 md:pr-4">
              <h6 className="text-lg mb-2 font-semibold">Account Info</h6>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {}}
                className="w-full mt-5 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors">
                <span className="mr-2">Copy Your ID</span>
              </button>
            </div>

            {/* Make a Call Section */}
            <div className="flex-1 md:pl-4">
              <h6 className="text-lg mb-2 font-semibold">Make a Call</h6>
              <input
                type="text"
                placeholder="ID to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {callAccepted && !callEnded ? (
                <button
                  onClick={leaveCall}
                  className="w-full mt-5 py-2 bg-red-500 text-white rounded-md flex items-center justify-center hover:bg-red-600 transition-colors">
                  <span className="mr-2">Hang Up</span>
                </button>
              ) : (
                <button
                  onClick={() => callUser(idToCall)}
                  className="w-full mt-5 py-2 bg-blue-500 text-white rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="mr-2">Call</span>
                </button>
              )}
            </div>
          </div>
        </form>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
