import React, { useEffect, useState } from 'react';
import { Div, Ul } from './NavBarStyled';
import AfterLogin from './user_option/AfterLogin';
import BeforeLogin from './user_option/BeforeLogin';
import { useDispatch, useSelector } from 'react-redux';
import { RootState} from '../../../redux-module/RootReducer';
import { getUserThunk } from '../../../redux-module/user';
import './NavBar.scss';

function NavBar() {
    const [loginState, setLoginState] = useState(false);
    const [userDataloading, setUserDataloading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const onToggle = () => {
        setToggle(!toggle);
    }
    const getUserDispatch = useDispatch();
    const UserData = useSelector((state : RootState) => state.user.userProfile);
    useEffect(() => {
        getUserDispatch(getUserThunk());
    }, [getUserDispatch])

    useEffect(() => {
        setUserDataloading(UserData.loading);
        if(UserData.data?.result === true){
            setLoginState(true);
        }
    }, [loginState, userDataloading, UserData]);

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
                <li><input placeholder="검색" type="text"></input></li>
                <li><button className="btn">검색</button></li>
            </Ul>
            {userDataloading ? 
                <div/>
            : 
                <Div toggle={toggle} {...toggle}>
                    {loginState ? 
                        <AfterLogin
                            useremail={UserData.data?.useremail}
                            nickname={UserData.data?.nickname}
                            user_image={UserData.data?.user_image}
                        /> : 
                        <BeforeLogin/>
                    }
                </Div>
            }
            <div className="nav-toggle" onClick={onToggle}>
                <i className="fas fa-bars"></i>
            </div>
        </nav>
    );
}

export default React.memo(NavBar);
