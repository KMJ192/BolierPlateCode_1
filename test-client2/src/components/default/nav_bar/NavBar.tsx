import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './rust_logo.png'
import './NavBar.css';

const NavBar = () => {

    let userlogState;
    const [sign, setSign] = useState("Login");
    const [signup, setSignup] = useState("SignUp");
    const [lb, setLb] = useState("/login_user");
    const [user, setUser] = useState({
        username : ""
    });

    useEffect(() => {
        (
            async ()=> {
                const {data} = await axios.get('/api/user');
                setUser(data);
                if(data["result"] == true){
                    //cookie가 있음(로그인 된 상태)
                    setSign("Logout"); //Login 버튼 Logout으로 상태 변경
                    setSignup(""); //SignUp 버튼 내용 삭제
                    setLb("/"); //로그인이 되어 있을 경우 SignUp버튼을 눌렀을 때 이동할 경로
                }
            }
        )();
    }, []);
    if(sign === "Logout"){
        userlogState = async () => {
            await axios.post("/api/logout", {});
        }
    }

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
                    <div id="user-auth-container">
                        <a id="user-name" href="#">{user?.username}</a>
                        <a id="login-button" href={lb} onClick={userlogState}>{sign}</a>
                        <a id="signup-button" href="/register_user">{signup}</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar

