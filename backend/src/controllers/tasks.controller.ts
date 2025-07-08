import { Request, Response } from "express";
import { MinimumTaskParams } from "../types/tasks.types";
import { getTaskService, postTaskService, putTaskService, patchTaskService, deleteTaskService, getTasksService } from "../services/tasks.service";
import { retrieveUserIDFromToken } from "../utils/jwt";

export async function getTask(req: Request, res: Response) {
  const taskId = req.params.id;
  const userId = retrieveUserIDFromToken(req);
  const filter = { _id: taskId, userId };
  try {
    const data = await getTaskService(filter);
    const response = { success: 'Data retrieved successfully!', data };
    res.status(200).send(response);
  } catch (error) {
    const response = { error: 'Internal Server Error' };
    console.error("Internal Server Error on getTask: ", error);
    res.status(500).send(response);
  }
}

export async function getTasks(req: Request, res: Response) {
  const page = (req.query?.page || 1) as number;
  const pageSize = (req.query?.size || 10) as number;
  const userId = retrieveUserIDFromToken(req);
  const offset = (page - 1) * pageSize;
  try {
    const data = await getTasksService(userId, pageSize, offset);
    const response = { success: 'Data retrieved successfully!', data };
    res.status(200).send(response);
  } catch (error) {
    const response = { error: 'Internal Server Error' };
    console.error("Internal Server Error on getTasks: ", error);
    res.status(500).send(response);
  }
}

export async function postTask(req: Request, res: Response) {
  const params: MinimumTaskParams = req.body;
  const userId = retrieveUserIDFromToken(req);
  const filter = {
    ...params,
    userId,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  try {
    await postTaskService(filter);
    const response = { success: 'Task created successfully' };
    res.status(200).send(response);
  } catch (error) {
    const response = { error: 'Internal Server Error' };
    console.error("Internal Server Error on postTask: ", error);
    res.status(500).send(response);
  }
}

export async function putTask(req: Request, res: Response) {
  const taskId = req.params.id;
  const userId = retrieveUserIDFromToken(req);
  const { body } = req;
  const filter = { _id: taskId, userId };
  const update = {
    ...body,
    updatedAt: new Date()
  }
  try {
    const data = await putTaskService(filter, update);
    if (!data) {
      const response = { error: 'Task not found' };
      res.status(404).send(response);
      return;
    }
    const response = { success: 'Task edited successfully', data }
    res.status(200).send(response);
  } catch (error) {
    const response = { error: 'Internal Server Error' };
    console.error("Internal Server Error on putTask: ", error);
    res.status(500).send(response);
  }
}

export async function patchTask(req: Request, res: Response) {
  const taskId = req.params.id;
  const userId = retrieveUserIDFromToken(req);
  const { body } = req;
  const filter = { _id: taskId, userId };
  const update = {
    ...body,
    updatedAt: new Date()
  }
  try {
    const data = await patchTaskService(filter, update);
    if (!data) {
      const response = { error: 'Task not found' };
      res.status(404).send(response);
      return;
    }
    const response = { success: 'Task patched successfully', data }
    res.status(200).send(response);
  } catch (error) {
    const response = { error: 'Internal Server Error' };
    console.error("Internal Server Error on patchTask: ", error);
    res.status(500).send(response);
  }
}

export async function deleteTask(req: Request, res: Response) {
  const taskId = req.params.id;
  const userId = retrieveUserIDFromToken(req);
  const filter = { _id: taskId, userId };
  try {
    const data = await deleteTaskService(filter);
    if (!data) {
      const response = { error: 'Task not found' };
      res.status(404).send(response);
      return;
    }
    const response = { success: 'Task deleted successfully!', data };
    res.status(200).send(response);
  } catch (error) {
    const response = { error: 'Internal Server Error' };
    console.error("Internal Server Error on deleteTask: ", error);
    res.status(500).send(response);
  }
}
