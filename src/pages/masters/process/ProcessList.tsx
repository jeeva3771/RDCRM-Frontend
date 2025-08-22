import React from 'react';
import { useProcessListController } from '../../../controller/ProcessListController';
import ProcessList from './ProcessListView';

const Processlist: React.FC = () => {
  const processListControllerProps = useProcessListController();
  
  return <ProcessList {...processListControllerProps} />;
};

export default Processlist;