import React, { Component } from 'react';
import NavBar from './nav_bar/NavBar';
import SideBar from './side_bar/SideBar';
import './Wrapper.css';

class Wrapper extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div id="contents-lander">
                    <main>
                        {this.props.children}
                    </main>
                </div>
                <div>
                    <SideBar/>
                </div>
            </div>
        )
    }
}

export default Wrapper
