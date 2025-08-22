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

export interface DepartmentResponse {
  message: string;
  departmentId: number;
}

export interface DepartmentListItem {
  id: number;
  departmentName: string;
  departmentProcess: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentListResponse {
  message: string;
  currentPage: number;
  perPage: number;
  totalDepartments: number;
  totalPages: number;
  departments: {
    id: number;
    department_name: string;
    department_process: string[];
    department_status: number;
    created_at: string;
    updated_at: string;
  }[];
}

export interface SingleDepartmentResponse {
  message: string;
  department: {
    id: number;
    department_name: string;
    department_process: string[];
    department_status: number;
    created_at: string;
    updated_at: string;
  };
}

export const departmentRegister = async (
  department_name: string,
  department_status: string,
  department_process: string
): Promise<DepartmentResponse> => {
  const response: AxiosResponse<DepartmentResponse> = await api.post('/department/register', {
    department_name,
    department_status,
    department_process,
  });
  return response.data;
};

export const getDepartments = async (
  page: number,
  perPage: number,
  searchTerm?: string
): Promise<DepartmentListResponse> => {
  const response: AxiosResponse<DepartmentListResponse> = await api.get('/department/show', {
    params: { page, per_page: perPage, search: searchTerm },
  });
  return response.data;
};

export const getDepartmentById = async (id: number): Promise<SingleDepartmentResponse> => {
  const response: AxiosResponse<SingleDepartmentResponse> = await api.get('/department/show-one', {
    params: { id: id },
  });
  return response.data;
};

export const updateDepartment = async (
  id: number,
  department_name: string,
  department_status: string,
  department_process: string
): Promise<DepartmentResponse> => {
  const response: AxiosResponse<DepartmentResponse> = await api.put(`/department/update/${id}`, {
    department_name,
    department_status,
    department_process,
  });
  return response.data;
};

export const deleteDepartment = async (id: number): Promise<{ message: string }> => {
  const response: AxiosResponse<{ message: string }> = await api.delete(`/department/delete/${id}`);
  return response.data;
};