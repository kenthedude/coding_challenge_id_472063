import type { AxiosResponse } from "axios";
import type { GetTasks } from "../../types/tasks.types";
import { apiUrl } from "../../utils/enviroment";
import { axiosGetWithToken } from "./common.axios";

const tasksUrl = `${apiUrl}/tasks`;

export const getTasks = async (page: number, size: number): Promise<AxiosResponse<GetTasks, string>> => {
  const url = `${tasksUrl}?page=${page}&size=${size}`;
  const response = await axiosGetWithToken(url);
  return response;
}
