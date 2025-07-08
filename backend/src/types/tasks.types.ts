export interface MinimumTaskParams {
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
}

export interface PostQuery extends MinimumTaskParams {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task extends PostQuery {
  _id: string;
}

export type PatchQuery = {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  updatedAt: Date;
}

export type GetTaskFilter = {
  _id?: string;
  userId: string;
}

export type GetOneTaskQuery = {
  _id?: string;
  userId: string;
}

