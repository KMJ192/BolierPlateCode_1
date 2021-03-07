import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { server_url } from './server_url/server_url';

//axios 기본사항 저장
axios.defaults.baseURL = server_url;
axios.defaults.withCredentials = true; //server로부터 token을 확인받음

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
