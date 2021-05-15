import React from 'react';
import useLocalStorage from '../../custom_hook/useLocalStorage';
import NavBar from './nav_bar/NavBar';
import SideBar from './side_bar/SideBar';
import { ToggleBtn, Main } from './WrapperStyle';
import './Wrapper.scss';

interface Props{
    children : React.ReactNode
}

function Wrapper({children} : Props) {
    const [sidebarState, setSidebarState] = useLocalStorage('sidebarToggle', true);
    const sidebarToggle = () => {
        setSidebarState(!sidebarState);
    }

    return (
        <>
            <div className="nav">
                <NavBar/>
            </div>
            <ToggleBtn onClick={sidebarToggle} className="toggle-btn" toggle={sidebarState} {...sidebarState}>
                {sidebarState ? 
                    <i className="fas fa-arrow-alt-circle-left"/>
                    :
                    <i className="fas fa-arrow-alt-circle-right"/>
                }
            </ToggleBtn>
            <SideBar className="side-bar" toggle={sidebarState} {...sidebarState}/>
            <Main className="landing-screen" toggle={sidebarState} {...sidebarState}>
                {children}
            </Main>
        </>
    )
}

export default React.memo(Wrapper)