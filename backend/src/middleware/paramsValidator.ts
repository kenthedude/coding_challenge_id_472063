import { Request, Response, NextFunction } from 'express';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schemas';
import { AddTaskSchema, PatchTaskSchema, PutTaskSchema } from '../schemas/tasks.schemas';

export function validateRegisterUserParams(req: Request, res: Response, next: NextFunction) {
  const result = RegisterSchema.safeParse(req.body);

  if (result.success) {
    next();
    return;
  }
  res.status(400).send({ error: 'Bad Request' });
}

export function validateLoginParams(req: Request, res: Response, next: NextFunction) {
  const result = LoginSchema.safeParse(req.body);

  if (result.success) {
    next();
    return;
  }
  res.status(400).send({ error: 'Bad Request' });
}

export function validateRegisterTaskParams(req: Request, res: Response, next: NextFunction) {
  const result = AddTaskSchema.safeParse(req.body);

  if (result.success) {
    next();
    return;
  }
  res.status(400).send({ error: 'Bad Request' });
}

export function validatePutTaskParams(req: Request, res: Response, next: NextFunction) {
  const result = PutTaskSchema.safeParse(req.body);

  if (result.success) {
    next();
    return;
  }
  res.status(400).send({ error: 'Bad Request' });
}

export function validatePatchTaskParams(req: Request, res: Response, next: NextFunction) {
  const result = PatchTaskSchema.safeParse(req.body);

  if (result.success) {
    next();
    return;
  }
  res.status(400).send({ error: 'Bad Request' });
}

