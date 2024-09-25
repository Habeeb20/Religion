import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/user/SignUpPage';
import Login from './pages/user/LoginPage';
import VerifyEmail from './pages/user/VerifyEmail';
import Profile from './pages/user/DashboardPage';
import { ProtectedRoute } from './pages/user/ProtectRoute';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
const App = () => {
  return (
    
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
