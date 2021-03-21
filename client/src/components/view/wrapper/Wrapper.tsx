import React, { Component } from 'react'
import NavSide from './nav_side/NavSide';
import NavTop from './nav_top/NavTop'
import './Wrapper.css';
import { LandingPage } from './WrapperStyle';

class Wrapper extends Component {
    render() {
        return (
            <div>
                <NavTop/>
                <div className="side-bar">
                    <NavSide/>
                </div>
                <LandingPage>
                    <main>
                        {this.props.children}
                    </main>
                </LandingPage>
            </div>
        );
    }
}

export default Wrapper;