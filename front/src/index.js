import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { provider } from 'react-redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import './index.css';
import App from './components/App';
import rootReducer from './modules';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <provider store = {store}>
    <App />
  </provider>,
  document.getElementById('root')
);

