import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/views/landing_page/LandingPage';
import LoginPage from './components/views/login_page/LoginPage';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path={'/'} component={LandingPage}/>
          <Route path={'/login_page'} component={LoginPage}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default App

