import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto mb-20 flex justify-center">
      {!loading ? (
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
          onClick={logout}
        >
          <BiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      ) : (
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner w-6 h-6 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></span>
          <span className="ml-2 text-red-500">Logging out...</span>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
