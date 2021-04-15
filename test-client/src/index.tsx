import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import axios from 'axios';
import { server_url } from './path/Url';
//import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = server_url;
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
//reportWebVitals();
