import { compare, hash } from "bcrypt-ts"
import { Request, Response } from "express";
import { RegisterUserRequestBody, LoginRequestBody, GetUserFilter } from "../types/auth.types"
import { getUserService, postUserService } from "../services/auth.service";
import { DecryptString, EncryptString } from "../utils/encryption";
import { createJWT } from "../utils/jwt";

export async function registerUser(req: Request, res: Response) {
  const params: RegisterUserRequestBody = req.body;
  const hashedPassword = await hash(params.password, 10)
  const { cipherText: password, iv, tag } = EncryptString(hashedPassword);
  const paramsWithEncryptedPassword = {
    ...params,
    password,
    iv,
    tag,
    createdAt: new Date()
  }
  try {
    await postUserService(paramsWithEncryptedPassword);
    const response = { success: 'User created successfully' };
    res.status(200).send(response);
  } catch (error) {
    const response = { error: 'Internal Server Error' }
    console.error('Internal Server Error on registerUser: ', error)
    res.status(500).send(response);
  }
}

export async function loginUser(req: Request, res: Response) {
  const params: LoginRequestBody = req.body;
  const filter = { email: params.email };
  try {
    const user = await getUserService(filter);

    if (user === null) {
      const response = { error: 'Invalid Email' };
      res.status(401).send(response);
      return;
    }

    const userPassword = user?.password || '';
    const id = user?.id || '';
    const email = user?.email || '';
    const name = user?.name || '';
    const iv = user?.iv || '';
    const tag = user.tag as Buffer<ArrayBuffer>;
    const decrypedPassword = DecryptString(userPassword, iv, tag);
    const isValidPassword = await compare(params.password, decrypedPassword);

    if (!isValidPassword) {
      const response = { error: 'Invalid password' };
      console.error('Invalid Password');
      res.status(401).send(response);
      return;
    }

    const jwt = createJWT(id, name, email);
    const response = { success: 'Login successfully!', jwt };
    res.status(200).send(response);
  } catch (error) {
    const response = { error: 'Internal Server Error' }
    console.error('Internal Server Error on loginUser: ', error);
    res.status(500).send(response);
  }
}

export async function getUser(filter: GetUserFilter) {
  try {
    const user = await getUserService(filter);
    return user;
  } catch (error) {
    throw new Error('Internal Server Error on getUser: ', error);
  }
}
