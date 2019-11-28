import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './routes';
import './config/Reactotron';
import { Provider } from 'react-redux';

import store from './store';

export default function App() {
  return (
    <>
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </Provider>
    </>
  );
}
