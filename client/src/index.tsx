import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { server_url } from './info_manage/server_url';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './redux_module/RootReducer';
import Thunk from 'redux-thunk';

axios.defaults.baseURL = server_url;
axios.defaults.withCredentials = true;

declare global{
  interface Window{
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, applyMiddleware(Thunk));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
