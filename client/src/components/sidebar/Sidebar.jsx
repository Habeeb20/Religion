import React from "react";
import SearchInput from "./SearchInput";
import Coversations from "./Coversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className="bg-white text-indigo-600 shadow-lg rounded-lg p-6 w-64 h-screen flex flex-col justify-between mt-1">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-indigo-700 "></h1>
        <SearchInput />
        <div className="my-4 border-t border-indigo-300"></div>
        <Coversations />
      </div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
