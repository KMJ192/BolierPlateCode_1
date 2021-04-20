import React, { useEffect, useState } from 'react';
import { RootState} from './../../../redux-module/RootReducer';
import { Div, Ul } from './NavBarStyled';
import AfterLogin from './user_option/AfterLogin';
import BeforeLogin from './user_option/BeforeLogin';
import './NavBar.scss';
import { useSelector } from 'react-redux';


function NavBar() {
    const [loginState, setLoginState] = useState(false);
    const [userProfile, setUserProfile] = useState({
        useremail : "",
        nickname : "",
        user_image : "",
        result: "",
        message: ""
    });
    const [userDataloading, setUserDataloading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const onToggle = () => {
        setToggle(!toggle);
    }
    const UserData = useSelector((state : RootState) => state.user.userProfile);
    
    useEffect(() => {
        setUserDataloading(UserData.loading);
        // setUserProfile({
        //     useremail : String(UserData.data?.useremail),
        //     nickname : String(UserData.data?.nickname),
        //     user_image : String(UserData.data?.user_image),
        //     result: String(UserData.data?.result),
        //     message: String(UserData.data?.message)
        // });
        if(userProfile.result === "true"){
            setLoginState(true);
        }
    }, [loginState, userDataloading]);
    console.log(userProfile);

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
            {!userDataloading &&
                <Div toggle={toggle} {...toggle}>
                    {loginState ? 
                        <AfterLogin
                            useremail={userProfile.useremail}
                            nickname={userProfile.nickname}
                            user_image={userProfile.user_image}
                        /> : 
                        <BeforeLogin/>
                    }
                </Div>
            }
            <div className="nav-toggle" onClick={onToggle}>
                <i className="fas fa-bars"></i>
            </div>
        </nav>
    )
}

export default NavBar
