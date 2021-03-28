import React, { useState } from 'react';
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
import check from './check.svg';
import { ReqServerJSON, ConfirmUserForm} from '../../../../function_module/RequestServer';

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
        email : ["", false],
        nickname : ["", false],
        password: ["", false],
        password_comfirm: ["", false]
    });
    const [dupData, setDupData] = useState({
        email: false,
        nickname: false,
    })
    const [register, setRegister] = useState(false);

    let formData: FormData = new FormData();

    //========input box blur 처리=========
    let warn: string ="";
    let blurText: boolean = false;
    const emailWarnText = () => {
        if(userData.email === "") warn = "* 이메일을 입력해주세요.";
        else if(ConfirmUserForm(userData.email, 0) === false) warn = "* 이메일 양식으로 입력해주세요.";
        else {
            blurText = true;
            warn = "* 중복 확인을 해주세요.";
        }
        setWarnText({
            ...warnText,
            email: [warn, blurText]
        });
    }
    const nicknameWarnText = () => {
        if(userData.nickname === "") warn = "* 별명을 입력해주세요.";
        else {
            blurText = true;
            warn = "* 중복 확인을 해주세요.";
        }
        setWarnText({
            ...warnText,
            nickname: [warn, blurText]
        });
    }
    const passwordWarnText = () => {
        if(userData.password === "") warn = "* 비밀번호를 입력해주세요."
        else if(ConfirmUserForm(userData.password, 1) === false) warn = "* 비밀번호양식은 8~25자리 숫자,영문자 혼합입니다."
        else{
            blurText = true;
            warn = "비밀번호가 입력 완료되었습니다.";
        } 
        setWarnText({
            ...warnText,
            password: [warn, blurText]
        });
    }
    const passwordConfirmWarnText = () => {
        if(userData.password === "") warn = "* 비밀번호를 입력해주세요.";
        else{
            if(userData.password_confirm === "") warn = "* 비밀번호 확인을 입력해주세요.";
            else if(userData.password !== userData.password_confirm) warn = "* 비밀번호와 비밀번호 확인이 다릅니다.";
            else{
                blurText = true;
                warn = "비밀번호와 비밀번호 확인이 일치합니다.";
            } 
        }
        setWarnText({
            ...warnText,
            password_comfirm: [warn, blurText]
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
            formData.set("user_image", e.target.files[0]);
        }
    };
    const imgRemoveHandler = () => {
        setUserimgBase64("");
        formData.delete("user_image");
    };
    //========Image 미리보기 Script=========

    //========Server로 Data를 전송하는 Script=========
    const confirmEmail = () => {
        if(userData.email === '') alert("* 이메일을 입력해주세요.")
        else if(warnText.email[1] === false) alert(warnText.email[0]);
        else{
            const reqData = {
                email : userData.email
            }
            ReqServerJSON('/email_confirm', reqData, 1);
        }
        setDupData({
            ...dupData,
            email: true,
        });
    }
    const confirmNickname = () => {
        if(userData.nickname === '') alert("* 별명을 입력해주세요.");
        else{
            const reqData = {
                nickname : userData.nickname
            }
            ReqServerJSON('/nickname_confirm', reqData, 1);
        }
        setDupData({
            ...dupData,
            nickname: true,
        });
    }

    const submit = async (e : React.FormEvent<HTMLFormElement>) => {
        //formData에 입력받은 데이터들 정렬
        formData.set("email", userData.email);
        formData.set("nickname", userData.nickname);
        formData.set("password", userData.password);
        formData.set("user_rol", "0");
        formData.set("created_by", userData.nickname);
        formData.set("updated_by", userData.nickname);
        e.preventDefault();
        await axios.post("/register_user", formData)
            .then((response) => {
                //console.log(response);
            })
    };
    //========Server로 Data를 전송하는 Script=========
    
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
                        <ConfirmDupButton onClick={confirmEmail}>중복확인</ConfirmDupButton>
                    </label>
                    <WarnText font={dupData.email} {...dupData.email}>
                        {dupData.email && <img src={check} alt="confirm"/>}
                        {dupData.email ? "사용할 수 있는 이메일 입니다." : warnText.email[0]}
                    </WarnText>
                    <InputDelimiter onBlur={nicknameWarnText} placeholder="닉네임 입력"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, nickname: e.target.value})}
                    />
                    <label>
                        <ConfirmDupButton onClick={confirmNickname}>중복확인</ConfirmDupButton>
                    </label>
                    <WarnText font={dupData.nickname} {...dupData.nickname}>
                        {dupData.nickname && <img src={check} alt="confirm"/>}
                        {dupData.nickname ? "사용할 수 있는 닉네임 입니다." : warnText.nickname[0]}
                    </WarnText>
                    <InputPassword onBlur={passwordWarnText} type="password" placeholder="비밀번호 입력"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password: e.target.value})}
                    />
                    <WarnText font={warnText.password[1]} {...warnText.password[1]}>
                        {warnText.password[1] && <img src={check} alt="confirm"/>}
                        {warnText.password[0]}
                    </WarnText>
                    <InputPassword onBlur={passwordConfirmWarnText} type="password" placeholder="비밀번호 확인"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password_confirm: e.target.value})}
                    />
                    <WarnText font={warnText.password_comfirm[1]} {...warnText.password_comfirm[1]}>
                        {warnText.password_comfirm[1] && <img src={check} alt="confirm"/>}
                        {warnText.password_comfirm[0]}
                    </WarnText>
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