import React from 'react';
import './AfterLogin.css'
import axios from 'axios';

function AfterLogin(props : any) {
    let userlogState;

    userlogState = async () => {
        await axios.post("/logout", {});
    }
    
    return (
        <div>
            <ul className="nav ml-auto user-menu">
                <li className="nav-item nav-item-user display-lg-up dropdown show">
                    <a href="#" className="nav-link" data-toggle="dropdown" aria-expanded="true">
                        <img id="user-logo" src={props.image} alt="회원사진"/>
                    </a>
                </li>
            </ul>
            <div className="dropdown-menu dropdown-menu-right show">
                <div className="dorpdown-group">
                    <div className="dropdown-item">{props.name} 님</div>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dorpdown-group">
                    <a className="dropdown-item" href="/">정보수정</a>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-gruop">
                    <a className="dropdown-item" href="/" onClick={userlogState}>Logout</a>
                </div>
            </div>
        </div>
    )
}

export default AfterLogin