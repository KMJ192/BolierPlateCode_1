import React from 'react';
import { MainLogo } from '../../../../image/Images';
import { main_page } from '../../../../info_manage/page_url';
import './LoginPage.css';
import { 
    LoginMainScreen, 
    LoginForm,
    Form,
    Input,
    LoginButton
 } from './LoginPageStyle';

function LoginPage() {
    return (
        <LoginMainScreen>
            <LoginForm>
                <Form>
                    <a href={main_page}>
                        <img src={MainLogo} alt="Home" className="logo-img"/>
                    </a>
                    <div className="login-text">
                        로그인
                    </div>
                    <Input placeholder="이메일 입력" autoFocus/>
                    <Input placeholder="비밀번호 입력"/>
                    <br/>
                    <input className="remember-checkbox" type="checkbox"/>기억하기
                    <br/>
                    <LoginButton>
                        로그인
                    </LoginButton>                    
                </Form>
            </LoginForm>
        </LoginMainScreen>
    );
}

export default LoginPage
