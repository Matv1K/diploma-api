import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  { name: { type: String, required: true },
    lastName: { type: String, default: '' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, default: '' },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    address: {
      country: { type: String, default: '' },
      city: { type: String, default: '' },
      address: { type: String, default: '' },
    } },
  { timestamps: true, suppressReservedKeysWarning: true },
);

export default mongoose.model('User', userSchema);
