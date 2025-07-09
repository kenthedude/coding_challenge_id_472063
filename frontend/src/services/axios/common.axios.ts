import axios from "axios";

export const axiosGetWithToken = async (url: string) => {
  const config = getConfig();
  const response = await axios.get(url, config);
  return response;
}

export const axiosPostWithToken = async (url: string, req: object) => {
  const config = getConfig();
  const response = await axios.post(url, req, config);
  return response;
}

export const axiosPutWithToken = async (url: string, req: object) => {
  const config = getConfig();
  const response = await axios.put(url, req, config);
  return response;
}

export const axiosPatchWithToken = async (url: string, req: object) => {
  const config = getConfig();
  const response = await axios.patch(url, req, config);
  return response;
}

export const axiosDeleteWithToken = async (url: string) => {
  const config = getConfig();
  const response = await axios.delete(url, config);
  return response;
}

const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }
}
