import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './view/main_page/MainPage';
import LoginPage from './view/user_page/login_page/LoginPage';
import UserPatchPage from './view/user_page/user_patch_page/UserPatchPage';
import UserRegisterPage from './view/user_page/user_register_page/UserRegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path={'/'} exact component={MainPage}/> {/* 메인페이지 -> navbar, sidebar, mainpage 포함*/}
          <Route path={'/login'} exact component={LoginPage}/>
          <Route path={'/register_user'} exact component={UserRegisterPage}/>
          <Route path={'/patch_user'} exact component={UserPatchPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
