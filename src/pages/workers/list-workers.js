// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlusCircle } from "@fortawesome/free-solid-svg-icons";


import ListWorkersItem from "./list-workers-item";

// TODO
//     - improve spinner to allow pagination

class ListWorkers extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        workerItems: [],
        isLoading: true,
        apiAction: "POST",
        apiUrl: this.props.hostAPP + "/get_listworkers",
        isSpinnerLoading: true,
      };

      this.getListWorkers = this.getListWorkers.bind(this);
      this.handleUpdateListWorkers = this.handleUpdateListWorkers.bind(this);
    }

handleUpdateListWorkers(id) {
    this.setState({
        workerItems: this.state.workerItems.filter(item => {
          return item.id !== id;
        })
      });
}


getListWorkers() {  //WORKING OK retrieving data selection
    axios({
        method: this.state.apiAction,
        url: this.props.hostAPP + "/get_listworkers",
        data: {
            query: `SELECT * FROM trabajadores;`
        },
        withCredentials: false
    })
    .then(response => {
        this.setState({
            workerItems: response.data,
            isSpinnerLoading: false
        });
        console.log(response.data);
        console.log("Retrieving getListWorkers data Ok");
    })
    .catch(error => {
        console.log("retrieving getListWorkersdata error");
    });
}

componentDidMount(){
    this.getListWorkers();
}
   
render() {
    const dataRecords = this.state.workerItems.map(workerItem => {
        return <ListWorkersItem key={workerItem.id} 
                workerItem={workerItem} handleUpdateListWorkers = {this.handleUpdateListWorkers}
                hostAPP = {this.props.hostAPP} />
    });

        return (
            <div>
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-12">
                            {this.state.isSpinnerLoading ? (
                                <div className="content-loader">
                                    <FontAwesomeIcon icon={faSpinner}
                                        style={{
                                            fontSize: 40,
                                            color: "blue"
                                        }} 
                                        spin
                                    />
                                </div>) : null
                            }
                            <table className="table table-bordered table-striped caption-top">
                                <caption>
                                    <Link to="/addworker" aria-label="addworker" className="btn btn-success" title="Crear Trabajador">
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                    </Link>
                                    Workers List
                                    {/* Trabajadores */}
                                </caption>
                                <thead>
                                    <tr>
                                        <th scope='col'>Nr.</th>
                                        <th scope='col'>Nombre y Apellidos</th>
                                        <th scope='col'>F.Nacimiento</th>
                                        <th scope='col'>DNI/NIE</th>
                                        <th scope='col'>Municipio</th>
                                        <th scope='col'>Codigo Postal</th>
                                        <th scope='col'>Provincia</th>
                                        <th scope='col'>Telefono</th>
                                        <th scope='col'>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataRecords}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(ListWorkers);