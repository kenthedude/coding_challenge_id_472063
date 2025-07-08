import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
  priority: String,
  dueDate: Date,
  userId: String,
  createdAt: Date,
  updatedAt: Date,
});

export const Task = mongoose.model('Task', taskSchema);
