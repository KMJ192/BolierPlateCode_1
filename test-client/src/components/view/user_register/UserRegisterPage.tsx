import React, { useState } from 'react';
import Wrapper from '../../wrapper/Wrapper';
import { user_image_path } from '../../../path/ImagePath';
import { login_page } from '../../../path/PagePath';
import EmailBox from './input_box/EmailBox';
import NicknameBox from './input_box/NicknameBox';
import PasswordBox from './input_box/PasswordBox';
import './UserRegisterPage.scss';

const formData = new FormData();
function UserRegisterPage() {
    document.title="회원가입";
    const [userimgBase64, setUserimgBase64] = useState(user_image_path);
    const [userData, setUserData] = useState({
        email : ["", false],
        nickname : ["", false],
        password : ["", false],
        password_confirm : ["", false]
    });

    const getEmail = (data : string, re : boolean) => {
        setUserData({ ...userData, email : [data, re] });
    }
    const getNickname = (data : string, re : boolean) => {
        setUserData({ ...userData, nickname : [data, re] });
    }
    const getPassword = (data : string, re : boolean) => {
        //console.log(data, re);
        setUserData({ ...userData, password : [data, re] });
    }   

    const submit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userData.email);
        console.log(userData.nickname);
        console.log(userData.password);
    }

    return (
        <Wrapper>
            <form onSubmit={submit} className="user-register-form">
                <div className="user-image-container">
                    <div className="user-img-des">프로필 이미지</div>
                    <img className="user-image" src={userimgBase64} alt="대표이미지"/>
                    <label htmlFor="user-img-input">
                        프로필 이미지 설정
                    </label>
                    <input id="user-img-input" type="file" hidden></input>
                    <span>대표 이미지를 추가하세요.</span>
                </div>
                <div className="user-info-container">
                    <div className="user-data-des">가입정보</div>
                    <EmailBox 
                        returnEmail={getEmail}
                    />
                    <NicknameBox 
                        returnNickname={getNickname}
                    />
                    <PasswordBox 
                        returnPassword={getPassword}
                    />
                    <div className="btn-container">
                        <button type="submit">가입하기</button>
                        <a href={login_page}><button type="button">로그인 하기</button></a>
                        <a href="/"><button type="button">돌아가기</button></a>
                    </div>
                </div>
            </form>

        </Wrapper>
    )
}

export default UserRegisterPage
