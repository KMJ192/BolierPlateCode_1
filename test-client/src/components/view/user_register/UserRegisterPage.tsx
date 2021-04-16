import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { user_image_path } from '../../../path/ImagePath';
import Wrapper from '../../wrapper/Wrapper';
import './UserRegisterPage.scss';
//import * as Yup from 'yup';

function UserRegisterPage() {
    document.title="회원가입";
    const [userimgBase64, setUserimgBase64] = useState(user_image_path);

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
                    <div className="email-container">
                        <div>이메일 주소</div>
                        <input type="text" placeholder="이메일 입력"/>
                    </div>
                    <div className="nickname-container">
                        <div>별명</div>
                        <input type="text" placeholder="별명 입력"/>
                    </div>
                    <div className="password-container">
                        <div>비밀번호</div>
                        <input type="password" placeholder="비밀번호 입력"/>
                        <div>비밀번호 확인</div>
                        <input type="password" placeholder="비밀번호 확인"/>
                    </div>
                    <div className="btn-container">
                        <button type="submit">가입하기</button>
                        <button type="button">로그인</button>
                        <button type="button">홈</button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default UserRegisterPage
