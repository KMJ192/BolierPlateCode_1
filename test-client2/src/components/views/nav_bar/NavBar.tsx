import React, { Component } from 'react';
import Wrapper from '../wrapper/Wrapper';

export class NavBar extends Component {
    render() {
        return (
                <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Logo</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="#">상단메뉴1</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">상단메뉴2</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" aria-disabled="true">상단메뉴3</a>
                                </li>
                                <li className="nav-item">
                                    <form className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </form>
                                </li>
                            </ul>
                            <form>
                                <a href="/login_page">Login</a>
                            </form>
                        </div>
                    </div>
                </nav>
        )
    }
}

export default NavBar
