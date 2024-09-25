// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import imageHome from "../../assets/home.jpg";

export default class Home extends Component { // props are like parameters
    // constructor() {
    // super();
    // }
    render() {
        const myStyle = {
            backgroundImage:
                "url(" + imageHome + ")",
            height: "90vh",
            // marginTop: "-70px",
            fontSize: "50px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        };
        return (
            <div style={myStyle}>
            </div>
        );
    }
}