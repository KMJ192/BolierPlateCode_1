import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
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
import { loginUser } from '../../../../redux_module/user/actions';

function LoginPage() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email : "",
        password : ""
    });
    
    const [redirection, setRedirection] = useState(false);
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser(userData));

        // await axios.post("/login", userData).then(response => {
        //     if(response.data["login"] === true){
        //         alert("로그인이 완료되었습니다");
        //         setRedirection(true);
        //     }else{
        //         if(response.data["message"] === "Different pw"){
        //             alert("비밀번호가 틀렸습니다.");
        //         }else if(response.data["message"] === "None email"){
        //             alert("이메일이 없습니다.");
        //         }else{
        //             alert("알수없는 오류가 발생했습니다.");
        //         }
        //     }
        // }).catch(err => {
        //     alert("오류발생 : "+ err);
        // });
    }

    if(redirection === true){
        return <Redirect to={main_page}/>
    }

    return (
        <LoginMainScreen>
            <LoginForm>
                <Form onSubmit={submit}>
                    <a href={main_page}>
                        <img src={MainLogo} alt="Home" className="logo-img"/>
                    </a>
                    <div className="login-text">
                        로그인
                    </div>
                    <Input placeholder="이메일 입력" autoFocus
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, email : e.target.value})}
                    />
                    <Input placeholder="비밀번호 입력" type="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password: e.target.value})}
                    />
                    <br/>
                    <div className="remember-checkbox">
                        <input type="checkbox"/>기억하기
                    </div>
                    <LoginButton type="submit">
                        로그인
                    </LoginButton>
                    <Link to={user_register_page}>
                        <MoveUserRegisterPage type="button">
                            회원가입
                        </MoveUserRegisterPage>
                    </Link>
                    <Link to={main_page}>
                        <MoveMainPage type="button">
                            홈으로
                        </MoveMainPage>
                    </Link>
                </Form>
            </LoginForm>
        </LoginMainScreen>
    );
}

export default LoginPage
