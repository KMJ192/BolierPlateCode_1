import React, { useState } from 'react';
import { user_image_path } from '../../../path/ImagePath';
import Wrapper from '../../wrapper/Wrapper';
import './UserRegisterPage.scss';

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
                </div>
            </form>
        </Wrapper>
    )
}

export default UserRegisterPage
