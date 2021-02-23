import React, { Component } from 'react';
import Footer from '../footer/Footer';
import NavBar from '../nav_bar/NavBar';
import SideBar from '../side_bar/SideBar';

export class Wrapper extends Component {
    render() {
        return (
            <>
                <NavBar/>
                <div className="container-fluid">
                    <div className="row">
                        <SideBar/>
                    </div>
                </div>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {this.props.children}
                </main>
                <Footer/>
            </>
        )
    }
}

export default Wrapper
