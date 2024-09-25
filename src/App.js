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
                        <Route path="/" element={<Home />}
                        />
                        <Route path="/about" element={<About />}
                        />
                        <Route path="/ListWorkers" element={<ListWorkers />}
                        />
                        <Route path="/addworker" element={<CreateEditWorker workerEditMode = {false}/>} 
                        />
                        <Route path="/editworker/:id" element={<CreateEditWorker workerEditMode = {true}/>} 
                        />
                        <Route path="/ListEnterprises" element={<ListEnterprises />}
                        />
                        <Route path="/addenterprise" element={<CreateEditEnterprise enterpriseEditMode = {false}/>} 
                        />
                        <Route path="/editenterprise/:id" element={<CreateEditEnterprise enterpriseEditMode = {true}/>} 
                        />
                        <Route path="/ListOffers" element={<ListOffers />}
                        />
                        <Route path="/addoffer" element={<LauncherOffer offerEditMode = {false}/>} 
                        />
                        <Route path="/editoffer/:id" element={<LauncherOffer offerEditMode = {true}/>} 
                        />
                    </Routes>
                </BrowserRouter>
            {/* </div> */}
        </div>
        )
    }
}
