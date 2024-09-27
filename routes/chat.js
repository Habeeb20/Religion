import { verifyToken } from '../middleware/verifyToken.js'
import Chat from '../models/chat.model.js'
import express from "express"
import upload from '../upload.js'
import multer from 'multer'

const chatrouter = express.Router()

chatrouter.post('/message', verifyToken, async(req, res) => {
    const {sender,message,fileUrl} = req.body;
    try {
        const newMessage = new Chat({sender, message, fileUrl});
        await newMessage.save();
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({ message: 'Error saving message' });
    }
})


chatrouter.post('/upload', verifyToken, upload, (req, res) => {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ fileUrl });
})

export default chatrouter