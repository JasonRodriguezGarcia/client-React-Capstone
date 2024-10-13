import React, { Component } from "react";
import aboutImage from "../../assets/about.jpg";
import about1Image from "../../assets/about1.jpg"
import about2Image from "../../assets/about2.jpg"
import about3Image from "../../assets/about3.jpg"
import about4Image from "../../assets/about4.jpg"
import about5Image from "../../assets/about5.jpg"
import about6Image from "../../assets/about6.jpg"
import "./about.css"

export default class About extends Component { // props are like parameters
    render() {
        const myStyle = {
            backgroundImage:
                "url(" + aboutImage + ")",
            height: "90vh",
            fontSize: "50px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        };
        return (
            <div className="pagecontent" style={myStyle}>
                <br/>
                <br/>
                <br/>
                <div className="contenido">
                    <ol className="listadoagenda">
                        <li><a href={about1Image} target="_blank" rel="noreferrer" >Resumen</a></li>
                        <li><a href={about2Image} target="_blank" rel="noreferrer" >Problem definition</a></li>
                        <li><a href={about3Image} target="_blank" rel="noreferrer" >Benefits</a></li>
                        <li><a href={about4Image} target="_blank" rel="noreferrer" >Project timeline</a></li>
                        <li><a href={about5Image} target="_blank" rel="noreferrer" >Statistics</a></li>
                        <li><a href={about6Image} target="_blank" rel="noreferrer" >Developer</a></li>
                    </ol>
                </div>
            </div>
        );
    }
}