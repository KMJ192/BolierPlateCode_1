import React from 'react';
import Wrapper from '../../../wrapper/Wrapper';
import UserPage from '../UserPage';

const formData = new FormData();
function UserRegisterPage() {
    document.title="회원가입";

    return (
        <Wrapper>
            <UserPage/>
        </Wrapper>
    );
}

export default UserRegisterPage;
