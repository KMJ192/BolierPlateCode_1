import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { login_page, main_page, user_patch_page, user_register_page } from '../info_manage/page_url';
import MainPage from './view/main_page/MainPage';
import LoginPage from './view/user_page/login_page/LoginPage';
import UserPatchPage from './view/user_page/user_patch_page/UserPatchPage';
import UserRegisterPage from './view/user_page/user_register_page/UserRegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path={main_page} exact component={MainPage}/> {/* 메인페이지 -> navbar, sidebar, mainpage 포함*/}
          {/* user인증 페이지 (로그인, 회원가입, 유저정보수정) */}
          <Route path={login_page} exact component={LoginPage}/>
          <Route path={user_register_page} exact component={UserRegisterPage}/>
          <Route path={user_patch_page} exact component={UserPatchPage}/>
          {/* 아래 내용작성 */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;