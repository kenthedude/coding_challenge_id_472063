import { NextFunction, Request, Response } from 'express';
import { getUser } from '../controllers/auth.controller';
import { extractJWT } from '../utils/jwt';

export async function validateEmailIsUnique(req: Request, res: Response, next: NextFunction) {
  const filter = { email: req.body.email };
  const user = await getUser(filter);
  const isEmailUnique = user === null;

  if (!isEmailUnique) {
    res.status(400).send({ error: 'Duplicated Email' });
    return;
  }
  next();
}

export function validateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }

  const validateToken = extractJWT(token);
  if (!validateToken) {
    res.status(403).send({ error: 'Forbidden' });
    return;
  }
  next();
}
