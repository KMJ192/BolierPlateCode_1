import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import useLocalStorage from '../../../custom_hook/useLocalStorage';
import { getUserThunk } from '../../../redux_module/user';
import NavSide from './nav_side/NavSide';
import NavTop from './nav_top/NavTop'
import { LandingScreen, ToggleBtn } from './WrapperStyle';

interface Props{
    children : React.ReactNode;
}

function Wrapper({ children } : Props){    
    const [sidebarState, setSidebarState] = useLocalStorage('sidebarToggle', true);
    const sidebarToggle = () => {
        setSidebarState(!sidebarState);
    };
    
    //유저정보 get
    const userDispatch = useDispatch();
    useEffect(() => {
        userDispatch(getUserThunk());
    }, []);
    
    return(
        <div>
            <NavTop/>
            <ToggleBtn onClick={sidebarToggle} open={sidebarState} {...sidebarState}>
                {sidebarState ? 
                    <i className="fas fa-arrow-alt-circle-left"></i>
                    :
                    <i className="fas fa-arrow-alt-circle-right"></i>
                }
            </ToggleBtn>
            <NavSide open={sidebarState}/>
            <LandingScreen open={sidebarState} {...sidebarState}>
                {children}
            </LandingScreen>
        </div>
    );
}

export default Wrapper;