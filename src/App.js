import React, { Component } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
// import './bootstrap-min.css';
import Home from "./pages/navigation/home";
import About from "./pages/navigation/about";
import ListWorkers from "./pages/workers/list-workers";
import CreateEditWorker from "./pages/workers/create-edit-worker";
import ListEnterprises from "./pages/enterprises/list-enterprises";
import CreateEditEnterprise from "./pages/enterprises/create-edit-enterprise";
import ListOffers from "./pages/offers/list-offers";
import LauncherOffer from "./pages/offers/launcher-offer";
import Navbar from "./navbar/navbar"

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            hostAPP: "http://127.0.0.1:5000"
            // hostAPP: "https://flask-server-capstone.onrender.com"
        };
    }
    render() {
        return (
            <div>
        {/* // <div className="vh-100 gradient-custom"> */}
            {/* <div className="container" style={{
                                            width: "100%",
                                        }}> */}
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home hostAPP = {this.state.hostAPP}/>}
                        />
                        <Route path="/about" element={<About hostAPP = {this.state.hostAPP}/>}
                        />
                        <Route path="/ListWorkers" element={<ListWorkers hostAPP = {this.state.hostAPP}/>}
                        />
                        <Route path="/addworker" element={<CreateEditWorker workerEditMode = {false} hostAPP = {this.state.hostAPP}/>} 
                        />
                        <Route path="/editworker/:id" element={<CreateEditWorker workerEditMode = {true} hostAPP = {this.state.hostAPP}/>} 
                        />
                        <Route path="/ListEnterprises" element={<ListEnterprises hostAPP = {this.state.hostAPP}/>}
                        />
                        <Route path="/addenterprise" element={<CreateEditEnterprise enterpriseEditMode = {false} hostAPP = {this.state.hostAPP}/>} 
                        />
                        <Route path="/editenterprise/:id" element={<CreateEditEnterprise enterpriseEditMode = {true} hostAPP = {this.state.hostAPP}/>} 
                        />
                        <Route path="/ListOffers" element={<ListOffers hostAPP = {this.state.hostAPP}/>}
                        />
                        <Route path="/addoffer" element={<LauncherOffer offerEditMode = {false} hostAPP = {this.state.hostAPP}/>} 
                        />
                        <Route path="/editoffer/:id" element={<LauncherOffer offerEditMode = {true} hostAPP = {this.state.hostAPP}/>} 
                        />
                    </Routes>
                </BrowserRouter>
            {/* </div> */}
        </div>
        )
    }
}
