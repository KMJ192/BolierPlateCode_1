import React, { Component } from 'react';
import Wrapper from '../../default/Wrapper';
import './LandingPage.css';

class LandingPage extends Component {
    render() {
        return (
            <Wrapper>
                <div id="landing-page">
                    <div>콘텐츠</div>
                    <i className="bi bi-arrow-left-circle"></i>
                </div>
            </Wrapper>
        )
    }
}

export default LandingPage