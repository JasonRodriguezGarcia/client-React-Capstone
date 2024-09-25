import React, { Component } from "react";
// import React, { Component, useState } from "react";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";

// export const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false
        };
        this.openMenu = this.openMenu.bind(this);
    }

openMenu() {
    this.setState({ 
        menuOpen: !this.state.menuOpen
    });
}

    render() {
        return (
            <nav>
                <Link to="/home" className="title">
                    Home
                </Link>
                <div className="menu" onClick={this.openMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={this.state.menuOpen ? "open" : ""}>
                    <li>
                      <NavLink to="/">Administrator</NavLink>
                    </li>
                    <li>
                        <NavLink to="/worker">Worker</NavLink>
                    </li>
                    <li>
                        <NavLink to="/enterprise">Enterprise</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                    {/* <li>
                    <NavLink to="/services">Services</NavLink>
                    </li> */}
                </ul>
            </nav>
        );
    };
}

export default Navbar;