import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../../../custom_hook/useLocalStorage';
//import UserData, { UserContext } from '../../global_data/UserData';
import { RootState } from '../../../redux_module/RootReducer';
import { getUserThunk } from '../../../redux_module/user';
import NavSide from './nav_side/NavSide';
import NavTop from './nav_top/NavTop'
import { LandingScreen, ToggleBtn } from './WrapperStyle';

interface Props{
    children : React.ReactNode;
}

function Wrapper({ children } : Props){
    //const { data, loading, error } = useSelector((state : RootState) => state.user.userProfile);
    
    const [sidebarState, setSidebarState] = useLocalStorage('sidebarToggle', true);
    const sidebarToggle = () => {
        setSidebarState(!sidebarState);
    };
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