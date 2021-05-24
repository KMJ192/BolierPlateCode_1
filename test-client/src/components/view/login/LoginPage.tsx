import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-module/RootReducer';
import Wrapper from '../../wrapper/Wrapper';
import { user_register_page } from '../../../path/PagePath';
import {StyledLoginContainer, StyledLoginInput, StyledLoginButton } from './LoginPageStyle';
import './LoginPage.scss';

const defaultLoginContainerWidth : number = 392;
const defaultInputWidth : number = 300;
const defualtButtonWidth : number = 325;

const diffLoginContainerWidth : number = 72;
const diffInputWidth : number = 140;
const diffButtonWidth : number = 120;

function LoginPage() {
    document.title="로그인";
    const [winWidth, setWinWidth] = useState({
        loginContainer : defaultLoginContainerWidth,
        input : defaultInputWidth,
        button : defualtButtonWidth
    });
    const [winHeight, setWinHeight] = useState(490);
    const [redirect, setRedirect] = useState(false);
    const [loginData, setLoginData] = useState({
        email : "",
        password : ""
    });

    const windowSize = useSelector((state : RootState) => state.screen_size);

    useEffect(() => {
        if(windowSize.width < 460 && windowSize.width > 245
            && winWidth.loginContainer !== (windowSize.width - diffLoginContainerWidth)) {
            setWinWidth({ 
                ...winWidth, 
                loginContainer : (windowSize.width - diffLoginContainerWidth) 
            });
        }
        if(windowSize.width >= 460 && windowSize.width > 245
            && winWidth.loginContainer !== defaultLoginContainerWidth) {
            setWinWidth({ 
                ...winWidth, 
                loginContainer : defaultLoginContainerWidth 
            });
        }

        if(windowSize.width < 435 && windowSize.width > 245){
            if(winWidth.input !== (windowSize.width - diffInputWidth)){
                setWinWidth({
                    ...winWidth,
                    input : (windowSize.width - diffInputWidth),
                });
            }
            if(winWidth.button !== (windowSize.width - diffButtonWidth)){
                setWinWidth({
                    ...winWidth,
                    button : (windowSize.width - diffButtonWidth),
                });
            }
        }
        if(windowSize.width >= 435){
            if(winWidth.input !== defaultInputWidth){
                setWinWidth({
                    ...winWidth,
                    input : defaultInputWidth
                });
            }
            if(winWidth.button !== defualtButtonWidth){
                setWinWidth({
                    ...winWidth,
                    button : defualtButtonWidth
                })
            }
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
                    width={winWidth.loginContainer} {...winWidth.loginContainer}
                    height={winHeight} {...winHeight}
                >
                    <div className="login-des">
                        로그인
                    </div>
                    <br/>
                    <div className="input-login-des">이메일</div>
                    <StyledLoginInput 
                        autoFocus
                        className="input-box email-input" 
                        placeholder="이메일 입력" 
                        onChange={setEmail}
                        width={winWidth.input} {...winWidth.input}
                    />
                    <div className="input-login-des">비밀번호</div>
                    <StyledLoginInput 
                        className="input-box password-input" 
                        placeholder="비밀번호 입력"
                        type="password" 
                        onChange={setPassword}
                        width={winWidth.input} {...winWidth.input}
                    />
                    <br/>
                    <input className="remember-box" type="checkbox"/>기억하기
                    <br/>
                    <StyledLoginButton 
                        className="user-page-btn sign-btn" 
                        type="submit"
                        width={winWidth.button} {...winWidth.button}
                    >
                        로그인
                    </StyledLoginButton>
                    <br/>
                    <Link to={user_register_page}>
                        <StyledLoginButton
                            className="user-page-btn sign-btn sign-up" 
                            type="button"
                            width={winWidth.button} {...winWidth.button}
                        >
                            회원가입
                        </StyledLoginButton>
                    </Link>
                </StyledLoginContainer>
            </form>
        </Wrapper>
    );
}

export default React.memo(LoginPage);
