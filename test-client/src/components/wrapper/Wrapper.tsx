import React from 'react'
import NavBar from './nav_bar/NavBar'
import SideBar from './side_bar/SideBar'

interface Props{
    children : React.ReactNode
}

function Wrapper({children} : Props) {
    return (
        <div>
            <NavBar/>
            <SideBar/>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Wrapper