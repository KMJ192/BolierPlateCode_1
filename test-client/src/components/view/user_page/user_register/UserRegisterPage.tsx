import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { login_page } from '../../../../path/PagePath';
import Wrapper from '../../../wrapper/Wrapper';
import UserPage from '../UserPage';

function UserRegisterPage() {
    document.title="회원가입";
    const [redirect, setRedirect] = useState(false);

    const request = async (formData : FormData) => {
        const response = await axios.post("/register_user", formData)
            .then(response => response.data)
            .catch(err => err);
        console.log(response);

        if(response["result"]){
            setRedirect(true);
            alert("가입이 완료되었습니다");
            return;
        }
        if(response["User rol error"]) alert("잘못된 유저 role 입니다.");
        else alert("알 수 없는 오류가 발생했습니다.");
    };


    if(redirect){
        return <Redirect to={login_page}/>;
    }
    return (
        <Wrapper>
            <UserPage
                pageName="UserRegister"
                formTitle="가입정보"
                email="이메일 입력"
                userNickname="별명입력"
                buttonValue="가입하기"
                requestFunction={request}
            />
        </Wrapper>
    );
}

export default UserRegisterPage;
