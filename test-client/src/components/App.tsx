import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { screenResize } from '../redux-module/screen_size';
import { throttle } from 'lodash';

import NotFound from './view/NotFound';
import Auth from '../auth/Auth';
import DefaultPage from './view/default_page/DefaultPage';
import LoginPage from './view/login/LoginPage';
import UserPatchPage from './view/user_page/user_patch/UserPatchPage';
import UserRegisterPage from './view/user_page/user_register/UserRegisterPage';

import { login_page, user_patch_page, user_register_page } from '../path/PagePath';
import { paceCaseUserPatch, pageCaseLogined } from '../auth/PageCase';

import '../global_style/button.scss';
import '../global_style/inputbox.scss';
import '../global_style/line.scss';

function App() {
  const winSizeDispatch = useDispatch();

  const resizeHandler = throttle(() => {
    winSizeDispatch(screenResize(window.innerWidth, window.innerHeight));
  }, 800);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, [resizeHandler]);


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Auth(DefaultPage, false)} />
          <Route path={login_page} exact component={Auth(LoginPage, true, pageCaseLogined)}/>
          <Route path={user_register_page} exact component={Auth(UserRegisterPage, true, pageCaseLogined)}/>
          <Route path={user_patch_page} exact component={Auth(UserPatchPage, true, paceCaseUserPatch)}/>
          <Route exact component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;