import axios from "axios";

export const axiosGetWithToken = async (url: string) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }
  const response = await axios.get(url, config);
  return response;
}

export const axiosPostWithToken = async (url: string, req: object) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }
  const response = await axios.post(url, req, config);
  return response;
}
