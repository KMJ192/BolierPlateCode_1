import React, { useState } from 'react';
import './LadingPage.css';
import SideBar from './side_bar/SideBar';

function LadingPage() {
    //Default Landing Visible
    const [open, setOpen] = useState(true);
    const setToggle = () => setOpen(!open);

    return (
        <div className="LandingPage">
            <div className="side-bar">
                <SideBar/>
            </div>
            
        </div>
    )
}

export default LadingPage
