import Leader from "../models/leaders.model.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import crypto from "crypto"
import  jwt from "jsonwebtoken";
import cloudinary from "cloudinary"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  

const generateUniqueNumber = () => {
    return `RL-${crypto.randomBytes(4).toString('hex')}`;
  };

  
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user:"babatundeademola112@gmail.com",
      pass:"pknseuxqxzkoqdjg"
    },
  });
  
  // Helper function to send OTP
  const sendOTPEmail = async (refereeemail, otp) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: refereeemail,
      subject: 'Verify your email',
      text: `Your verification code is: ${otp}`,
    };
  
    await transporter.sendMail(mailOptions);
  };
  

  export const signup = async(req, res) => {
    const {title, firstname, lastname,ministryname, email, password, bio, religion,category,country,state,localGovtArea, address,yearsInProfession,accountNumber,accountName,bankName,refereephone, relationship, refereename, refereeemail } = req.body;

    try {
        if(!title || !firstname || !lastname || !ministryname || !email || !password || !bio || !religion ||!category ||!address || !country ||!yearsInProfession|| !state || !localGovtArea ||!accountName || !accountNumber ||!bankName || !refereephone || !relationship || !refereename || !refereeemail || !req.file) {
            console.log('error')
            return res.status(400).json({message:" all feilds must be filled in"})
        }

        const existingUser = await Leader.findOne({email})
        if(existingUser){
            console.log('user exist')
            return res.status(400).json({message: 'user already exist'})
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // OTP generation
        const uniqueNumber = `RL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
        const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        

        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const profilePicture = result.secure_url;

        const user = new Leader({
            title,
            firstname,
            lastname,
            ministryname,
            bio,
            religion,
            email,
            password: hashedPassword,
            country,
            state,
            address,
            category,
            bankName,
            accountName,
            accountNumber,
            refereename,
            refereephone,
            refereeemail,
            relationship,
            yearsInProfession,
            localGovtArea,
            profilePicture,
            uniqueNumber,
            verificationToken,
            verificationToken,
            verificationTokenExpiresAt,


        });
        await user.save()

        await sendOTPEmail(user.refereeemail, verificationToken);

        generateTokenAndSetCookie(res, user._id)
        res.status(201).json({
            message:'User registered successfully. please check your referee email to verify your account',
            user: {...user._doc, passsword: undefined},
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong when during registration"})
    }
  };



  export const verifyEmail = async (req, res) => {
    const { code } = req.body;
  
    try {
      // Log the received code
      console.log('Received verification code:', code);
  
      // Find the user with the corresponding verification token and check if it hasn't expired
      const user = await Leader.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: { $gt: Date.now() },
      });
  
      if (!user) {
        // Log if no user is found or the token has expired
        console.log('Invalid or expired verification token');
        return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
      }
  
      // Log details of the found user
      console.log('User found:', user);
      console.log('Current time:', Date.now());
      console.log('Token expires at:', user.verificationTokenExpiresAt);
  
      // Mark the user as verified and clear the verification token
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
  
      // Save the updated user information
      await user.save();
  
      // Send the success response
      res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        user: { ...user._doc, password: undefined }, // Do not return the password in the response
      });
    } catch (error) {
      // Log any errors that occur
      console.error('Error in verifyEmail:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  

  export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await Leader.findOne({email});
        if(!user || !(await bcryptjs.compare(password, user.password))){
            return res.status(400).json({success: false, message: "incorrect crredentials"})
        }

        // generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        // await user.save();
        const token = jwt.sign({id: user._id},  process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({
            success: true,
            message:'Logged in successfully',
            user,
            token
        });
        console.log('user details',user, token)
    } catch (error) {
        console.error('error in login ', error);
        res.status(500).json({success: false, message: 'server error'})


    }
  }

  export const logout = async( req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "successfully logged out"})
  }


  export const updateUserProfile = async(req, res) => {
    const {title, firstname, lastname,ministryname, email,password, bio,address, religion,category,country,state,localGovtArea,refereename, refereeemail, accountName, accountNumber, bankName, refereephone, relationship } = req.body;

    try {
        const userId = req.user?.id;
        const user = await Leader.findById(userId)

        if(!user){
            return res.status(404).json({message: 'user not found'})
        }
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.title = title || user.title;
        user.ministryname = ministryname || user.ministryname;
        user.bio = bio || user.bio;
        user.religion = religion || user.religion;
        user.category = category || user.category;
        user.email = email || user.email;
        user.state = state || user.state;
        user.yearsInProfession = yearsInProfession || user.yearsInProfession
        user.address = address || user.address;
        user.country= country || user.country;
        user.localGovtArea = localGovtArea || user.localGovtArea;
        user.accountNumber = accountNumber || user.accountNumber;
        user.accountName = accountName || user.accountName;
        user.bankName = bankName || user.bankName;
        user.refereename = refereename || user.refereename;
        user.refereephone = refereephone || user.refereephone;
        user.relationship = relationship || user.relationship;
        user.refereeemail = refereeemail || user.refereeemail;
        if(profilePicture){
            user.profilePicture = profilePicture;
        }

        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user:{
                ...user.toObject(),
                password: undefined,
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({message:'something went wrong during updating your data'})
    }
  }


  //delete user account


  export const deleteUserAccount = async(req, res) => {
    try {
        const userId = req.user?.id; 
        const user = await Leader.findById(userId);

        if(!user){
            return res.status(404).json({message:'user not found'})

        }

        await user.remove();

        res.status(200).json({
            message: 'Account deleted successfully'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'something went wrong while deleting account'})
    }
  }




  //countleaders

  export const getleaderscounts = async (req, res) => {
    try {
      const {state} = req.query;
      if(!state || !Array.isArray(state)){
        console.log("an error is here")
        return res.status(400).json({message: "state query parameter must be an array of strings"})
      }
  
      const counts = await Promise.all(state.map(async(sta)=> {
        const count = await Leader.countDocuments({
          state:{$regex: sta, $options: 'i'}
        });
        return {state: sta, count}
      }))
  
      res.json(counts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  
   }



   //get all leaders

   export const getAllLeaders = async (req, res) => {
    try {
      const ministers = await Leader.find();
      res.status(200).json(ministers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



  //get other users profile
  // export const getOtherUserProfile = async (req, res) => {
  //   try {
   
  //     const { userId } = req.params;
  //     const user = await Leader.findById(userId).select('-password');
  
  //     if (!user) {
  //       console.log("user not found")
  //       return res.status(404).json({ message: 'User not found' });
  //     }
  //     res.status(200).json({
  //       success: true,
  //       user: {
  //         _id: user._id,
  //         title: user.title,
  //         firstname: user.firstname,
  //         lastname: user.lastname,
  //         ministryname: user.ministryname,
  //         religion: user.religion,
  //         email: user.email,
  //         bio: user.bio,
  //         address: user.address,
  //         state: user.state,
  //         country: user.country,
  //         yearsInProfession: user.yearsInProfession,
  //         localGovtArea: user.localGovtArea,
  //         profilePicture: user.profilePicture,
  //         lastLogin: user.lastLogin,
  //         uniqueNumber: user.uniqueNumber,
  //         accountName: user.accountName,
  //         accountNumber: user.accountNumber,
  //         bankName: user.bankName,
  //         refereeemail: user.refereeemail,
  //         refereename: user.refereename,
  //         refereephone: user.refereephone
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Something went wrong' });
  //   }
  // };
  




  export const getOtherUserProfile = async (req, res) => {
    console.log('Request parameters:', req.params); 
    try {
      const { id } = req.params;
      console.log(req.params)
  
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("id not found")
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
      }
  
      const user = await Leader.findById(id).select('-password');
  
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          title: user.title,
          firstname: user.firstname,
          lastname: user.lastname,
          ministryname: user.ministryname,
          religion: user.religion,
          email: user.email,
          bio: user.bio,
          address: user.address,
          state: user.state,
          country: user.country,
          yearsInProfession: user.yearsInProfession,
          localGovtArea: user.localGovtArea,
          profilePicture: user.profilePicture,
          lastLogin: user.lastLogin,
          uniqueNumber: user.uniqueNumber,
          accountName: user.accountName,
          accountNumber: user.accountNumber,
          bankName: user.bankName,
          refereeemail: user.refereeemail,
          refereename: user.refereename,
          refereephone: user.refereephone,
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  };





  //Get user profile

  export const getUserProfile = async (req, res) => {
    try {
    
      const userId = req.user?.id; 
      console.log(req.user)
    

      
      if (!userId) {
     
        return res.status(400).json({ message: 'User ID not found' });
      }
  
      const user = await Leader.findById(userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          title: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          ministryname: user.ministryname,
          religion: user.religion,
          email: user.email,
          bio: user.bio,
          address: user.address,
          state: user.state,
          country: user.country,
          yearsInProfession: user.yearsInProfession,
          localGovtArea: user.localGovtArea,
          profilePicture: user.profilePicture,
          lastLogin: user.lastLogin,
          uniqueNumber: user.uniqueNumber,
          accountName: user.accountName,
          accountNumber: user.accountNumber,
          bankName: user.bankName,
          refereeemail: user.refereeemail,
          refereename: user.refereename,
          refereephone: user.refereephone
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  


  

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await Leader.findOne({ email });

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
      const user = await Leader.findOne({ resetToken });
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
		const user = await Leader.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


export const updateLeaderStatus = async (req, res) => {
  try {
    const { leaderId, actionType } = req.body;

    const leader = await Leader.findById(leaderId);
    if (!leader) return res.status(404).json({ msg: 'Leader not found' });

   
    if (actionType === 'block') {
      leader.status = 'blocked';
    } else if (actionType === 'activate') {
      leader.status = 'active';
    } else if (actionType === 'verify') {
      leader.isVerified = true;
    }

 
    await leader.save();
    res.status(200).json({ msg: 'Leader status updated successfully', leader });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

export const isVerifiedLeader = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Leader.findById(id);
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



  