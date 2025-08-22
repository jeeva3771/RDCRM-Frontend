import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {BASE_URL} from '../baseUrl'

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});



export interface LoginResponse {
  message: string;
  token: string;
  username: string;
  id: number;
}


export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response: AxiosResponse<LoginResponse> = await api.post('/users/login', { username, password });
  return response.data;
};