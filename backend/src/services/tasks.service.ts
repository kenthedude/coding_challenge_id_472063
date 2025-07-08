// Service focused on connecting to MongoDB and manipulate information
// related to the Task collection

import { Types } from "mongoose";
import { Task } from "../models/tasks.model";
import { GetOneTaskQuery, PostQuery, PatchQuery, Task as TaskInterface } from "../types/tasks.types";

const objectId = Types.ObjectId;

export async function getTaskService(filter: GetOneTaskQuery) {
  try {
    const taskExists = await verifyTaskExists(filter);
    if (!taskExists) { return false; }
    const data = await Task.findOne({ ...filter, _id: new objectId(filter._id) })
    return data;
  } catch (error) {
    throw new Error('Get Task Service Error : ', error);
  }
}

export async function getTasksService(userId: string, pageSize: number, offset: number) {
  try {
    const totalItems = (await Task.countDocuments({ userId }));
    const items = await Task.find({ userId }).skip(offset).limit(pageSize);
    return { items, totalItems };
  } catch (error) {
    throw new Error('Get Tasks Service Error : ', error);
  }
}

export async function postTaskService(task: PostQuery) {
  try {
    await Task.insertOne(task)
  } catch (error) {
    throw new Error('Post Task Service Error : ', error);
  }
}

export async function putTaskService(filter: GetOneTaskQuery, update: TaskInterface) {
  const newFilter = { ...filter, _id: new objectId(filter._id) }
  try {
    const taskExists = await verifyTaskExists(filter);
    if (!taskExists) { return false; }
    const data = await Task.updateOne(newFilter, update);
    return data;
  } catch (error) {
    throw new Error('Put Task Service Error : ', error);
  }
}

export async function patchTaskService(filter: GetOneTaskQuery, update: PatchQuery) {
  const newFilter = { ...filter, _id: new objectId(filter._id) }
  try {
    const taskExists = await verifyTaskExists(filter);
    if (!taskExists) { return false; }
    const data = await Task.updateOne(newFilter, update);
    return data;
  } catch (error) {
    throw new Error('Patch Task Service Error : ', error);
  }
}

export async function deleteTaskService(filter: GetOneTaskQuery) {
  try {
    const taskExists = await verifyTaskExists(filter);
    if (!taskExists) { return false; }
    const data = await Task.deleteOne({ ...filter, _id: new objectId(filter._id) })
    return data;
  } catch (error) {
    throw new Error('Delete Task Service Error : ', error);
  }
}

async function verifyTaskExists(filter: GetOneTaskQuery) {
  try {
    const taskToVerify = await Task.exists({ ...filter, _id: new objectId(filter._id) });
    return taskToVerify;
  } catch (error) {
    console.error('Task Not Found: ', error);
    return false;
  }
}
