import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login'; // Main Login component that uses useUserController
import DefaultLayout from '../src/layout/DefaultLayout';
import ConditionalLayout from './ConditionalLayout';
import Processform from '../src/pages/masters/process/ProcessForm';
import Departmentform from '../src/pages/masters/departments/DepartmentForm';
import Departmentlist from '../src/pages/masters/departments/DepartmentList';
import Processlist from '../src/pages/masters/process/ProcessList';

// Lazy-loaded components
// Enquiry components
const EnquiriesList = lazy(() => import('./pages/enquiry/List'));
const EnquiriesForm = lazy(() => import('./pages/enquiry/Form'));
const EnquiriesDesignerList = lazy(() => import('./pages/enquiry/DesignerList'));

// Masters - Process components
// const ProcessList = lazy(() => import('./pages/masters/process/List'));
// const ProcessForm = lazy(() => import('./pages/masters/process/Form'));

// Masters - Roles components
const RolesList = lazy(() => import('./pages/masters/roles/List'));
const RoleForm = lazy(() => import('./pages/masters/roles/Form'));

// Masters - Departments components
const DepartmentsList = lazy(() => import('./pages/masters/departments/List'));
const DepartmentForm = lazy(() => import('./pages/masters/departments/Form'));

// Masters - Materials components
const MaterialsList = lazy(() => import('./pages/masters/materials/List'));
const MaterialForm = lazy(() => import('./pages/masters/materials/Form'));

// Users components
const UsersList = lazy(() => import('./pages/users/List'));
const UserForm = lazy(() => import('./pages/users/Form'));

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

// ProtectedRoute component to check for token
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? <>{element}</> : <Navigate to="/" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ConditionalLayout>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute element={<DefaultLayout />} />} />
          
          {/* Enquiry routes */}
          <Route path="/enquiries" element={<ProtectedRoute element={<EnquiriesList />} />} />
          <Route path="/enquiries/add" element={<ProtectedRoute element={<EnquiriesForm />} />} />
          <Route path="/enquiries/edit/:id" element={<ProtectedRoute element={<EnquiriesForm />} />} />
          <Route path="/enquiriesdesigner" element={<ProtectedRoute element={<EnquiriesDesignerList />} />} />
          
          {/* Masters - Process routes */}
          <Route path="/process" element={<ProtectedRoute element={<Processlist />} />} />
          <Route path="/process/add" element={<ProtectedRoute element={<Processform />} />} />
          <Route path="/process/edit/:processId" element={<ProtectedRoute element={<Processform />} />} />
          
          {/* Masters - Roles routes */}
          <Route path="/roles" element={<ProtectedRoute element={<RolesList />} />} />
          <Route path="/roles/add" element={<ProtectedRoute element={<RoleForm />} />} />
          <Route path="/roles/edit/:roleId" element={<ProtectedRoute element={<RoleForm />} />} />
          
          {/* Masters - Departments routes */}
          {/* <Route path="/departments" element={<ProtectedRoute element={<DepartmentsList />} />} />
          <Route path="/departments/add" element={<ProtectedRoute element={<DepartmentForm />} />} />
          <Route path="/departments/edit/:departmentId" element={<ProtectedRoute element={<DepartmentForm />} />} /> */}
          <Route path="/departments" element={<ProtectedRoute element={<Departmentlist />} />} />
            <Route path="/departments/add" element={<ProtectedRoute element={<Departmentform />} />} />
          
          {/* Masters - Materials routes */}
          <Route path="/materials" element={<ProtectedRoute element={<MaterialsList />} />} />
          <Route path="/materials/add" element={<ProtectedRoute element={<MaterialForm />} />} />
          <Route path="/materials/edit/:materialId" element={<ProtectedRoute element={<MaterialForm />} />} />
          
          {/* Users routes */}
          <Route path="/users" element={<ProtectedRoute element={<UsersList />} />} />
          <Route path="/users/add" element={<ProtectedRoute element={<UserForm />} />} />
          <Route path="/users/edit/:userId" element={<ProtectedRoute element={<UserForm />} />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Page not found</p>
                <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Go Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </ConditionalLayout>
    </Suspense>
  );
};

export default AppRoutes;