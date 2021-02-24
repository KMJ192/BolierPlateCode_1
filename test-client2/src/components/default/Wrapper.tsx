import React, { Component } from 'react';
import Footer from './footer/Footer';
import NavBar from './nav_bar/NavBar';
import SideBar from './side_bar/SideBar';

export class Wrapper extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <main>
                    {this.props.children}
                </main>
                <SideBar/>
                <Footer/>
            </div>
        )
    }
}

export default Wrapper
