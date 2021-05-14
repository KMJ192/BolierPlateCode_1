import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { user_register_page } from '../../../path/PagePath';
import Wrapper from '../../wrapper/Wrapper';
import { LoginRequest } from './LoginPageCode';
import './LoginPage.scss';

function LoginPage() {
    document.title="로그인";
    const [redirect, setRedirect] = useState(false);
    const [loginData, setLoginData] = useState({
        email : "",
        password : ""
    });

    const tryLogin = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(loginData.email === "") {
            alert("이메일을 입력해주세요.");
            return;
        }
        if(loginData.password === "") {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        const response : boolean = await LoginRequest(loginData)
            .then(response => response)
            .catch(err => err);
        
        if(response) setRedirect(true);
    }

    if(redirect === true){
        return <Redirect to="/"/>
    }

    return (
        <Wrapper>
            <form className="user-login-form" onSubmit={tryLogin}>
                <div className="login-container">
                    <div className="login-des">
                        로그인
                    </div>
                    <br/>
                    <div className="input-login-des">이메일</div>
                    <input className="input-box email-input" placeholder="이메일 입력" autoFocus
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setLoginData({...loginData, email : e.target.value})}
                    />
                    <div className="input-login-des">비밀번호</div>
                    <input className="input-box password-input" type="password" placeholder="비밀번호 입력"
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setLoginData({...loginData, password : e.target.value})}
                    />
                    <br/>
                    <input className="remember-box" type="checkbox"/>기억하기
                    <br/>
                    <button className="user-page-btn sign-btn" type="submit">로그인</button>
                    <br/>
                    <Link to={user_register_page}>
                        <button className="user-page-btn sign-btn sign-up" type="button">회원가입</button>
                    </Link>
                </div>
            </form>
        </Wrapper>
    );
}

export default LoginPage
