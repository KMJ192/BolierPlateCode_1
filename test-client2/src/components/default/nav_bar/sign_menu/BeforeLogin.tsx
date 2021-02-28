import React from 'react';
import './BeforeLogin.css';

const BeforLogin  = () => {
    return (
        <div>
            <a id="login-button" href="/login_user">Login</a>
            <a id="signup-button" href="/register_user">SignUp</a>
        </div>
    )
}

export default BeforLogin