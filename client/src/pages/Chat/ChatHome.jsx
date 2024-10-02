import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const ChatHome = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen md:h-auto rounded-lg overflow-hidden bg-gray-100 shadow-lg mt-16">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <MessageContainer />
      </div>
    </div>
  );
};

export default ChatHome;
