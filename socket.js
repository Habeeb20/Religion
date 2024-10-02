import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

const userSocketMap = {}; // Holds the mapping of userId to socketId and can include names if necessary


export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};


// Middleware to handle authentication
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if (token) {
    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.user = decoded; // Attach user info
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  // If a valid userId is provided
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id; // Store the socket ID associated with the user ID
  }

  // Emit the list of online users (IDs) to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on('newMessage', async (data) => {
    const newMessage = new Chat({
      sender: data.sender,
      message: data.message,
      fileUrl: data.fileUrl || '',
    });
    await newMessage.save();
    io.emit('message', newMessage);
  });

  socket.on('typing', (user) => {
    socket.broadcast.emit('userTyping', user);
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('userStoppedTyping');
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    const receiverSocketId = userSocketMap[userToCall];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("callUser", { signal: signalData, from, name });
    }
  });

  socket.on("answerCall", (data) => {
    const callerSocketId = userSocketMap[data.to];
    if (callerSocketId) {
      io.to(callerSocketId).emit("callAccepted", data.signal);
    }
  });

  socket.on('disconnect', () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId]; // Remove the user from the map
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update the list of online users
  });
});



export { app, server, io };
