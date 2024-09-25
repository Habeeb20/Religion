import mongoose from 'mongoose';

const leaderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  lastLogin: { type: Date, default: Date.now,},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  role: { type: String, enum: ['user', 'religious_leader', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'blocked', 'pending'], default: 'pending' },
  isverified: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now },
  otp: { type: String, required: true },
  gallery: [{ type: String }], // To store image URLs from Cloudinary
  viewCount: { type: Number, default: 0 },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
});

const Leader = mongoose.model('Leader', leaderSchema);
export default Leader;
