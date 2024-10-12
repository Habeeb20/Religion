import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174",  "http://localhost:3000",  "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

const userSocketMap = {}; 


export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};


///testing video
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle offer
  socket.on('offer', (data) => {
    io.to(data.target).emit('offer', { sdp: data.sdp, caller: socket.id });
  });

  // Handle answer
  socket.on('answer', (data) => {
    io.to(data.caller).emit('answer', data.sdp);
  });

  // Handle ICE candidates
  socket.on('ice-candidate', (data) => {
    io.to(data.target).emit('ice-candidate', data.candidate);
  });
})



io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.emit("getOnlineUsers", socket.id);

  socket.on('disconnect', () => {
    console.log("User disconnected:", socket.id);
  
    socket.emit("call ended")
  });

  socket.on('newMessage', async (data) => {
    const newMessage = new Chat({
      sender: data.sender,
      message: data.message,
      fileUrl: data.fileUrl || '',
    });
    await newMessage.save();
    io.emit('message', newMessage);
  });

 

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    const receiverSocketId = userSocketMap[userToCall];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("callUser", { signal: signalData, from, name });
    }
  });

  socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
 
  });



  
})



export { app, server, io };



























































































// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import jwt from "jsonwebtoken";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:3001"],
//     methods: ["GET", "POST"],
//   },
// });

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// const userSocketMap = {};


// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId;


//   // if (userSocketMap[userId]) {
//   //   console.log(`User ${userId} is already connected with socket ID: ${userSocketMap[userId]}`);
   
//   // }


//   userSocketMap[userId] = socket.id;
//   console.log("A user connected:", socket.id);

//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on('newMessage', async (data) => {
//     const newMessage = new Chat({
//       sender: data.sender,
//       message: data.message,
//       fileUrl: data.fileUrl || '',
//     });
//     await newMessage.save();
//     io.emit('message', newMessage);
//   });

//   socket.on('typing', (user) => {
//     socket.broadcast.emit('userTyping', user);
//   });

//   socket.on('stopTyping', () => {
//     socket.broadcast.emit('userStoppedTyping');
//   });

//   socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//     const receiverSocketId = userSocketMap[userToCall];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("callUser", { signal: signalData, from, name });
//     }
//   });

//   socket.on("answerCall", (data) => {
//     const callerSocketId = userSocketMap[data.to];
//     if (callerSocketId) {
//       io.to(callerSocketId).emit("callAccepted", data.signal);
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log("User disconnected:", socket.id);
//     delete userSocketMap[userId]; 
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });

//   socket.on('join_interview', (interviewId) => {
//     socket.join(interviewId);
//     console.log(`User ${socket.id} joined room ${interviewId}`);
//   });
  
//   socket.on('send_message', ({ interviewId, message }) => {
//     io.to(interviewId).emit('receive_message', message);
//   });

//   socket.on('leave_interview', (interviewId) => {
//     socket.leave(interviewId);
//   });
// });

// export { app, server, io };
