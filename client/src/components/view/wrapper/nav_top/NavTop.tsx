import React from 'react'
import './NavTop.css';
import '../../../../Style/button.css';

function NavTop() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <div className="logo-container">
                    <a href="#">
                        <i className="fab fa-rust logo"></i>
                        Logo
                    </a>
                </div>
            </div>
            <ul className="navbar-menu">
                <li><a href="#">menu1</a></li>
                <li><a href="#">menu2</a></li>
                <li><a href="#">menu3</a></li>
            </ul>
            <form className="search-container">
                <input type="text"/>
                <button className="btn">search</button>
            </form>
            <button className="btn login-btn">로그인</button>
            <a href="#" className="navbar-toggle-btn">
                <i className="fas fa-bars"></i>
            </a>
        </nav>
    )
}

export default NavTop