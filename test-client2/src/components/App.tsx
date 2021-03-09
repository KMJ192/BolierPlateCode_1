import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from '../hoc/Auth';
import LandingPage from './views/landing_page/LandingPage';
import LoginPage from './views/login_page/LoginPage';
import RegisterPage from './views/register_page/RegisterPage';
import UserPatchPage from './views/user_patch_page/UserPatchPage';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={LandingPage}/>
          <Route path={'/register_user'} exact component={RegisterPage}/>
          <Route path={'/login_user'} exact component={LoginPage}/>
          <Route path={'/patch_user'} exact component={UserPatchPage}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
