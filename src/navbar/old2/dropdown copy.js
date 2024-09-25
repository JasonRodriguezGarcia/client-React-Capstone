import React, { Component } from "react";
import { MenuItems } from "./menuitems";
// import Dropdown  from "./dropdown";
import "./dropdown.css"
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCaretDown, faPlusCircle, faEdit, faTrashAlt, faHourglass2, faBars } from "@fortawesome/free-solid-svg-icons";

class DropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            click: false,
        };

        this.handleClick = this.handleClick.bind(this);
        this.clickToFalse = this.clickToFalse.bind(this);
    }

clickToFalse() {
    this.setState({ 
        click: false
    });
}

handleClick() {
    this.setState({
        click: !this.state.click
    });
}
    render() {
        return (
            <>
                <ul 
                    onClick={this.handleClick} 
                    className={this.state.click ? "dropdown-menu clicked" : "dropdown-menu"}
                >
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link 
                                    className={item.cName} 
                                    to={item.path} 
                                    onClick={this.clickToFalse}
                                >
                                    {item.title}                                                                                                
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </>
        )
    }
}

export default DropDown;