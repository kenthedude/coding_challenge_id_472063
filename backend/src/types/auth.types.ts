export type RegisterUserRequestBody = {
  name: string;
  email: string;
  password: string;
}

export type LoginRequestBody = {
  email: string;
  password: string;
}

export type GetUserFilter = { email: string; }

export interface PostUser {
  email: string;
  name: string;
  password: string;
  iv: string;
  tag: Buffer<ArrayBuffer>;
  createdAt: Date;
}

export interface User extends PostUser {
  id: string;
}
