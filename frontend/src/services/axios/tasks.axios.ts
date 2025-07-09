import type { AxiosResponse } from "axios";
import type { EditTaskRequest, GetTask, GetTasks, PostTaskRequest } from "../../types/tasks.types";
import { apiUrl } from "../../utils/enviroment";
import { axiosDeleteWithToken, axiosGetWithToken, axiosPatchWithToken, axiosPostWithToken, axiosPutWithToken } from "./common.axios";
import type { CommonResponse } from "../../types/common.types";

const tasksUrl = `${apiUrl}/tasks`;

type StringRequest = {
  stringRequest: string
}

type GetTaskRequest = {
  page: number,
  size: number
}

export const getTask = async (request: StringRequest): Promise<AxiosResponse<GetTask, string>> => {
  const url = `${tasksUrl}/${request.stringRequest}`;
  const response = await axiosGetWithToken(url);
  return response;
}

export const getTasks = async (request: GetTaskRequest): Promise<AxiosResponse<GetTasks, string>> => {
  const url = `${tasksUrl}?page=${request.page}&size=${request.size}`;
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

export const patchTask = async (request: EditTaskRequest) => {
  const url = `${tasksUrl}/${request.taskId}`;
  const response = await axiosPatchWithToken(url, request.payload);
  return response;
}

export const deleteTask = async (request: StringRequest): Promise<AxiosResponse<CommonResponse, string>> => {
  const url = `${tasksUrl}/${request.stringRequest}`;
  const response = await axiosDeleteWithToken(url);
  return response;
}
