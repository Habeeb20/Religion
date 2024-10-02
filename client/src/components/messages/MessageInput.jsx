import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      return;
    }

    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="flex items-center p-4 w-full bg-gray-100 rounded-lg shadow-md mt-40" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border text-sm rounded-lg flex-grow p-3 pr-10 bg-white border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        type="submit"
        className="ml-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300"
        aria-label="Send Message"
      >
        {loading ? (
          <div className="loader border-2 border-t-2 border-white rounded-full animate-spin w-6 h-6"></div>
        ) : (
          <BsSend className="text-2xl" />
        )}
      </button>
    </form>
  );
};

export default MessageInput;
