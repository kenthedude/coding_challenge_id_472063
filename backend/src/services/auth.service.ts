import { User } from "../models/auth.model";
import { PostUser, GetUserFilter, User as UserInterface } from "../types/auth.types";

export async function postUserService(user: PostUser) {
  try {
    await User.insertOne(user)
  } catch (error) {
    throw new Error('Something happened while creating a new user: ', error);
  }
}

export async function getUserService(filter: GetUserFilter, selectedFields?: string) {
  try {
    const user: UserInterface | null = await User.findOne(filter, selectedFields);
    return user;
  } catch (error) {
    throw new Error('Something happened while fetching user data: ', error);
  }
}

