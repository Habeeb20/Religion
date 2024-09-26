import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa'; 
import im from '../../assets/religion/Rectangle 6.png'
import im1 from '../../assets/religion/Rectangle 7.png'
import im2 from '../../assets/religion/Rectangle 8.png'
import im3 from '../../assets/religion/Rectangle 9.png'
const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    state: '',
    localGovtArea: '',
    profilePicture: null,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data) {
        navigate('/verify-email');
        toast.success("Successfully registered");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      console.log(err)
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF9E8] mt-7"> {/* Light cream background */}
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#080C89]">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <input
            type="text"
            name="localGovtArea"
            placeholder="Local Government Area"
            className="w-full p-2 border rounded"
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            required
            disabled={isLoading}
          />
          <PasswordStrengthMeter password={formData.password} />

          <motion.button
            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-emerald-600 text-white 
            font-bold rounded-lg shadow-lg hover:from-blue-800
            hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
             focus:ring-offset-gray-900 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <AiOutlineLoading3Quarters className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
          </motion.button>
        </form>
        
        <div className="mt-6 text-center text-gray-600">or</div>

        {/* Social Media Login Section */}
        <div className="flex justify-center gap-4 mt-4">
          <motion.a href="#" className="p-3 bg-[#080C89] rounded-full text-white" whileHover={{ scale: 1.1 }}>
            <FaFacebookF size={20} />
          </motion.a>
          <motion.a href="#" className="p-3 bg-[#080C89] rounded-full text-white" whileHover={{ scale: 1.1 }}>
            <FaTwitter size={20} />
          </motion.a>
          <motion.a href="#" className="p-3 bg-[#080C89] rounded-full text-white" whileHover={{ scale: 1.1 }}>
            <FaGoogle size={20} />
          </motion.a>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account? <a href="/login" className="text-[#080C89] underline">Sign in</a>
          </p>
        </div>
           {/* Image Section (For Bottom Images) */}
           <div className="flex justify-center gap-2 mt-6">
          <img src={im} alt="Gallery Image 1" className="w-20 h-20 object-cover" />
          <img src={im1} alt="Gallery Image 2" className="w-20 h-20 object-cover" />
          <img src={im2} alt="Gallery Image 3" className="w-20 h-20 object-cover" />
          <img src={im3} alt="Gallery Image 4" className="w-20 h-20 object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Signup;






