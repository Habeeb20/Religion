import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/user/SignUpPage';
import Login from './pages/user/LoginPage';
import VerifyEmail from './pages/user/VerifyEmail';
import Profile from './pages/user/DashboardPage';
import ForgotPassword from './pages/user/ForgotPassword';
import ResetPassword from './pages/user/ResetPassword';

import { ProtectedRoute } from './pages/user/ProtectRoute';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Lsignup from './pages/leader/Lsignup';
import Llogin from './pages/leader/Llogin';
import LverifyEmail from './pages/leader/Lverify-email';
import LforgotPassword from './pages/leader/LforgotPassword';
import LProfile from './pages/leader/LProfile';
import Homepage from './pages/Homepage';
const App = () => {
  return (

    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path='/' element={<Homepage />} />
          //users
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />

       
          <Route
            path="/profile"
            element={
              
                <Profile />
             
            }
          />


             //religiousleaders
          <Route path='lsignup' element={<Lsignup />} />
          <Route path='llogin' element={<Llogin />} />
          <Route path='lverify-email' element={<LverifyEmail />} />
          <Route path='lforgot-password' element={<LforgotPassword />} />
          <Route path='lresetpassword/:token' element={<Lsignup />} />

          <Route
            path="/lprofile"
            element={
           
                <LProfile />
            
            }
          />

        </Routes>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
