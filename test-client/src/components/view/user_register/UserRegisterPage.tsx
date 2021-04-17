import React, { useState } from 'react';
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { user_image_path } from '../../../path/ImagePath';
import Wrapper from '../../wrapper/Wrapper';
import './UserRegisterPage.scss';
import InputBoxList from './InputBoxList';

function UserRegisterPage() {
    document.title="회원가입";
    const [userimgBase64, setUserimgBase64] = useState(user_image_path);

    const validate = Yup.object({
        email: Yup.string()
            .email("이메일 양식에 맞춰주세요")
            .required("이메일을 작성해주세요"),
        nickname: Yup.string()
            .min(2, "별명은 2글자 이상입니다")
            .max(20, "20자 내로 작성해주세요")
            .required("별명을 작성해주세요"),
        password : Yup.string()
            .min(6, "비밀번호는 최소 6자입니다")
            .required("비밀번호를 작성해주세요"),
        password_confirm : Yup.string()
            .oneOf([Yup.ref("password"), null], "비밀번호 확인과 다릅니다")
            .required("비밀번호확인을 작성해주세요")
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            nickname : "",
            password : "",
            password_confirm : ""
        },
        onSubmit: values =>{
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <Wrapper>
            <form onSubmit={formik.handleSubmit} className="user-register-form">
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
                    {/* 
                    <div className="email-container">
                        <div>이메일</div>
                        <input type="text" placeholder="이메일 입력"/>
                    </div>
                    <div className="nickname-container">
                        <div>별명</div>
                        <input type="text" placeholder="별명 입력"/>
                    </div>
                    <div className="password-container">
                        <div>비밀번호</div>
                        <input type="password" placeholder="비밀번호 입력"/>
                    </div>
                    <div className="password-container">
                        <div>비밀번호 확인</div>
                        <input type="password" placeholder="비밀번호 확인"/>
                    </div> */}
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
