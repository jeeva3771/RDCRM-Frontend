import React from 'react';
import { useDefaultLayoutController } from '../../src/controller/DefaultLayoutController';
import DefaultLayoutView from '../DefaultLayoutView';

// Main component combining controller and view
const DefaultLayout: React.FC = () => {
  const controllerProps = useDefaultLayoutController();
  return <DefaultLayoutView {...controllerProps} />;
};

export default DefaultLayout;