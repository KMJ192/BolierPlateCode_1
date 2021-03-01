import React from 'react';
import './AfterLogin.css'
import axios from 'axios';

function AfterLogin(props : any) {
    let userlogState;

    userlogState = async () => {
        await axios.post("/api/logout", {});
    }
    
    return (
        <div id="user-container">
            <a href="/">
                <img id="user-logo" src={props.image} alt="회원사진"/>
            </a>
            <a id="user-name" href="/">{props.name}</a>
            <a id="login-button" href="/" onClick={userlogState}>Logout</a>
        </div>
    )
}

export default AfterLogin

