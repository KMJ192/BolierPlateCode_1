import React, {useState, useEffect} from 'react';
import UserMenu from './user_menu/UserMenu';
import axios from 'axios';
import './NavBar.css';
import OutputImage from '../../../images/Images';

const NavBar = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({
        username : "",
        userimg : ""
    });
    
    let test:  Blob;
    useEffect(() => {
        (
            async ()=> {
                const {data} = await axios.get('/api/user');
                if(data["result"] === true){
                    //cookie가 있음(로그인 된 상태)
                    setUser(data);
                    setIsLogin(true);
                    test = data["userimage"]["data"];
                    console.log(test);
                }
            }
            )();
        }, []);
        
    return (
        <nav>
            <div id="nav_container">
                <div className="nav-item">
                    <ul>
                        <li>
                            <a href="/" id="main_log_a">
                                <img id="main_logo" src={OutputImage(1)} alt="로고"/>
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
                        <li>
                            <img />
                        </li>
                    </ul>
                    <form id="nav-search">
                        <input id="search-box" type="text" placeholder="example"/>
                        <button id="search-button">search</button>
                    </form>
                    <UserMenu name={user?.username} token={isLogin}/>
                </div>
            </div>
        </nav>
    )
}

export default NavBar

