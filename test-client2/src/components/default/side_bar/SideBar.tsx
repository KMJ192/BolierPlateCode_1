import React, { Component } from 'react';
import './SideBar.css';

class SideBar extends Component {
    render() {
        return (
        <div className="sidenav">
            <a className="cell" href="/">메뉴1</a>
            <a className="cell" href="/">메뉴2</a>
            <a className="cell" href="/">메뉴3</a>
            <a className="cell" href="/">메뉴4</a>
        </div>
        )
    }
}

export default SideBar