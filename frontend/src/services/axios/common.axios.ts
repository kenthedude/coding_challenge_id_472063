import axios from "axios";

export async function axiosPostWithToken(url: string, req: object) {
  const token = '';
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }
  const response = await axios.post(url, req, config);
  return response;
}
