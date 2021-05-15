import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from '../auth/Auth';
import DefaultPage from './view/default_page/DefaultPage';
import LoginPage from './view/login/LoginPage';
import UserPatchPage from './view/user_page/user_patch/UserPatchPage';
import UserRegisterPage from './view/user_page/user_register/UserRegisterPage';
import { login_page, user_patch_page, user_register_page } from '../path/PagePath';
import { /*GetScreenSize,*/ GetUser } from './GetStore';
import '../global_style/button.scss';
import '../global_style/inputbox.scss';
import '../global_style/line.scss';

function App() {
  GetUser();
  //GetScreenSize();

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Auth(DefaultPage, false)} />
          <Route path={login_page} exact component={Auth(LoginPage, true, true)}/>
          <Route path={user_register_page} exact component={Auth(UserRegisterPage, true, true)}/>
          <Route path={user_patch_page} exact component={Auth(UserPatchPage, true)}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;