import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email('Not an email format'),
  password: z.string()
});

export const LoginSchema = z.object({
  email: z.string().email('Not an email format'),
  password: z.string(),
});
