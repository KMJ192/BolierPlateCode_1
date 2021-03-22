import React, { Component } from 'react'
import NavSide from './nav_side/NavSide';
import NavTop from './nav_top/NavTop'
import { LandingScreen, SidebarContainer, ToggleBtn } from './WrapperStyle';
import './Wrapper.css';

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
        console.log(this.state.sidebarOpen);
        return (
            <div>
                <NavTop/>
                {/* Wrapper컴포넌트에서 동적제어 기능 */}
                <SidebarContainer open={this.state.sidebarOpen} {...this.state.sidebarOpen}>
                    <ToggleBtn onClick={this.showSidebar} open={this.state.sidebarOpen} {...this.state.sidebarOpen}>
                        {this.state.sidebarOpen ? 
                            (<i className="fas fa-arrow-alt-circle-left"></i>)
                            :
                            (<i className="fas fa-arrow-circle-right"></i>) 
                        }
                    </ToggleBtn>
                    <NavSide/>
                </SidebarContainer>
                <LandingScreen open={this.state.sidebarOpen} {...this.state.sidebarOpen}>
                    <main>
                        {this.props.children}
                    </main>
                </LandingScreen>
            </div>
        );
    }
}

export default Wrapper;