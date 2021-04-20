import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import axios from 'axios';
import { server_url } from './path/Url';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './redux-module/RootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
//import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = server_url;
axios.defaults.withCredentials = true;

//redux dev-tools 사용
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
//reportWebVitals();
