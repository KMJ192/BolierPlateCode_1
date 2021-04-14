import React from 'react';
import useLocalStorage from '../../custom_hook/useLocalStorage';
import NavBar from './nav_bar/NavBar';
import SideBar from './side_bar/SideBar';

interface Props{
    children : React.ReactNode
}

function Wrapper({children} : Props) {
    return (
        <div>
            <NavBar/>
            <div>
                {children}
            </div>
            <SideBar/>
        </div>
    )
}

export default Wrapper