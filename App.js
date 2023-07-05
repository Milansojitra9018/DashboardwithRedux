import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducer';
import DetailsScreen from './DetailsScreen';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <DetailsScreen />
    </Provider>
  );
}
