import express from "express";
import cors from 'cors';
import dotenv from "dotenv"
import connectDb from './db.js'
import colors from 'colors'
import router from "./routes/user.route.js";
import {ExpressPeerServer} from 'peer'
import path from 'path';
import http from "http";
import { server, app } from "./socket.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cloudinary from "cloudinary"
import multer from "multer";
import leaderrouter from "./routes/leader.route.js";

import paymentRoute from "./routes/paymentRoute.js";
import adminrouter from "./routes/admin.route.js";
import authRoute from "./routes/chat/authRoute.js"
import messageRoute from "./routes/chat/messageRoute.js"
import userChatRoute from ".//routes/chat/userChatRoute.js"
import reportrouter from "./routes/report.route.js";


dotenv.config();

const __dirname = path.resolve();

const peerServer = ExpressPeerServer(server, {
    debug: true,
    allow_discovery: true,
  });
app.use('/peerjs', peerServer);
// CORS configuration
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
app.use(cookieParser())
app.use(express.json());
app.use(express.static('public'));

app.use('/uploads',express.static(path.join(__dirname, '/client/index.html')));
app.use(morgan('dev'))
app.use('/api/users', router)
app.use('/api/leaders', leaderrouter)



app.use("/api", paymentRoute)
app.use("/api/admin", adminrouter)



//chat

app.use('/chat/auth', authRoute)
app.use('/chat/messages', messageRoute)
app.use('/chat/users', userChatRoute)

//report

app.use('/report', reportrouter)
// app.use('/report', (req, res)=>{
//   console.log('body', req.body)
// })



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Database connection
const startServer = async () => {
    try {
      await connectDb();
      console.log(`Database connected successfully`.bgYellow.black);
    } catch (error) {
      console.error(`Database connection failed`.bgRed.white, error);
      process.exit(1);
    }
  
    const port = process.env.PORT || 8000;
    server.listen(port, () => { // Use `server.listen` to include Socket.IO
      console.log(`Your app is listening on port ${port}`.bgGreen.black);
    });
  };
  
  startServer();
  
// Catch-all route for client-side routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
  