import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/views/landing_page/LandingPage';
import LoginPage from './components/views/login_page/LoginPage';
import RegisterPage from './components/views/register_page/RegisterPage';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path={'/'} component={LandingPage}/>
          <Route path={'/login_page'} component={LoginPage}/>
          <Route path={'/register_page'} component={RegisterPage}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

