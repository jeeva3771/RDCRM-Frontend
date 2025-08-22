
import React from 'react';
import {useDepartmentController } from '../../../controller/DepartmentController';
import DepartmentForm from './DepartmentFormView';

const Departmentform: React.FC = () => {
  const departmentControllerProps = useDepartmentController();
  
  return <DepartmentForm {...departmentControllerProps} />;
};

export default Departmentform;