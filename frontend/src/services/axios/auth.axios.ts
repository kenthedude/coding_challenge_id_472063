import axios, { type AxiosResponse } from "axios";
import type { CommonResponse } from "../../types/common.types";
import type { LoginResponse } from "../../types/auth.types";
import { apiUrl } from "../../utils/enviroment";

const authUrl = `${apiUrl}/auth`;

export const registerUser = async (name: string, email: string, password: string): Promise<AxiosResponse<CommonResponse, string>> => {
  const url = `${authUrl}/register`;
  const body = { name, email, password };

  try {
    const axiosResponse = await axios.post(url, body);

    if (axiosResponse?.data.success) {
      // Confirm user
    } else {
      console.error('Register User Error: ', axiosResponse.data.error);
    }
    return axiosResponse;
  } catch (error) {
    const knownError = error as AxiosResponse<CommonResponse, string>;
    console.error('Login User Error: ', knownError);
    return knownError;
  }
}

export const loginUser = async (email: string, password: string) => {
  const url = `${authUrl}/login`
  const body = { email, password }
  const response = { status: 200, jwt: '' }

  try {
    const axiosResponse = await axios.post<LoginResponse>(url, body)
    if (axiosResponse?.data.success) { return { ...response, jwt: axiosResponse.data.jwt } }

    console.error('Login User Error: ', axiosResponse.data.error)
    return { ...response, status: axiosResponse.status }
  } catch (error: unknown) {
    const knownError = error as AxiosResponse<LoginResponse, unknown>

    console.error('Login User Error: ', error)
    return { ...response, status: knownError.status }
  }
}
