import axios, { type AxiosResponse } from "axios";
import type { CommonResponse } from "../../types/common.types";
import type { LoginResponse } from "../../types/auth.types";
import { apiUrl } from "../../utils/enviroment";

const authUrl = `${apiUrl}/auth`;

type RegisterUserRequest = {
  name: string,
  email: string,
  password: string
}

type LoginUserRequest = {
  email: string,
  password: string
}

export const registerUser = async (request: RegisterUserRequest): Promise<AxiosResponse<CommonResponse, string>> => {
  const url = `${authUrl}/register`;

  try {
    const axiosResponse = await axios.post(url, request);

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

export const loginUser = async (request: LoginUserRequest) => {
  const url = `${authUrl}/login`
  const response = { status: 200, jwt: '' }

  try {
    const axiosResponse = await axios.post<LoginResponse>(url, request)
    if (axiosResponse?.data.success) { return { ...response, jwt: axiosResponse.data.jwt } }

    console.error('Login User Error: ', axiosResponse.data.error)
    return { ...response, status: axiosResponse.status }
  } catch (error: unknown) {
    const knownError = error as AxiosResponse<LoginResponse, unknown>

    console.error('Login User Error: ', error)
    return { ...response, status: knownError.status }
  }
}
