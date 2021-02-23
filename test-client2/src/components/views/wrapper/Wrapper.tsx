import React, { Component } from 'react';
import Footer from '../footer/Footer';
import NavBar from '../nav_bar/NavBar';
import SideBar from '../side_bar/SideBar';

export class Wrapper extends Component {
    render() {
        return (
            <>
                <NavBar/>
                <SideBar/>
                <div className="container-fluid">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {this.props.children}
                    </main>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Wrapper
