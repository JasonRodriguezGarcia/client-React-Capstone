// import React, {useState, useEffect} from 'react'
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
    // constructor() {
    // super();

    // }
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
                        <li><a href={about1Image}>Resumen</a></li>
                        <li><a href={about2Image}>Problem definition</a></li>
                        <li><a href={about3Image}>Benefits</a></li>
                        <li><a href={about4Image}>Project timeline</a></li>
                        <li><a href={about5Image}>Statistics</a></li>
                        <li><a href={about6Image}>Developer</a></li>
                        {/* <li><a href={about2Image}>Definicion del problema</a></li>
                        <li><a href={about3Image}>Beneficios</a></li>
                        <li><a href={about4Image}>Cronología del proyecto</a></li>
                        <li><a href={about5Image}>Estadísticas</a></li>
                        <li><a href={about6Image}>Desarrolador</a></li> */}

                    </ol>
                </div>
            </div>
        );
    }
}