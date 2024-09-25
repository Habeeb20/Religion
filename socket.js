

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

// Initialize the socket.io instance first before assigning it to `req`
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"], // Ensure this is your frontend's correct address
    methods: ["GET", "POST"],
  },
});

// Middleware to attach io to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

const userSocketMap = {}; // Holds the mapping of userId to socketId

// Helper function to get the receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Retrieve the user ID from the socket's handshake query
  const userId = socket.handshake.query.userId;

  // If a valid userId is provided
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id; // Store the socket ID associated with the user ID
  }

  // Emit the list of online users (IDs) to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId]; // Remove the user from the map
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Update the list of online users
  });

  // Listen for callUser events from clients
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    const receiverSocketId = userSocketMap[userToCall]; // Get the socket ID of the user to call
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("callUser", { signal: signalData, from, name });
    }
  });

  // Listen for answerCall events from clients
  socket.on("answerCall", (data) => {
    const callerSocketId = userSocketMap[data.to]; // Get the socket ID of the caller
    if (callerSocketId) {
      io.to(callerSocketId).emit("callAccepted", data.signal);
    }
  });
});

export { app, server, io };
