import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/user/SignUpPage';
import Login from './pages/user/LoginPage';
import VerifyEmail from './pages/user/VerifyEmail';
import Profile from './pages/user/DashboardPage';
import ForgotPassword from './pages/user/ForgotPassword';
import ResetPassword from './pages/user/ResetPassword';
import { io } from 'socket.io-client'
import { ProtectedRoute } from './pages/user/ProtectRoute';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Lsignup from './pages/leader/Lsignup';
import Llogin from './pages/leader/Llogin';
import LverifyEmail from './pages/leader/Lverify-email';
import LforgotPassword from './pages/leader/LforgotPassword';
import LProfile from './pages/leader/LProfile';
import Homepage from './pages/Homepage';

import LresetPassword from './pages/leader/LresetPassword';
import LleaderDetails from './pages/leader/LleaderDetails';
import Religion from './pages/Religion';
import Choice from './components/choice/choice1';
import Payment from './pages/payment/Payment';
import PaymentSuccess from './pages/payment/PaymentSuccess';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRegister from './pages/admin/AdminRegister';
import ChatHome from './pages/Chat/ChatHome';
import ChatLogin from './pages/Chat/Login'
import ChatSignup from './pages/Chat/SignUp'
import { useAuthContext } from './context/AuthContext';
import { useEffect } from 'react';
import Report from './pages/Report';
import BlackList from './pages/BlackList';
import InfoModal from './pages/leader/InfoModal';
import ChooseLogin from './pages/ChooseLogin';
import Policy from './pages/Policy';
import AllUsers from './pages/admin/AllUsers';
import AllLeaders from './pages/admin/AllLeaders';
import Dashboard from './pages/admin/Dashboard';
import AboutUs from './pages/AboutUs';
import Admin from './pages/admin/AdminDashboard';
import UserLogin from './pages/UserLogin';
import ReportedAccount from './pages/admin/ReportedAccount';
import Video from './components/Video';
import LeaderPayment from './pages/payment/LeaderPayment';
const socket = io(import.meta.env.VITE_BACKEND_URL)
const App = () => {

  const { authUser } = useAuthContext()
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.on('notification', (data) => {
      alert(data.message); // Show notification (simple alert for now)
    });

    socket.on('meeting_notification', (meetingDetails) => {
      alert('you have a new meeting scheduled: ${meetingDetails}')
    })

    return () => {
      socket.off('connect');
      socket.off('notification');
    };
  }, []);

  
  return (

    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/religion' element={<Religion />} />
          <Route path='/choice' element={<Choice />} />
          <Route path='/report' element={<Report />} />
          <Route path='/blacklist' element={<BlackList />} />
          <Route path='/info' element={<InfoModal />} />
          <Route path='/chooselogin' element={<ChooseLogin />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/userlogin' element={<UserLogin />} />
          <Route path='/reportedaccounts' element={<ReportedAccount />} />
          <Route path='/video' element={<Video />} />


          <Route path='/admin/users' element={<AllUsers />} />
          <Route path='/admin/leaders' element={<AllLeaders />} />
          <Route path='/admin' element={<Admin />} />



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
          <Route path='lresetpassword/:token' element={<LresetPassword />} />
          <Route path='/lleader/:id' element={<LleaderDetails />} />


          <Route
            path="/lprofile"
            element={

              <LProfile />

            }
          />


          //admin 
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/adminregister' element={<AdminRegister />} />
          <Route path = '/admin' element={<AdminDashboard />} />

          {/* //chat
          <Route path='/chat' element={<Chat />} /> */}


          //payment
          <Route path='payment' element={<Payment />} />


          <Route path="/paymentverification" element={<PaymentSuccess />} />
          <Route path="/leaderpayment" element={<LeaderPayment/> } />


          //chat
        <Route
          path="/chat"
          element={authUser ? <ChatHome /> : <Navigate to={"/chatlogin"} />}
        />


        <Route
          path="/chatlogin"
          element={authUser ? <Navigate to={"/chat"} /> : <ChatLogin />}
        />

        <Route
          path="/chatsignup"
          element={authUser ? <Navigate to={"/chat"} /> : <ChatSignup />}
        />

        </Routes>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
