import React, {useState, useEffect } from 'react';
import UserMenu from './user_menu/UserMenu';
import axios from 'axios';
import './NavBar.css';
import OutputImage from '../../../images/Images';

const NavBar = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [image, setImage] = useState(OutputImage(2))
    
    useEffect(() => {
        (
            async ()=> {
                const {data} = await axios.get('/api/user');
                if(data["result"] === true){
                    //cookie가 있음(로그인 된 상태)
                    setUsername(data["username"]);
                    setIsLogin(true);
                    
                    //유저 이미지 정보가 있을 경우 유저 이미지 정보를 설정
                    if(data["userimage"] !== ''){
                        setImage(data["userImage"]);
                    }
                }
            }
        )();
    }, []);
    
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img id="main-logo" src={OutputImage(3)} alt="메인"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">메뉴1</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">메뉴2</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">메뉴3</a>
                            </li>
                        </ul>
                        <form id="nav-search">
                            <input id="search-box" type="text" placeholder="Search"/>
                            <button id="search-button">검색</button>
                        </form>
                    </div>
                </div>
                <UserMenu name={username} token={isLogin} image={image}/>
            </nav>
        </div>
    )
}

export default NavBar

