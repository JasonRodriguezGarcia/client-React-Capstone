import React, { Component } from "react";
import "./navbar.css";

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
            // <!-- start nav -->
    <nav id="menu">
        {/* <!-- start menu --> */}
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Administrator</a>
            {/* <!-- start menu desplegable --> */}
                <ul>
                    <li><a href="/ListWorkers">Workers</a></li>
                    <li><a href="/ListEnterprises">Enterprises</a></li>
                    <li><a href="/ListOffers">Job offers</a></li>
                </ul>
        {/* <!-- end menu desplegable --> */}
            </li>
            <li><a href="#">Worker</a> 
            {/* <!-- start menu desplegable --> AÑADIDO*/}
                <ul>
                    <li><a href="#">Modify personal data</a></li>
                    <li><a href="#">Query offers</a></li>
                    <li><a href="#">Others..</a>
                    </li>
                </ul>
            </li>
            <li><a href="#">Enterprise</a>
                <ul>
                    <li><a href="#">Modify enterprise data</a></li>
                    <li><a href="#">Job offers</a></li>
                    <li><a href="#">Others..</a>
                        <ul>
                            <li><a href="#">;) Bankruptcy</a></li>
                            <li><a href="#">;) Misappropriation</a></li>
                            <li><a href="#">;) Blackmail</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><a href="/about">About us</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Sign-up</a></li>
        </ul>
        {/* <!-- end menu --> */}
    </nav>
    // <!-- end nav -->
            // <nav>
            //     <Link to="/home" className="title">
            //         Home
            //     </Link>
            //     <div className="menu" onClick={this.openMenu}>
            //         <span></span>
            //         <span></span>
            //         <span></span>
            //         <span></span>
            //     </div>
            //     <ul className={this.state.menuOpen ? "open" : ""}>
            //         <li>
            //           <NavLink to="/">Administrator</NavLink>
            //         </li>
            //         <li>
            //             <NavLink to="/worker">Worker</NavLink>
            //         </li>
            //         <li>
            //             <NavLink to="/enterprise">Enterprise</NavLink>
            //         </li>
            //         <li>
            //             <NavLink to="/about">About</NavLink>
            //         </li>
            //         <li>
            //             <NavLink to="/contact">Contact</NavLink>
            //         </li>
            //         {/* <li>
            //         <NavLink to="/services">Services</NavLink>
            //         </li> */}
            //     </ul>
            // </nav>
        );
    };
}

export default Navbar;