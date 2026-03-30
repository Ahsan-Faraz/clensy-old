import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model compilation error in development due to hot reloading
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;