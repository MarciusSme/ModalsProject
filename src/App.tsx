import React from 'react';
import {MainScreen} from './MainScreen';
import {ModalProvider} from './modals/ModalProvider';

const App = () => {
  return (
    <ModalProvider>
      <MainScreen />
    </ModalProvider>
  );
};

export default App;
