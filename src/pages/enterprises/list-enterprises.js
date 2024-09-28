// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlusCircle, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table, Container } from "reactstrap";

class ListEnterprises extends Component {
    constructor(props) {
      super(props);   
        this.state = {
            enterpriseItems: [],
            isLoading: true,
            apiAction: "GET",
            // apiAction: "POST",
            apiUrl: this.props.hostAPP+"/get_listenterprises",
            // apiUrl: "http://127.0.0.1:5000/get_listenterprises",
            isSpinnerLoading: true,
            };
    
        this.getListEnterprises = this.getListEnterprises.bind(this);
        this.HandleDeleteRecord = this.HandleDeleteRecord.bind(this);
    }

getListEnterprises() {
    axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        withCredentials: false
    })
    .then(response => {
        this.setState({
            enterpriseItems: response.data,
            isSpinnerLoading: false
        });
        console.log(response.data);
        console.log("Retrieving getListEnterprises data Ok");
    })
    .catch(error => {
        console.log("retrieving getListEnterprises DATA ERROR");
    });
}

componentDidMount(){
    this.getListEnterprises();
}

HandleDeleteRecord(dato) {
    var opcion = window.confirm("Estás seguro que deseas Eliminar la empresa "+dato.empresas_nombre);
    if (opcion === true) {
        this.setState({
            enterpriseItems: this.state.enterpriseItems.filter(item => {
            return item.empresas_id_empresa !== dato.empresas_id_empresa;
            })
        });
        axios({
            method: "DELETE",
            url: `/deleteenterprise/${dato.empresas_id_empresa}`,
            withCredentials: false
        })
        .then(response => {
            console.log(response.data);
            console.log("Deleted enterprise");
        })
        .catch(error => {
            console.log("Deleting enterprise DATA ERROR");
        });
    }
};

render() {

    return (
        <>
        <Container>
            {/* <br />  */}
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
            <Link to="/addenterprise" aria-label="addenterprise" className="btn btn-success" title="Crear Empresa">
                <FontAwesomeIcon icon={faPlusCircle} />
            </Link>
            Enterprises List
            {/* Empresas */}
            <Table striped hover bordered responsive size="sm">
                <thead>
                    <tr>
                        {/* key 2 */}<th>Nr</th>
                        {/* key 0 */}<th>CIF</th>
                        {/* key 3 */}<th>Empresa</th>
                        {/* key 1 */}<th>Correo electronico</th>
                        {/* key 4 */}<th>Persona contacto</th>
                        {/* key 5 */}<th>Telefono contacto</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody id="enterprisesTableRows">
                    {this.state.enterpriseItems.map((dato) => (
                        <tr key={dato[Object.keys(dato)[0]]}> 
                            <td>{dato[Object.keys(dato)[2]]}</td>
                            <td>{dato[Object.keys(dato)[0]]}</td>
                            <td>{dato[Object.keys(dato)[3]]}</td>
                            <td>{dato[Object.keys(dato)[1]]}</td>
                            <td>{dato[Object.keys(dato)[4]]}</td>
                            <td>{dato[Object.keys(dato)[5]]}</td>
                        {/* <tr key={dato.empresas_id_empresa}>
                            <td>{dato.empresas_id_empresa}</td>
                            <td>{dato.empresas_cif}</td>
                            <td>{dato.empresas_nombre}</td>
                            <td>{dato.empresas_correo_electronico}</td>
                            <td>{dato.empresas_persona_contacto}</td>
                            <td>{dato.empresas_telefono}</td> */}
                            <td>
                                <Link to={`/editenterprise/${dato.empresas_id_empresa}`} className="btn btn-success" 
                                    style={{marginRight: "10px"}} aria-label="linkEditEnterprise" title="Modificar Empresa"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <button type='button' onClick={() => this.HandleDeleteRecord(dato)} className="btn btn-danger"
                                aria-label="buttondeleteEnterprise" title="Borrar Empresa"
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
        </>
        );
    }
}

export default ListEnterprises;