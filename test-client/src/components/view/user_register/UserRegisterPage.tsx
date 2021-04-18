import React, { useState } from 'react';
import Wrapper from '../../wrapper/Wrapper';
import { user_image_path } from '../../../path/ImagePath';
import { login_page } from '../../../path/PagePath';
import './UserRegisterPage.scss';
import EmailBox from './input_box/EmailBox';
import NicknameBox from './input_box/NicknameBox';
import PasswordBox from './input_box/PasswordBox';
import PasswordConfirmBox from './input_box/PasswordConfirmBox';

const formData = new FormData();
function UserRegisterPage() {
    document.title="회원가입";
    const [userimgBase64, setUserimgBase64] = useState(user_image_path);
    //PasswordBox컴포넌트에서 PasswordConfirmBox컴포넌트로 password를 넘겨주기 위함
    const [password, setPassword] = useState(""); 
    const [userData, setUserData] = useState({
        email : "",
        nickname : "",
        password : "",
        password_confirm : ""
    });
    const getEmail = (data : string) => {
        console.log(data);
    }
    const getNickname = (data : string) => {
        console.log(data);
    }
    const getPassword = (data : string) => {
        setPassword(data);
    }
    return (
        <Wrapper>
            <form className="user-register-form">
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
                        containerCName="email-container"
                        title="이메일 주소"
                        id="email-box"
                        placeholder="이메일 입력"
                        inputType="text"
                        returnEmail={getEmail}
                    />
                    <NicknameBox 
                        containerCName="nickname-container"
                        title="별명"
                        id="nickname-box"
                        placeholder="별명 입력"
                        inputType="text"
                        returnNickname={getNickname}
                    />
                    <PasswordBox 
                        containerCName="password-container"
                        title="비밀번호"
                        id="password-box"
                        placeholder="비밀번호 입력"
                        inputType="password"
                        returnPassword={getPassword}
                    />
                    <PasswordConfirmBox 
                        containerCName="password-container"
                        title="비밀번호 확인"
                        id="password-confirm-box"
                        placeholder="비밀번호 확인"
                        inputType="password"
                        password={password}
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
