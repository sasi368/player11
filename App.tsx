import React, {useEffect} from 'react';
import Routes from './app/Navigations/Routes';
import {Provider} from 'react-redux';
import configureStore from './app/Redux/store';

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
export default App;
