import type { CommonResponse } from "./common.types";

export interface Task {
  '_id': string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetTask extends CommonResponse {
  data: Task;
}

export interface GetTasks extends CommonResponse {
  data: {
    items: Task[];
    totalItems: number;
  }
}

export interface PostTaskRequest {
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  userId: string;
}

export interface EditTaskRequest {
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}
