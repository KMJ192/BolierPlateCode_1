import React from 'react'
import { login_page, user_register_page } from '../../../../path/PagePath'

function BeforeLogin() {
    return (
        <div className="sign-container">
            <button>
                <a href={user_register_page}>회원가입</a>
            </button>
            <button>
                <a href={login_page}>로그인</a>
            </button>
        </div>
    )
}

export default BeforeLogin
