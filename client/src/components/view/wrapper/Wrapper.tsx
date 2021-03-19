import React, { Component } from 'react'
import NavTop from './nav_top/NavTop'

class Wrapper extends Component {
    render() {
        return (
            <div>
                <NavTop/>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Wrapper
