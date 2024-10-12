import React, { useEffect, useState } from "react";
import axios from "axios";

const UserChat = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Ensure loading is set at the beginning
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL3}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Loading user data...</p>;

  if (error) return <p>{error}</p>;

  if (!user) return <p>No user data available</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="mb-2">
        <strong>Name:</strong> {user.username}
      </div>
      <div className="mb-2">
        <strong>Gender:</strong> {user.gender}
      </div>
      <div className="mb-2">
        <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default UserChat;
