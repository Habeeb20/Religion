import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    const conversation = conversations.find((conversation) =>
      conversation.username.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found with this username");
    }
  };

  return (
    <form className="flex items-center gap-4 mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a conversation..."
        className="input input-bordered w-full px-4 py-2 text-gray-700 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        type="submit"
        className="btn btn-circle bg-blue-800 hover:bg-blue-600 text-white p-2 shadow-md transition-all duration-200 flex items-center justify-center rounded-full"
      >
        <IoSearchSharp className="w-6 h-6" />
      </button>
    </form>
  );
};

export default SearchInput;
