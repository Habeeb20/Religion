import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import cloudinary from 'cloudinary';
import {User} from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"



 cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user:"babatundeademola112@gmail.com",
    pass:"pknseuxqxzkoqdjg"
  },
});

// Helper function to send OTP
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Your verification code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Signup controller
export const signup = async (req, res) => {
  const { firstname, lastname, email, password, state, localGovtArea, phone, bio, address, accountName, accountNumber, bankName, religion, category } = req.body;

  try {
    if (!email || !password || !firstname || !lastname || !state || !localGovtArea || !phone ||!address ||!bio || !accountName || !accountNumber || !bankName || !religion || !category || !req.file) {
      console.log('error')
      return res.status(400).json({ message: 'All fields are required, including profile picture' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("user exist")
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // OTP generation
    const uniqueNumber = `RL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Upload profile picture to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const profilePicture = result.secure_url;

    // Create the user
    const user = new User({
      firstname,
      lastname,
      email,
      phone,
      bio,
      address,
      accountName,
      accountNumber,
      bankName,
      category,
      religion,
      password: hashedPassword,
      state,
      localGovtArea,
      profilePicture,
      uniqueNumber,
      verificationToken,
      verificationTokenExpiresAt,
    });

    await user.save();

    // Send OTP email
    await sendOTPEmail(user.email, verificationToken);

 

    res.status(201).json({
      message: 'User registered successfully. Please check your email to verify your account',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong during registration' });
  }
};

// Email Verification controller
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error('Error in verifyEmail: ', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    
    user.lastLogin = new Date();
    // await user.save();

    // // Generate JWT and set it in cookie
    // generateTokenAndSetCookie(res, user._id);
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
  



    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user,
      token
      
    });
    console.log('user details',user, token)
  } catch (error) {
    console.error('Error in login: ', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};




  


export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};




export const updateUserProfile = async (req, res) => {
  const { firstname, lastname, email, state, localGovtArea, profilePicture } = req.body;

  try {
    
      const userId = req.user.id; 
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

     
      user.firstname = firstname || user.firstname;
      user.lastname = lastname || user.lastname;
      user.email = email || user.email;
      user.state = state || user.state;
      user.localGovtArea = localGovtArea || user.localGovtArea;
      user.phone = phone || user.phone;
      user.bio = bio || user.bio;
      user.address = address || user.address;
      user.accountName = accountName || user.accountName;
      user.bankName = bankName || user.bankName;
      user.religion = religion || user.religion;
      user.category = category || user.category;
      if (profilePicture) {

          user.profilePicture = profilePicture;
      }

      await user.save();

      res.status(200).json({
          message: 'Profile updated successfully',
          user: {
              ...user.toObject(),
              password: undefined, 
          },
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong while updating profile' });
  }
};




// Delete user account
export const deleteUserAccount = async (req, res) => {
  try {
      const userId = req.user._id; 
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      await user.remove(); 

      res.status(200).json({
          message: 'Account deleted successfully',
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong while deleting account' });
  }
};



// Get user profile
export const getUserProfile = async (req, res) => {
  try {
      const userId = req.user.id; 
      const user = await User.findById(userId).select('-password'); 

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
          success: true,
          user: {
              _id: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              state: user.state,
              localGovtArea: user.localGovtArea,
              profilePicture: user.profilePicture,
              lastLogin: user.lastLogin, 
              uniqueNumber: user.uniqueNumber,
              phone: user.phone,
              bio: user.bio,
              address: user.address,
              accountName: user.accountName,
              accountNumber: user.accountNumber,
              bankName: user.bankName,
              category:user.category,
              religion: user.religion,
          },
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong while fetching user profile' });
  }
};






export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

	  // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = jwt.sign({ resetToken }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send an email with the reset link
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`;

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user:"babatundeademola112@gmail.com",
        pass:"pknseuxqxzkoqdjg"
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link below to reset your password: \n\n ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const resetPassword = async (req, res) => {
	
		const { token } = req.params;
		const { newPassword } = req.body;

    try {
      // Verify the reset token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { resetToken } = decoded;
  
      // Find the user by the token
      const user = await User.findOne({ resetToken });
      if (!user) {
        return res.status(404).json({ message: 'Invalid token' });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


export const updateUserStatus = async (req, res) => {
  try {
    const { userId, actionType } = req.body; 

    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

  
    if (actionType === 'block') {
      user.status = 'blocked';
    } else if (actionType === 'activate') {
      user.status = 'active';
    } else if (actionType === 'verify') {
      user.isVerified = true;
    }

  
    await user.save();
    res.status(200).json({ msg: 'User status updated successfully', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

//getall users

export const getAllusers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const isVerifiedUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'User verified successfully!' });
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    
  }
}


