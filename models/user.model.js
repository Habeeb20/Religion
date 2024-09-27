import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  lastLogin: { type: Date, default: Date.now,},
  email: { type: String, required: true, unique: true },
  phone:{type:String, required: true},
  bio:{type:String, required: true},
  address:{type:String, required: true},
  password: { type: String, required: true },
  accountName: {type:String, required: true},
  accountNumber:{type:String, required: true},
  bankName:{type:String, required: true},
  religion:{type:String, required: true},
  category:{type:String, required: true},
  profilePicture: { type: String },
  isVerified: {type: Boolean,default: false},
  state: { type: String, required: true },
  localGovtArea: { type: String, required: true },
  role: { type: String, enum: ['user', 'religious_leader', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'blocked', 'pending'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  registrationDate: { type: Date, default: Date.now },
  uniqueNumber: { type: String, unique: true },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
});

export const User = mongoose.model('User', userSchema);

