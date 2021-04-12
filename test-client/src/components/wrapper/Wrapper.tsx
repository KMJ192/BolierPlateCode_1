import React from 'react'
import NavBar from './nav_bar/NavBar'

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
        </div>
    )
}

export default Wrapper