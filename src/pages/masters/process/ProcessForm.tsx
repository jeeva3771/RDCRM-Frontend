
import React from 'react';
import { useProcessController } from '../../../controller/ProcessController';
import ProcessForm from './ProcessFormView';

const Processform: React.FC = () => {
  const processControllerProps = useProcessController();
  
  return <ProcessForm {...processControllerProps} />;
};

export default Processform;