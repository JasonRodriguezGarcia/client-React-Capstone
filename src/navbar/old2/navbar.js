import React, { Component } from "react";
import { Button } from "./button";
import DropDown  from "./dropdown";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCaretDown, faPlusCircle, faEdit, faTrashAlt, faHourglass2, faBars } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            click: false,
            dropDown: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.closeMobileMenu = this.closeMobileMenu.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

closeMobileMenu() {
    this.setState({
        click: false
    });
}

handleClick() {
    this.setState({ 
        click: !this.state.click
    });
}

handleMouseEnter() {
    if (window.innerWidth < 960) {
        this.setState({
            dropDown: false
        });
        
    } else {
        this.setState({
            dropDown: true
        });
    }
}

handleMouseLeave() {
    if (window.innerWidth < 960) {
        this.setState({
            dropDown: false
        });
    } else {
        this.setState({
            dropDown: false
        });
    }
}


    render() {
        // const onMouseEnter = () => {
        //     if (window.innerWidth < 960) {
        //         this.setState({
        //             dropDown: false
        //         });
                
        //     } else {
        //         this.setState({
        //             dropDown: true
        //         });
        //     }
        // };

        // const onMouseLeave = () => {
        //     if (window.innerWidth < 960) {
        //         this.setState({
        //             dropDown: false
        //         });
        //     } else {
        //         this.setState({
        //             dropDown: false
        //         });
        //     }
        // };
        return (
            <>
                <nav className="navbar">
                    <Link to='/' className="navbar-logo">
                        EPIC
                    </Link>
                    <div className="menu-icon" onClick={this.handleClick}>
                        <FontAwesomeIcon icon={this.state.click ? faTimes : faBars} />
                        {/* <i  className={this.state.click ? "fa-edit" : "fa-bars"} /> */}
                    </div>
                    <ul className={this.state.click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={this.closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li 
                            className="nav-item"
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                        >
                            <Link 
                                to="/services" 
                                className="nav-links" 
                                onClick={this.closeMobileMenu}
                            >
                                Admin {/*<i className="fas fa-caret-down" /> */}
                                <FontAwesomeIcon icon={faCaretDown} />
                            </Link>
                            {/* {this.state.dropDown ? <DropDown /> : null}  if dropDown es true muestra Dropdown */}
                            {this.state.dropDown && <DropDown />} 
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/worker" 
                                className="nav-links" 
                                onClick={this.closeMobileMenu}
                            >
                                Worker
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/enterprise" 
                                className="nav-links" 
                                onClick={this.closeMobileMenu}
                            >
                                Enterprise
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/contact" 
                                className="nav-links" 
                                onClick={this.closeMobileMenu}
                            >
                                Contact-us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" 
                            className="nav-links-mobile" 
                            onClick={this.closeMobileMenu}
                        >
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sign-up" 
                            className="nav-links-mobile"
                            onClick={this.closeMobileMenu}
                        >
                                Sign-up
                            </Link>
                        </li>
                    </ul>
                    {/* <Button /> */}
                </nav>
            </>
        );
    }
}
export default Navbar;