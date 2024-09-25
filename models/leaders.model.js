import mongoose from 'mongoose';

const leaderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  lastLogin: { type: Date, default: Date.now, },
  ministryname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  localGovtArea: { type: String, required: true },
  religion: { type: String, required: true },
  category: { type: String, required: true },
  profilePicture: { type: String },
  uniqueNumber: { type: String },
  yearsInProfession: { type: Number, required: true },

  accountNumber: { type: String, required: true },
  accountName: { type: String, required: true },
  bankName: { type: String, required: true },


  refereename: { type: String, required: true },
  refereephone: { type: String, required: true },
  refereeemail: { type: String, required: true },
  relationship: { type: String, required: true },

  role: { type: String, enum: ['user', 'religious_leader', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'blocked', 'pending'], default: 'pending' },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  otp: { type: String },
  gallery: [{ type: String }],
  reviewRating: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },

});

const Leader = mongoose.model('Leader', leaderSchema);
export default Leader;
