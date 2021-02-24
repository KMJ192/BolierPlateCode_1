import React, { Component } from 'react';
import './LoginPage.css';
import logo from './rust_logo.png';

class LoginPage extends Component {
    render() {
        return (
            <div id="signin_form">
                <main className="form-signin">
                    <form>
                        <a href="/">
                            <img id="logo" src={logo} alt="" width="70" height="70"/>
                        </a>
                        <h1 className="h3 mb-3 fw-normal">Login info</h1>
                        <input type="email" id="inputEmail" className="form-control" placeholder="이메일" required autoFocus/>
                        <input type="password" id="inputPassword" className="form-control" placeholder="비밀번호" required/>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">로그인</button>
                        <a href="/register_user">
                            회원가입
                        </a>
                    </form>
                </main>
            </div>
        )
    }
}

export default LoginPage