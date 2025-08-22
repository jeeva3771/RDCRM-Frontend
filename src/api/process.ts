import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { BASE_URL } from '../baseUrl';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface ProcessResponse {
  message: string;
  processId: number;
}

export interface ProcessListItem {
  id: number;
  processName: string;
  code: string;
  columnList: string;
  status: string;
  rawMaterial: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessListResponse {
  message: string;
  currentPage: number;
  perPage: number;
  totalUsers: number;
  totalPages: number;
  process: {
    id: number;
    process_name: string;
    process_code: string;
    process_status: number;
    raw_material: number;
    process_fields: string[];
    created_at: string;
    updated_at: string;
  }[];
}

export interface SingleProcessResponse {
  message: string;
  process: {
    id: number;
    process_name: string;
    process_code: string;
    process_status: number;
    raw_material: number;
    process_fields: string[];
    created_at: string;
    updated_at: string;
  };
}

export const processRegister = async (
  process_name: string,
  process_status: string,
  raw_material: string,
  process_fields: string
): Promise<ProcessResponse> => {
  const response: AxiosResponse<ProcessResponse> = await api.post('/process/register', {
    process_name,
    process_status,
    raw_material,
    process_fields,
  });
  return response.data;
};

export const getProcesses = async (
  page: number,
  perPage: number,
  searchTerm?: string
): Promise<ProcessListResponse> => {
  const response: AxiosResponse<ProcessListResponse> = await api.get('/process/show', {
    params: { page, per_page: perPage, search: searchTerm },
  });
  return response.data;
};

export const getProcessById = async (id: number): Promise<SingleProcessResponse> => {
  const response: AxiosResponse<SingleProcessResponse> = await api.get('/process/show-one', {
    params: { id: id },
  });
  return response.data;
};

export const updateProcess = async (
  id: number,
  process_name: string,
  process_status: string,
  raw_material: string,
  process_fields: string
): Promise<ProcessResponse> => {
  const response: AxiosResponse<ProcessResponse> = await api.put(`/process/update/${id}`, {
    process_name,
    process_status,
    raw_material,
    process_fields,
  });
  return response.data;
};

export const deleteProcess = async (id: number): Promise<{ message: string }> => {
  const response: AxiosResponse<{ message: string }> = await api.delete(`/process/delete/${id}`);
  return response.data;
};