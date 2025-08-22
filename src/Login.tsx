
// src/components/Login.tsx (Main component that combines controller and view)
import React from 'react';
import { useUserController } from '../src/controller/UserController';
import LoginView from './LoginView';

const Login: React.FC = () => {
  const userControllerProps = useUserController();
  
  return <LoginView {...userControllerProps} />;
};

export default Login;