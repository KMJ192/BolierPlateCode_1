import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { server_url } from './info_manage/server_url';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddelware from 'redux-promise';
import rootReducer from './redux_module/RootReducer';
import thunk from 'redux-thunk';

axios.defaults.baseURL = server_url;
axios.defaults.withCredentials = true;

const store = createStore(rootReducer, applyMiddleware(promiseMiddelware, thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
