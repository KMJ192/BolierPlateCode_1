import React from 'react';
import UserMenu from './user_menu/UserMenu';
import logo from './rust_logo.png'
import './NavBar.css';

const NavBar = () => {
    return (
        <nav>
            <div id="nav_container">
                <div className="nav-item">
                    <ul>
                        <li>
                            <a href="/" id="main_log_a">
                                <img id="main_logo" src={logo} alt="로고"/>
                            </a>
                        </li>
                        <li className="nav-item1">
                            <a href="#">메뉴1</a>
                        </li>
                        <li className="nav-item2">
                            <a href="#">메뉴2</a>
                        </li>
                        <li className="nav-item3">
                            <a href="#">메뉴3</a>
                        </li>
                    </ul>
                    <form id="nav-search">
                        <input id="search-box" type="text" placeholder="example"/>
                        <button id="search-button">search</button>
                    </form>
                    <UserMenu/>
                </div>
            </div>
        </nav>
    )
}

export default NavBar

