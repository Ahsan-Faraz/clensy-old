import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/clensy-cms';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).catch((error) => {
      cached.promise = null; // Reset promise on error
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset promise on error
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectToDatabase;