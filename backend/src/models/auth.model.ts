import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  iv: String,
  tag: Buffer<ArrayBuffer>,
  createdAt: Date,
});

export const User = mongoose.model('User', userSchema);
