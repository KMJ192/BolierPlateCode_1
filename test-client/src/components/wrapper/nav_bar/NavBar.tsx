import React, { useState } from 'react';
import './NavBar.scss';
import { Div, Ul } from './NavBarStyled';
import AfterLogin from './user_option/AfterLogin';
import BeforeLogin from './user_option/BeforeLogin';

function NavBar() {
    const [loginState, setLoginState] = useState(true);
    const [toggle, setToggle] = useState(false);
    const onToggle = () => {
        setToggle(!toggle);
    }
    return (
        <nav className="nav-bar">
            <div className="logo-container">
                <a href="/">
                    <i className="fas fa-code">Logo</i>
                </a>
            </div>
            <Ul toggle={toggle} {...toggle} className="nav-menu">
                <li>
                    <a href="/">
                        <i className="fas fa-home"></i>&nbsp;home
                    </a>
                </li>
                <li><a href="/">menu1</a></li>
                <li><a href="/">menu2</a></li>
            </Ul>
            <Ul toggle={toggle} {...toggle} className="search-container">
                <li><input type="text"></input></li>
                <li><button>검색</button></li>
            </Ul>
            <Div toggle={toggle} {...toggle}>
                {loginState ? <AfterLogin/> : <BeforeLogin/>}
            </Div>
            <div className="nav-toggle" onClick={onToggle}>
                <i className="fas fa-bars"></i>
            </div>
        </nav>
    )
}

export default NavBar