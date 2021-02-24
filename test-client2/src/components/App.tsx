import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './views/landing_page/LandingPage';
import LoginPage from './views/login_page/LoginPage';
import RegisterPage from './views/register_page/RegisterPage';

export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
              <Route path={'/'} exact component={LandingPage}/>
              <Route path={'/register_page'} exact component={RegisterPage}/>
              <Route path={'/login_page'} exact component={LoginPage}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

