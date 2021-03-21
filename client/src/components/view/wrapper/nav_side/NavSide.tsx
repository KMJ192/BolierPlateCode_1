import React from 'react';
import './NavSide.css';

function NavSide() {
    return (
        <div className="nav-side">
            <a href="#">
                <i className="fas fa-home side-icon"></i>
                Home
            </a>
            <a href="#">
                <i className="fab fa-bitcoin side-icon"></i>
                BitCoin
            </a>
            <a href="#">
                <i className="fas fa-chart-line side-icon"></i>
                Stock
            </a>
        </div>
    )
}

export default NavSide
