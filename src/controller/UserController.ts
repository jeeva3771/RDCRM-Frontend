import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../model/UserModel';
import { LoginResponse } from '../api/user';

export interface User {
  id: number;
  username: string;
  token: string;
}

export interface UserControllerProps {
  formData: {
    username: string;
    password: string;
    rememberMe: boolean;
  };
  showPassword: boolean;
  isLoading: boolean;
  error: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const useUserController = (): UserControllerProps => {
  const [formData, setFormData] = useState<{ username: string; password: string; rememberMe: boolean }>({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const model = new UserModel();
  const navigate = useNavigate();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.username && formData.password) {
        try {
          setIsLoading(true);
          const response: LoginResponse = await model.login(formData.username, formData.password);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id.toString());
          localStorage.setItem('username', response.username);
          if (formData.rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberMe');
          }
          setError(null);
          navigate('/dashboard');
        } catch (err) {
          setError('Login failed. Please check your credentials.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('Please enter username and password.');
      }
    },
    [formData, navigate]
  );

  return { formData, showPassword, isLoading, error, handleInputChange, togglePasswordVisibility, handleSubmit };
};