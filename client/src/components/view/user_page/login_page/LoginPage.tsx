import React from 'react';
import { Link } from 'react-router-dom';
import { MainLogo } from '../../../../image/Images';
import { main_page, user_register_page } from '../../../../info_manage/page_url';
import './LoginPage.css';
import { 
    LoginMainScreen, 
    LoginForm,
    Form,
    Input,
    LoginButton,
    MoveUserRegisterPage,
    MoveMainPage
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
                    <div className="remember-checkbox">
                        <input type="checkbox"/>기억하기
                    </div>
                    <LoginButton>
                        로그인
                    </LoginButton>
                    <Link to={user_register_page}>
                        <MoveUserRegisterPage>
                            회원가입
                        </MoveUserRegisterPage>
                    </Link>
                    <Link to={main_page}>
                        <MoveMainPage>
                            홈으로
                        </MoveMainPage>
                    </Link>
                </Form>
            </LoginForm>
        </LoginMainScreen>
    );
}

export default LoginPage
