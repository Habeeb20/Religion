import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { FaPaperPlane, FaFile } from 'react-icons/fa';
import { AiOutlineSend, AiOutlineFile } from 'react-icons/ai';

const token = localStorage.getItem('your_token_key'); // Define your token
const socket = io(`${import.meta.env.VITE_API}`, {
    query: { token }
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState('');

  useEffect(() => {
    socket.on('userList', (userList) => {
      setUsers(userList);
    });

    return () => socket.off('userList');
  }, []);

  useEffect(() => {
    let typingTimeout;

    const handleTyping = () => {
      socket.emit('typing', { name: 'YourUserName' });
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        socket.emit('stopTyping');
      }, 2000);
    };

    return () => clearTimeout(typingTimeout);
  }, [messages]);

  useEffect(() => {
    socket.on('userTyping', (user) => {
      setTyping(`${user.name} is typing...`);
    });

    socket.on('userStoppedTyping', () => {
      setTyping('');
    });

    return () => {
      socket.off('userTyping');
      socket.off('userStoppedTyping');
    };
  }, []);

  useEffect(() => {
    // Fetch existing messages
    axios.get(`${import.meta.env.VITE_API_URL3}/message`)
      .then((response) => setMessages(response.data))
      .catch((err) => console.error(err));

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('receiveFile', (fileData) => {
        setMessages((prev) => [...prev, { type: 'file', content: fileData }]);
    });

    return () => socket.off('message');
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() || fileUrl) {
      const sender = 'Your Name'; 
      const messageData = { sender, message: newMessage, fileUrl: fileUrl || undefined };

      // Emit message
      socket.emit('newMessage', messageData);

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
        socket.emit('sendFile', fileData);
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

  const notifyUser = (message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('New Message', {
        body: message,
      });
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      if (document.hidden) {  // If the page is not active
        notifyUser(msg);
      }
    });
  }, []);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

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
        {messages.map((msg, index) => (
          <div key={index} className="mb-3">
            <p><strong>{msg.sender}:</strong> {msg.message}</p>
            {msg.fileUrl && <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">View File</a>}
          </div>
        ))}
        {typing && <div>{typing}</div>} {/* Display typing status */}
      </div>

      <div className="flex mt-4 items-center">
        <input
          type="text"
          className="flex-grow p-2 border rounded mr-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={handleTyping} // Add this for typing indication
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
