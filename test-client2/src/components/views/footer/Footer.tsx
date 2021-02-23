import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <footer style={{
                height: '80px', display: 'flex',
                flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', fontSize:'1rem'
            }}>
               <p> Happy Coding</p>
            </footer>
        )
    }
}

export default Footer
