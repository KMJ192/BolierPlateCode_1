import React, { Component } from 'react'

export class SideBar extends Component {
    render() {
        return (
            <nav id="sidebarMenu">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">
                        <span data-feather="home"></span>
                        Menu1
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <span data-feather="file"></span>
                        Menu2
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <span data-feather="shopping-cart"></span>
                        Menu3
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <span data-feather="users"></span>
                        Menu4
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <span data-feather="bar-chart-2"></span>
                        Menu5
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                        <span data-feather="layers"></span>
                        Menu6
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        )
    }
}

export default SideBar
