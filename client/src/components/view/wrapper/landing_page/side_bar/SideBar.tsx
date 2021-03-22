import React from 'react';
import './SideBar.css';
import { SideBarDiv, SideBarA } from './SideBarStyle';

function SideBar() {
    return (
        <SideBarDiv>
            <SideBarA href="#">
                <i className="fas fa-home side-icon"></i>
                Home
            </SideBarA>
            <SideBarA href="#">
                <i className="fab fa-bitcoin side-icon"></i>
                BitCoin
            </SideBarA>
            <SideBarA href="#">
            <i className="fas fa-chart-line side-icon"></i>
                Stock
            </SideBarA>
        </SideBarDiv>
    )
}

export default SideBar
