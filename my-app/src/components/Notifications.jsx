// import React, { useContext } from 'react';
// import { Button } from '@material-ui/core';

// import { SocketContext } from '../Context';

// const Notifications = () => {
//   const { answerCall, call, callAccepted } = useContext(SocketContext);

//   return (
//     <>
//       {call.isReceivingCall && !callAccepted && (
//         <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//           <h1>{call.name} is calling:</h1>
//           <Button variant="contained" color="primary" onClick={answerCall}>
//             Answer
//           </Button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Notifications;










import React, { useContext } from 'react';
import { SocketContext } from '../context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 shadow-lg rounded-lg">
          <h1 className="text-lg font-semibold text-gray-700">{call.name} is calling:</h1>
          <button
            onClick={answerCall}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notifications;






