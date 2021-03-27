import React, { useState, useRef } from 'react';
import axios from 'axios';
import { MainLogo } from '../../../../image/Images';
import { login_page, main_page } from '../../../../info_manage/page_url';
import { 
    UserRegisterMainScreen, 
    UserRegisterForm, 
    Form,
    UserImagePlace,
    UserImageLabel,
    InputDelimiter, 
    ConfirmDupButton,
    InputPassword,
    WarnText,
    UserRegisterButton,
    MoveLoginPage,
    MoveMainPage
} from './UserRegisterPageStyle'
import './UserRegisterPage.css';
import { Link, Redirect } from 'react-router-dom';

function ConfirmValue(asValue: string, delimiter: number) {
    let regExp: RegExp = /^/;

    if(delimiter === 0){
        regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    }else{
        regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/
    }

    return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}

function UserRegisterPage() {
    const [userimgBase64, setUserimgBase64] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        nickname: "",
        password: "",
        password_confirm: ""
    });
    const [warnText, setWarnText] = useState({
        email : "",
        nickname : "",
        password: "",
        password_comfirm: ""
    });

    let formData: FormData = new FormData();

    //========input box blur 처리=========
    const emailWarnText = () => {
        let warn: string ="";
        if(userData.email === "") warn = "* 이메일을 입력해주세요.";
        else if(ConfirmValue(userData.email, 0) === false) warn = "* 이메일 양식으로 입력해주세요.";
        else warn = "* 중복 확인을 해주세요.";
        setWarnText({
            ...warnText,
            email: warn
        });
    }
    const nicknameWarnText = () => {
        let warn: string = "";
        if(userData.nickname === "") warn = "* 별명을 입력해주세요.";
        else warn = "* 중복 확인을 해주세요.";
        setWarnText({
            ...warnText,
            nickname: warn
        });
    }
    const passwordWarnText = () => {
        let warn: string = "";
        if(userData.password === "") warn = "* 비밀번호를 입력해주세요."
        else if(ConfirmValue(userData.password, 1) === false) warn = "* 비밀번호양식은 8~25자리 숫자,영문자 혼합입니다."
        else warn = "비밀번호가 입력 완료되었습니다.";
        setWarnText({
            ...warnText,
            password: warn
        });
    }

    const passwordConfirmWarnText = () => {
        let warn: string = "";
        if(userData.password_confirm === "") warn = "* 비밀번호 확인을 입력해주세요.";
        else if(userData.password !== userData.password_confirm) warn = "* 비밀번호와 비밀번호 확인이 다릅니다.";
        else warn = "비밀번호와 비밀번호 확인이 일치합니다.";
        setWarnText({
            ...warnText,
            password_comfirm: warn
        });
    }
    //========input box blur 처리=========

    //========Image 미리보기 Script=========
    const fileChangeHandler = (e : any) => {
        const reader: FileReader = new FileReader();
        reader.onloadend = () =>{
            if(reader.result){
                setUserimgBase64(String(reader.result));
            }
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
            formData.append("user_image", e.target.files[0]);
        }
    };
    const imgRemoveHandler = () => {
        setUserimgBase64("");
        formData.delete("user_image");
    };
    //========Image 미리보기 Script=========

    //========Server로 Data를 전송하는 Script=========
    let register: boolean = false;
    let emailDuplicationConfirm: boolean = false;
    let nicknameDuplicationConfirm: boolean = false;

    const submit = (e : React.FormEvent<HTMLFormElement>) => {
        //formData에 입력받은 데이터들 정렬
        formData.set("email", userData.email);
        formData.set("nickname", userData.nickname);
        formData.set("password", userData.password);
        formData.set("user_rol", "0");
        formData.set("created_by", userData.nickname);
        formData.set("updated_by", userData.nickname);
        e.preventDefault();

    };
    //========Server로 Data를 전송하는 Script=========

    // if(register !== true){
    //     formData.delete("email");
    //     formData.delete("nickname");
    //     formData.delete("password");
    //     formData.delete("user_rol");
    //     formData.delete("created_by");
    //     formData.delete("updated_by");
    // }
    
    if(redirect === true){
        return <Redirect to={login_page}/>
    }

    return (
        <UserRegisterMainScreen>
            <UserRegisterForm>
                <Form onSubmit={submit}>
                    <a href={main_page}>
                        <img src={MainLogo} alt="Home" className="logo-img"/>
                    </a>
                    <div className="user-register-text">
                        회원가입
                    </div>
                    <div>대표사진설정</div>
                    {userimgBase64 ? 
                        <UserImagePlace src={userimgBase64} onClick={imgRemoveHandler}/>
                        : 
                        <div/>
                    }
                    <br/>
                    <UserImageLabel htmlFor="userimage-button">
                        내 PC에서 찾기
                    </UserImageLabel>
                    <br/>
                    <input id="userimage-button" type="file" onChange={fileChangeHandler} hidden/>
                    <br/>
                    <InputDelimiter onBlur={emailWarnText} placeholder="이메일 입력" autoFocus
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, email: e.target.value})}
                    />
                    <label>
                        <ConfirmDupButton>중복확인</ConfirmDupButton>
                    </label>
                    <WarnText>{warnText.email}</WarnText>
                    <InputDelimiter onBlur={nicknameWarnText} placeholder="닉네임 입력"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, nickname: e.target.value})}
                    />
                    <label>
                        <ConfirmDupButton>중복확인</ConfirmDupButton>
                    </label>
                    <WarnText>{warnText.nickname}</WarnText>
                    <InputPassword onBlur={passwordWarnText} type="password" placeholder="비밀번호 입력"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password: e.target.value})}
                    />
                    <WarnText>{warnText.password}</WarnText>
                    <InputPassword onBlur={passwordConfirmWarnText} type="password" placeholder="비밀번호 확인"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password_confirm: e.target.value})}
                    />
                    <WarnText>{warnText.password_comfirm}</WarnText>
                    <UserRegisterButton type="submit">가입하기</UserRegisterButton>
                    <Link to={login_page}>
                        <MoveLoginPage>로그인</MoveLoginPage>
                    </Link>
                    <Link to={main_page}>
                        <MoveMainPage>홈으로</MoveMainPage>
                    </Link>
                </Form>
            </UserRegisterForm>
        </UserRegisterMainScreen>
    );
}

export default UserRegisterPage;