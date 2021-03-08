import React from 'react';
import './BeforeLogin.css';

const BeforLogin  = () => {
    return (
        <div className="btn-group btn-group-sm befor-login-container">
            <a href="/login_user">
                <button type="button" className="btn btn-secondary btn-sm">&nbsp;로그인&nbsp;</button>
            </a>
            <a href="/register_user">
                <button type="button" className="btn btn-secondary btn-sm">회원가입</button>
            </a>
        </div>
    )
}

export default BeforLogin