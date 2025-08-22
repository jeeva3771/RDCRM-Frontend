import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../public/logo";
import {UserControllerProps} from './controller/UserController';

const LoginView: React.FC<UserControllerProps> = ({
  formData,
  showPassword,
  isLoading,
  error,
  handleInputChange,
  togglePasswordVisibility,
  handleSubmit,
}) => {
  return (
    <div className="font-sans">
      <div
        id="login-page"
        className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4 transition-all duration-500 from-blue-500 to-blue-200"
      >
        <div
          id="login-card"
          className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden transition-all duration-500 bg-white"
        >
          <div
            id="card-header"
            className="p-6 flex justify-center transition-all duration-500 bg-gray-700"
          >
            <div
              id="logo"
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg pl-1"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <img src='/logo.svg' alt="Logo" />
              </div>
            </div>
          </div>
          <div id="card-body" className="p-8">
            <h1
              className="text-3xl font-bold text-center mb-8 transition-colors duration-500 text-xl text-primary-darkGrey text-gray-700"
            >
              Sign In
            </h1>
            <div id="login-form">
              <div id="username-field" className="mb-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1 transition-colors duration-500 text-gray-700"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-regular fa-user text-gray-400"></i>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all border-gray-300 bg-white text-gray-900"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
              <div id="password-field" className="mb-8">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1 transition-colors duration-500 text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-lock text-gray-400"></i>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all border-gray-300 bg-white text-gray-900"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    <i
                      onClick={togglePasswordVisibility}
                      className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-blue-500 transition-colors`}
                    ></i>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'primary-bgclr hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                    Signing In...
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;