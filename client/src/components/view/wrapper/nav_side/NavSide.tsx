import React from 'react';
import {NavSideDiv, NavSideA} from './NavSideStyle';
import './NavSide.css';


function NavSide() {
    return (
        <NavSideDiv>
            <NavSideA href="#">
                <i className="fas fa-home side-icon"></i>
                Home
            </NavSideA>
            <NavSideA href="#">
                <i className="fab fa-bitcoin side-icon"></i>
                BitCoin
            </NavSideA>
            <NavSideA href="#">
                <i className="fas fa-chart-line side-icon"></i>
                Stock
            </NavSideA>
        </NavSideDiv>
    )
}

export default NavSide
