import React, { useState } from 'react'
import { MainLogo } from '../../../../image/Images'
import { login_page, main_page } from '../../../../info_manage/page_url'
import { 
    UserRegisterMainScreen, 
    UserRegisterForm, 
    Form,
    UserImagePlace,
    UserImageLabel,
    InputDelimiter, 
    InputPassword,
    ConfirmDupButton,
    UserRegisterButton,
    MoveLoginPage,
    MoveMainPage
} from './UserRegisterPageStyle'
import './UserRegisterPage.css';
import { Link } from 'react-router-dom';

function UserRegisterPage() {
    //let formData: FormData = new FormData();
    const [userimgBase64, setUserimgBase64] = useState("");

    const fileChangeHandler = (e : any) => {
        const reader: FileReader = new FileReader();
        reader.onloadend = () =>{
            if(reader.result){
                setUserimgBase64(String(reader.result));
            }
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const imgRemoveHandler = () => {
        setUserimgBase64("");
    };

    return (
        <UserRegisterMainScreen>
            <UserRegisterForm>
                <Form>
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
                    <InputDelimiter placeholder="이메일 입력" autoFocus/>
                    <label>
                        <ConfirmDupButton>중복확인</ConfirmDupButton>
                    </label>
                    <InputDelimiter placeholder="닉네임 입력"/>
                    <label>
                        <ConfirmDupButton>중복확인</ConfirmDupButton>
                    </label>
                    <InputPassword type="password" placeholder="비밀번호 입력"/>
                    <InputPassword type="password" placeholder="비밀번호 확인"/>
                    <br/>
                    <UserRegisterButton>
                        가입하기
                    </UserRegisterButton>
                    <Link to={login_page}>
                        <MoveLoginPage>
                            로그인
                        </MoveLoginPage>
                    </Link>
                    <Link to={main_page}>
                        <MoveMainPage>홈으로</MoveMainPage>
                    </Link>
                </Form>
            </UserRegisterForm>
        </UserRegisterMainScreen>
    );
}

export default UserRegisterPage
