import React, { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

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
            <li><Link to="/">Home</Link></li>
            <li><Link to="#">Administrator</Link>
            {/* <!-- start menu desplegable --> */}
            {/* <Link to="/home" className="title"> */}
                <ul>
                    <li><Link to="/ListWorkers">Workers</Link></li>
                    <li><Link to="/ListEnterprises">Enterprises</Link></li>
                    <li><Link to="/ListOffers">Job offers</Link></li>
                </ul>
        {/* <!-- end menu desplegable --> */}
            </li>
            <li><Link to="#">Worker</Link> 
            {/* <!-- start menu desplegable --> AÑADIDO*/}
                <ul>
                    <li><Link to="#">Modify personal data</Link></li>
                    <li><Link to="#">Query offers</Link></li>
                    <li><Link to="#">Others..</Link>
                    </li>
                </ul>
            </li>
            <li><Link to="#">Enterprise</Link>
                <ul>
                    <li><Link to="#">Modify enterprise data</Link></li>
                    <li><Link to="#">Job offers</Link></li>
                    <li><Link to="#">Others..</Link>
                        <ul>
                            <li><Link to="#">;) Bankruptcy</Link></li>
                            <li><Link to="#">;) Misappropriation</Link></li>
                            <li><Link to="#">;) Blackmail</Link></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="#">Login</Link></li>
            <li><Link to="#">Sign-up</Link></li>
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