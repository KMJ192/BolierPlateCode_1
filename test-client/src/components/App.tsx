import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { login_page, user_patch_page, user_register_page } from '../path/PagePath';
import DefaultPage from './view/default_page/DefaultPage';
import LoginPage from './view/login/LoginPage';
import UserPatchPage from './view/user_page/user_patch/UserPatchPage';
import UserRegisterPage from './view/user_page/user_register/UserRegisterPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={DefaultPage} />
          <Route path={login_page} exact component={LoginPage}/>
          <Route path={user_register_page} exact component={UserRegisterPage}/>
          <Route path={user_patch_page} exact component={UserPatchPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;