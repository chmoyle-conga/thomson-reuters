import React from 'react';
import './Header.scss';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import MiniCart from '../mini-cart/MiniCart';

export default class Header extends React.Component{

    render(){
        return <div>
            <nav className="navbar top navbar-light bg-light">
                <div className="container d-flex align-items-center justify-content-between">
                    <div>Global Directory</div>
                    <div className="d-flex nav-actions">
                        <span>Contact Us</span>
                        <span>Sign In</span>
                        <MiniCart/>
                    </div>
                </div>
            </nav>
            <nav className="navbar bottom navbar-light bg-light border-bottom border-secondary navbar-expand-sm">
                <div className="container align-items-stretch justify-content-between d-flex">
                    <div className="d-flex align-items-center">
                        <button className="navbar-brand btn btn-link">
                            <img src="./header_logo_fr.jpg" width="196" className="d-inline-block align-top" alt="" loading="lazy"></img>
                        </button>
                        <span className="logo-border d-flex align-self-center h-75 border-secondary border py-2"></span>
                        <small className="text-uppercase font-weight-bold">Canada</small>
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavDropdown title="Books">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Products">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Solutions">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Insights">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Support">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                
                </div>
            </nav>
        </div>
    }
}
