import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { server_url } from './info_manage/server_url';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducer/RootReducer';

axios.defaults.baseURL = server_url;
axios.defaults.withCredentials = true;

//reducer 적용
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
