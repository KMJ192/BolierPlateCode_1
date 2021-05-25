import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-module/RootReducer';
import Wrapper from '../../wrapper/Wrapper';
import { user_register_page } from '../../../path/PagePath';
import { StyledLoginContainer } from './LoginPageStyle';
import './LoginPage.scss';
import LoginInput from './input/LoginInput';
import LoginButton from './button/LoginButton';

const defaultLoginContainerWidth : number = 392;
const diffLoginContainerWidth : number = 72;

const defaultLoginContainerHeight : number = 490;
const diffLoginContainerHeight : number = 125;

function LoginPage() {
    document.title="로그인";
    const [winWidth, setWinWidth] = useState(defaultLoginContainerWidth);
    const [winHeight, setWinHeight] = useState(defaultLoginContainerHeight);
    const [redirect, setRedirect] = useState(false);
    const [loginData, setLoginData] = useState({
        email : "",
        password : ""
    });

    const windowSize = useSelector((state : RootState) => state.screen_size);

    useEffect(() => {
        if(windowSize.width < 460 && windowSize.width > 245
            && winWidth !== (windowSize.width - diffLoginContainerWidth)) {
            setWinWidth(windowSize.width - diffLoginContainerWidth);
        }
        if(windowSize.width >= 460 && winWidth !== defaultLoginContainerWidth) {
            setWinWidth(defaultLoginContainerWidth);
        }

        if(windowSize.height < 610 && windowSize.height > 515
            && winHeight !== (windowSize.height - diffLoginContainerHeight)){
            setWinHeight(windowSize.height - diffLoginContainerHeight);
        }
        if(windowSize.height >= 610 && winHeight !== defaultLoginContainerHeight){
            setWinHeight(defaultLoginContainerHeight);
        }
    }, [winWidth, winHeight, windowSize]);

    const setEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, email : e.target.value});
    }
    const setPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, password : e.target.value})
    }

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

        const response = await axios.post('/login', loginData)
            .then((response : AxiosResponse) => response.data)
            .catch((err : AxiosError) => err);

        if(response) {
            if(response["login"] === true) setRedirect(true);
            else{
                if(response["message"] === "E-P-00")
                    alert("비밀번호가 틀렸습니다.");
                else if(response["message"] === "E-P-01")
                    alert("등록된 이메일이 아닙니다.");
                else
                    alert("오류가 발생했습니다. 오류내용 : [" + response + "]");
            }
        }else{
            alert("알수없는 오류가 발생했습니다.");
        }
    }

    if(redirect === true){
        return <Redirect to="/"/>
    }
    return (
        <Wrapper>
            <form className="user-login-form" onSubmit={tryLogin}>
                <StyledLoginContainer 
                    className="login-container"
                    width={winWidth} {...winWidth}
                    height={winHeight} {...winHeight}
                >
                    <div className="login-des">
                        로그인
                    </div>
                    <br/>
                    <div className="input-login-des">이메일</div>
                    <LoginInput
                        className="input-box email-input"
                        placeholder="이메일 입력"
                        type="email"
                        setData={setEmail}
                    />
                    <div className="input-login-des">비밀번호</div>
                    <LoginInput
                        className="input-box password-input"
                        placeholder="비밀번호 입력"
                        type="password"
                        setData={setPassword}
                    />
                    <br/>
                    <input className="remember-box" type="checkbox"/>기억하기
                    <br/>
                    <LoginButton
                        type="submit"
                        className="user-page-btn sign-btn"
                        value="로그인"
                    />
                    <br/>
                    <Link to={user_register_page}>
                        <LoginButton
                            type="button"
                            className="user-page-btn sign-btn sign-up"
                            value="회원가입"
                        />
                    </Link>
                </StyledLoginContainer>
            </form>
        </Wrapper>
    );
}

export default React.memo(LoginPage);
