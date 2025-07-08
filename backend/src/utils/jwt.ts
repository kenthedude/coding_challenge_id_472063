import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { privateKey } from '../utils/environment.ts';

export function createJWT(id: string, name: string, email: string) {
  const payload = { id, name, email };
  const expiration = '1h';
  const token = jwt.sign(payload, privateKey, { expiresIn: expiration });
  return token;
}

export function extractJWT(token: string) {
  let response: string | null | JwtPayload | undefined = null;
  jwt.verify(token.split(' ')[1], privateKey, (err, user) => {
    response = err ? null : user;
  });
  return response;
}

export function retrieveUserIDFromToken(req: Request) {
  const token = req.header('Authorization') as string;
  const extractedToken = extractJWT(token) || { id: '' };

  return extractedToken.id;
}
