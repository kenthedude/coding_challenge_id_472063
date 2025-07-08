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

export interface GetTasks extends CommonResponse {
  data: {
    items: Task[];
    totalItems: number;
  }
}
