import React from 'react'
import { login_page, user_register_page } from '../../../../path/PagePath'

function BeforeLogin() {
    return (
        <div className="sign-container">
            <a href={user_register_page}>
                <button className="btn">회원가입</button>
            </a>
            <a href={login_page}>
                <button className="btn">로그인</button>
            </a>
        </div>
    );
}

export default React.memo(BeforeLogin);