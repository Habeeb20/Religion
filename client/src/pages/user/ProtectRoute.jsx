import { Navigate } from 'react-router-dom';
import axios from 'axios';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/check-auth`);
      return response.data.isAuthenticated;
    } catch (error) {
      return false;
    }
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
};
