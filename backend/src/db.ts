import mongoose from 'mongoose';

const mongoDBURL = process.env.MONGO_PATH || 'mongodb://localhost:27017/test';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDBURL);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
