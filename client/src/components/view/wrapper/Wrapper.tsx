import React, { Component } from 'react'
import NavSide from './nav_side/NavSide';
import NavTop from './nav_top/NavTop'
import { BackGround, LandingScreen, ToggleBtn } from './WrapperStyle';

class Wrapper extends Component {
    //Default toggle value => true
    state = {
        sidebarOpen : true,
    }
    //Toggle control
    showSidebar = () => {
        this.setState({
            sidebarOpen : !this.state.sidebarOpen
        });
    }
    render() {
        return (
            <div>
                <NavTop/>
                <ToggleBtn onClick={this.showSidebar} open={this.state.sidebarOpen} {...this.state.sidebarOpen}>
                    {this.state.sidebarOpen ? 
                        <i className="fas fa-arrow-alt-circle-left"></i>
                        :
                        <i className="fas fa-arrow-alt-circle-right"></i>
                    }
                </ToggleBtn>
                <NavSide open={this.state.sidebarOpen} {...this.state.sidebarOpen}/>
                <BackGround>
                    <LandingScreen open={this.state.sidebarOpen} {...this.state.sidebarOpen}>
                        <main>
                            {this.props.children}
                        </main>
                    </LandingScreen>
                </BackGround>
            </div>
        );
    }
}

export default Wrapper;