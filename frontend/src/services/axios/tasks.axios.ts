import type { AxiosResponse } from "axios";
import type { EditTaskRequest, GetTask, GetTasks, PostTaskRequest } from "../../types/tasks.types";
import { apiUrl } from "../../utils/enviroment";
import { axiosDeleteWithToken, axiosGetWithToken, axiosPatchWithToken, axiosPostWithToken, axiosPutWithToken } from "./common.axios";
import type { CommonResponse } from "../../types/common.types";

const tasksUrl = `${apiUrl}/tasks`;

export const getTask = async (taskId: string): Promise<AxiosResponse<GetTask, string>> => {
  const url = `${tasksUrl}/${taskId}`;
  const response = await axiosGetWithToken(url);
  return response;
}

export const getTasks = async (page: number, size: number): Promise<AxiosResponse<GetTasks, string>> => {
  const url = `${tasksUrl}?page=${page}&size=${size}`;
  const response = await axiosGetWithToken(url);
  return response;
}

export const postTask = async (request: PostTaskRequest) => {
  const response = await axiosPostWithToken(tasksUrl, request);
  return response;
}

export const putTask = async (taskId: string, request: EditTaskRequest) => {
  const url = `${tasksUrl}/${taskId}`;
  const response = await axiosPutWithToken(url, request);
  return response;
}

export const patchTask = async (taskId: string, request: EditTaskRequest) => {
  const url = `${tasksUrl}/${taskId}`;
  const response = await axiosPatchWithToken(url, request);
  return response;
}

export const deleteTask = async (taskId: string): Promise<AxiosResponse<CommonResponse, string>> => {
  const url = `${tasksUrl}/${taskId}`;
  const response = await axiosDeleteWithToken(url);
  return response;
}
