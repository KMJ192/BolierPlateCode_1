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
import { ConfirmUserForm } from '../../../../function_module/UserForm';
import check from './check.svg';

const formData: FormData = new FormData();
function UserRegisterPage() {
    const [userimgBase64, setUserimgBase64] = useState("");
    const [redirect, setRedirect] = useState(false);
    //server로 보낼 유저 정보관리
    const [userData, setUserData] = useState({
        useremail: "",
        nickname: "",
        password: "",
        password_confirm: ""
    });
    //카테고리별 조건과 유저가 양식에 맞췄는지에 대한 정보 관리
    const [warnText, setWarnText] = useState({
        useremail : ["", false],
        nickname : ["", false],
        password: ["", false],
        password_comfirm: ["", false]
    });
    //유저 정보가 중복되었는지에 대한 정보 관리
    const [dupData, setDupData] = useState({
        useremail: false,
        nickname: false,
    })
    //유저 정보 중복 확인 후 다시 바뀔 경우 대비하여 관리
    const [userDataTmp, setUserDataTmp] = useState({
        useremail: "",
        nickname: ""
    });
    //========input box blur 처리=========
    let warn: string ="";
    let blurText: boolean = false;
    const emailWarnText = () => {
        if(userData.useremail === "") warn = "* 이메일을 입력해주세요.";
        else if(ConfirmUserForm(userData.useremail, 0) === false) warn = "* 이메일 양식으로 입력해주세요.";
        else {
            blurText = true;
            warn = "* 중복 확인을 해주세요.";
        }
        setWarnText({
            ...warnText,
            useremail: [warn, blurText]
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
    const fileChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const reader: FileReader = new FileReader();
        reader.onloadend = () =>{
            if(reader.result){
                setUserimgBase64(String(reader.result));
            }
        }
        if(e.target.files){
            reader.readAsDataURL(e.target.files[0]);
            formData.set("user_image", e.target.files[0]);
        }
    };
    const imgRemoveHandler = () => {
        setUserimgBase64("");
    };
    //========Image 미리보기 Script=========

    //########### Script that sends a reqeust to the server ###########

    //======== Duplicate check email, password ==========
    const confirmEmail = async () => {
        //email칸이 비어있지 않고, email양식대로 입력이 되었을 경우 중복확인 진행
        if(userData.useremail === '') alert("* 이메일을 입력해주세요.");
        else if(warnText.useremail[1] === false) alert(warnText.useremail[0]);
        else{
            await axios.post('/email_confirm',{
                email : userData.useremail
            }).then(response => {
                if(response.data["result"] === 0){
                    setUserDataTmp({
                                ...userDataTmp,
                                useremail: userData.useremail
                            });
                             setDupData({
                                ...dupData,
                                useremail: true,
                            });
                }else if(response.data["result"] === 1){
                    setWarnText({
                        ...warnText,
                        useremail: ["* 중복된 이메일입니다.", true]
                    });
                    setDupData({
                        ...dupData,
                        useremail : false
                    });
                }else{
                    alert("알수 없는 오류");
                }
            });
        }
    }
    const confirmNickname = async () => {
        //별명 칸이 빈칸이 아닐경우 중복 확인 진행
        if(userData.nickname === '') alert("* 별명을 입력해주세요.");
        else{
            await axios.post('/nickname_confirm', {
                nickname: userData.nickname
            }).then(response => {
                if(response.data["result"] === 0){
                    //Dose not duplicated nickname
                    setUserDataTmp({
                        ...userDataTmp,
                        nickname: userData.nickname
                    });
                    setDupData({
                        ...dupData,
                        nickname: true,
                    });
                }else if(response.data["result"] === 1){
                    //Duplicated nickname
                    setWarnText({
                        ...warnText,
                        nickname: ["* 중복된 별명입니다.", true]
                    });
                    setDupData({
                        ...dupData,
                        nickname: false,
                    });
                }else{
                    alert("알 수 없는 오류");
                }
            })
        }
    }
    //------------- Detecting data change after duplication check ---------------
    if(userData.useremail !== userDataTmp.useremail && dupData.useremail === true){
        setDupData({
            ...dupData,
            useremail: false
        });
    }
    if(userData.nickname !== userDataTmp.nickname && dupData.nickname === true){
        setDupData({
            ...dupData,
            nickname: false
        });
    }
    //------------- Detecting data change after duplication check ---------------

    //======== Duplicate check email, password ==========

    //======== User register Request to server ==========
    const submit = async (e : React.FormEvent<HTMLFormElement>) => {
        //formData에 입력받은 데이터들 정렬
        e.preventDefault();
        if(dupData.useremail === false) alert("* 이메일 확인해주세요.");
        else if(dupData.nickname === false) alert("* 별명 확인해주세요.");
        else if(warnText.password[1] === false) alert("* 비밀번호를 확인해주세요.");
        else if(warnText.password_comfirm[1] === false) alert("* 비밀번호 확인을 확인해주세요.");
        else{
            formData.set("email", userData.useremail);
            formData.set("nickname", userData.nickname);
            formData.set("password", userData.password);
            formData.set("user_rol", "0");
            formData.set("created_by", userData.nickname);
            formData.set("updated_by", userData.nickname);
            await axios.post("/register_user", formData)
                .then((response) => {
                    if(response.data["registered"] === true){
                        alert("회원가입이 완료되었습니다.");
                        setRedirect(true);
                    }else{
                        alert("알 수 없는 오류가 발생하였습니다. 다시 시도해주세요");
                    }
                });
        }
    };
    //======== User register Request to server ==========

    //########### Script that sends a reqeust to the server ###########
    
    //회원가입 완료 시 로그인페이지로 이동
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, useremail: e.target.value})}
                    />
                    <label>
                        <ConfirmDupButton onClick={confirmEmail} type="button">중복확인</ConfirmDupButton>
                    </label>
                    <WarnText font={dupData.useremail} {...dupData.useremail}>
                        {dupData.useremail && <img src={check} alt="confirm"/>}
                        {dupData.useremail ? "사용할 수 있는 이메일 입니다." : warnText.useremail[0]}
                    </WarnText>
                    <InputDelimiter onBlur={nicknameWarnText} placeholder="닉네임 입력"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, nickname: e.target.value})}
                    />
                    <label>
                        <ConfirmDupButton onClick={confirmNickname} type="button">중복확인</ConfirmDupButton>
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