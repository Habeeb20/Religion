import React from "react"
import Conversation from "./Conversation"
import useGetConversations from "../../hooks/useGetConversations"

const Conversations = () => {
  const { loading, conversations } = useGetConversations()

  // Check if conversations is an array
  const conversationList = Array.isArray(conversations) ? conversations : []

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversationList.map((conversation, index) => (
       
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={index === conversationList.length - 1} // Fix here as well
        />
      ))}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  )
}

export default Conversations
