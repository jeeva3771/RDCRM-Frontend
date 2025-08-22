
import React from 'react';
import {useDepartmentListController } from '../../../controller/DepartmentListController';
import DepartmentList from './DepartmentListView';

const Departmentlist: React.FC = () => {
  const departmentListControllerProps =useDepartmentListController();
  
  return <DepartmentList {...departmentListControllerProps} />;
};

export default Departmentlist;