import React, { useEffect } from "react";
import userAvatar from "../../assets/user.png";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import useUnreadCount from "../../hooks/useUnreadCount";
import useMarkMessagesAsRead from "../../hooks/useMarkMessagesAsRead";

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const unreadCount = useUnreadCount(conversation._id); // Fetch unread message count
  const markMessagesAsRead = useMarkMessagesAsRead(conversation._id);

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleClick = () => {
    setSelectedConversation(conversation);
    markMessagesAsRead(); // Mark messages as read when conversation is selected
  };

  return (
    <>
      <div
        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:bg-blue-600 hover:shadow-lg ${
          isSelected ? "bg-blue-800 shadow-lg text-white" : "bg-white"
        }`}
        onClick={handleClick}
      >
        {/* Profile Picture with online indicator */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={conversation.profilePic || userAvatar}
              alt={`${conversation.username}'s avatar`}
              className="object-cover w-full h-full"
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        {/* Conversation Details */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center">
            <p
              className={`font-semibold text-lg ${
                isSelected ? "text-white" : "text-gray-800"
              }`}
            >
              {conversation.username}
            </p>
            {/* Unread Messages Counter */}
            {unreadCount > 0 && (
              <span
                className={`text-xs font-bold rounded-full px-2 py-1 ${
                  isSelected
                    ? "bg-white text-blue-600"
                    : "bg-red-500 text-white"
                }`}
              >
                {unreadCount}
              </span>
            )}
          </div>
          <p
            className={`text-sm truncate ${
              isSelected ? "text-gray-200" : "text-gray-600"
            }`}
          >
            {conversation.lastMessage || "No messages yet..."}
          </p>
        </div>
      </div>

      {/* Divider Line */}
      {!lastIndex && <div className="border-t my-1 border-gray-300"></div>}
    </>
  );
};

export default Conversation;
