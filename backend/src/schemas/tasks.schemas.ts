import { z } from 'zod';

export const AddTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  priority: z.union([z.literal('low'), z.literal('medium'), z.literal('high')]),
  dueDate: z.string().optional(),
});

export const PutTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  priority: z.union([z.literal('low'), z.literal('medium'), z.literal('high')]),
  completed: z.boolean(),
  dueDate: z.string().optional(),
});

export const PatchTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  priority: z.union([z.literal('low'), z.literal('medium'), z.literal('high')]).optional(),
  completed: z.boolean().optional(),
  dueDate: z.string().optional(),
})
