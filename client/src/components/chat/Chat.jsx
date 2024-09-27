import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { AiOutlineSend, AiOutlineFile } from 'react-icons/ai';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('your_token_key');

    if (token) {
      // Create the socket connection with the token
      const newSocket = io(`${import.meta.env.VITE_API}`, {
        query: { token }
      });
      setSocket(newSocket);

      return () => {
        // Clean up the socket connection when the component unmounts
        newSocket.disconnect();
      };
    } else {
      console.error("Token not found. Please ensure you're logged in.");
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('userList', (userList) => {
        setUsers(userList);
      });

      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on('receiveFile', (fileData) => {
        setMessages((prev) => [...prev, { type: 'file', content: fileData }]);
      });

      socket.on('userTyping', (user) => {
        setTyping(`${user.name} is typing...`);
      });

      socket.on('userStoppedTyping', () => {
        setTyping('');
      });

      return () => {
        socket.off('userList');
        socket.off('message');
        socket.off('receiveFile');
        socket.off('userTyping');
        socket.off('userStoppedTyping');
      };
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (newMessage.trim() || fileUrl) {
      const sender = 'Your Name';
      const messageData = { sender, message: newMessage, fileUrl: fileUrl || undefined };

      // Emit message
      if (socket) {
        socket.emit('newMessage', messageData);
      }

      // Clear message input
      setNewMessage('');
      setFileUrl('');
      setFile(null);
    }
  };

  const sendFile = (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = { name: file.name, data: reader.result };
        if (socket) {
          socket.emit('sendFile', fileData);
        }
        setFile(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL3}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFileUrl(response.data.fileUrl);
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing', { name: 'YourUserName' }); // Send typing event
      setTimeout(() => {
        socket.emit('stopTyping'); // Stop typing event after 2 seconds
      }, 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
      <div>
        <h4>Active Users:</h4>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
      <div className="h-80 overflow-y-scroll p-4 border border-gray-200 rounded">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="mb-3">
              <p><strong>{msg.sender}:</strong> {msg.message}</p>
              {msg.fileUrl && <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">View File</a>}
            </div>
          ))
        ) : (
          <p>No messages</p>
        )}
        {typing && <div>{typing}</div>} {/* Display typing status */}
      </div>

      <div className="flex mt-4 items-center">
        <input
          type="text"
          className="flex-grow p-2 border rounded mr-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleTyping} // Trigger typing event on key press
        />
        <input type="file" id="fileInput" onChange={handleFileUpload} className="hidden" />
        <label htmlFor="fileInput">
          <AiOutlineFile className="text-2xl cursor-pointer mr-2" />
        </label>
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-full">
          <AiOutlineSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
