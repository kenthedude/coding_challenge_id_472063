import axios, { type AxiosResponse } from "axios";
import type { CommonResponse } from "../../types/common.types";
import type { LoginResponse } from "../../types/auth.types";
import { apiUrl } from "../../utils/enviroment";

const authUrl = `${apiUrl}/auth`;

export async function registerUser(name: string, email: string, password: string) {
  const url = `${authUrl}/register`;
  const body = { name, email, password };
  try {
    const axiosResponse = await axios.post<CommonResponse>(url, body);
    if (axiosResponse?.data.success) {
      // Confirm user
    } else {
      console.error('Register User Error: ', axiosResponse.data.error);
    }
    return axiosResponse.status;
  } catch (error) {
    const knownError = error as AxiosResponse<CommonResponse, unknown>;
    console.error('Login User Error: ', error);
    return knownError.status;
  }
}

export async function loginUser(email: string, password: string): Promise<number> {
  const url = `${authUrl}/login`;
  const body = { email, password };
  try {
    const axiosResponse = await axios.post<LoginResponse>(url, body);
    if (axiosResponse?.data.success) {
      console.log(axiosResponse.data.jwt);
    } else {
      console.log('Login User Error: ', axiosResponse.data.error);
    }
    return axiosResponse.status;
  } catch (error: unknown) {
    const knownError = error as AxiosResponse<LoginResponse, unknown>;
    console.error('Login User Error: ', error);
    return knownError.status;
  }
}
