import React, { useState } from 'react';
import Wrapper from '../../wrapper/Wrapper';
import InputBoxList from './InputBoxList';
import { user_image_path } from '../../../path/ImagePath';
import { login_page } from '../../../path/PagePath';
import './UserRegisterPage.scss';

const formData = new FormData();
function UserRegisterPage() {
    document.title="회원가입";
    const [userimgBase64, setUserimgBase64] = useState(user_image_path);
    const [userData, setUserData] = useState({
        email : "",
        nickname : "",
        password : "",
        password_confirm : ""
    });
    //컴포넌트로 상태 관리 하자...
    
    // 1. 이메일, 닉네임
    //  - 작성 안한경우 => onBlur null값 확인
    //  - 입력데이터의 양식이 맞지 않는경우
    //  - 입력데이터의 중복 확인 안한경우
    //  - 중복 확인 후 이메일이 다시 변경된 경우
    // 2. 비밀번호, 비밀번호 확인
    //  - 비밀번호 양식이 맞지 않는 경우
    //  - 비밀번호와 비밀번호 확인의 데이터가 일치하지 않는 경우

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
                    <InputBoxList 
                        containerCName="email-container"
                        title="이메일 주소"
                        id="email-box"
                        placeholder="이메일 입력"
                        inputType="text"
                    />
                    <InputBoxList 
                        containerCName="nickname-container"
                        title="별명"
                        id="nickname-box"
                        placeholder="별명 입력"
                        inputType="text"
                    />
                    <InputBoxList 
                        containerCName="password-container"
                        title="비밀번호"
                        id="password-box"
                        placeholder="비밀번호 입력"
                        inputType="password"
                    />
                    <InputBoxList 
                        containerCName="password-container"
                        title="비밀번호 확인"
                        id="password-confirm-box"
                        placeholder="비밀번호 확인"
                        inputType="password"
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
