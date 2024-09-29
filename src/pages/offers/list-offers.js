// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPlusCircle, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table, Container } from "reactstrap";

class ListOffers extends Component {
    constructor(props) {
      super(props);   
        this.state = {
            offerItems: [],
            isLoading: true,
            apiAction: "GET",
            // apiAction: "POST",
            apiUrl: this.props.hostAPP + "/get_listoffers",
            // apiUrl: "http://127.0.0.1:5000/get_listoffers",
            isSpinnerLoading: true,
            isTruncated: true,
            maxLenght: 100,
            };
    
        this.getListOffers = this.getListOffers.bind(this);
        this.HandleDeleteRecord = this.HandleDeleteRecord.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

handleClick() {
    this.setState ({
        isTruncated: !this.state.isTruncated
    });
}
getListOffers() {
    axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        withCredentials: false
    })
    .then(response => {
        this.setState({
            offerItems: response.data,
            isSpinnerLoading: false
        });
        console.log(response.data);
        console.log("Retrieving getListOffers data Ok");
    })
    .catch(error => {
        console.log("retrieving getListOffers DATA ERROR");
    });
}

componentDidMount(){
    this.getListOffers();
}

HandleDeleteRecord(dato) {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar la oferta "+dato.ofertas_id_oferta);
    if (opcion === true) {
        this.setState({
            offerItems: this.state.offerItems.filter(item => {
            return item.ofertas_id_oferta !== dato.ofertas_id_oferta;
            })
        });
        axios({
            method: "DELETE",
            url: this.props.hostAPP + `/deleteoffer/${dato.ofertas_id_oferta}`,
            withCredentials: false
        })
        .then(response => {
            console.log(response.data);
            console.log("Deleted offer");
        })
        .catch(error => {
            console.log("Deleting offer DATA ERROR");
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
            <Link to="/addoffer" aria-label="addoffer" className="btn btn-success" title="Crear Oferta">
                <FontAwesomeIcon icon={faPlusCircle} />
            </Link>
            Offers List
            {/* Ofertas */}
            <Table striped hover bordered responsive size="sm">
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Empresa</th>
                        <th>Ocupacion</th>
                        <th>Formacion</th>
                        <th>Vehiculo</th>
                        <th>Municipio</th>
                        <th>Provincia</th>
                        <th>Puesto</th>
                        <th>Contrato</th>
                        <th>Jornada</th>
                        <th>Estado</th>
                        <th>F.Creacion</th>
                        <th>F.Finalizacion</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody id="offersTableRows">
                    {this.state.offerItems.map((dato) => (
                        <tr key={dato.ofertas_id_oferta}> 
                            <td>{dato.ofertas_id_oferta}</td> 
                            <td>{dato.empresas_nombre}</td>
                            <td>{dato.ocupaciones_descripcion_ocupacion}</td>
                            <td>{dato.formaciones_descripcion_formacion}</td>
                            <td>{dato.vehiculos_descripcion_vehiculo}</td>
                            <td>{dato.municipios_descripcion_municipio}</td>
                            <td>{dato.provincias_descripcion_provincia}</td>
                            <td>{/* {dato.ofertas_puesto_descripcion.substr(0,40)} */}
                                <div className="descripcion" onClick={this.handleClick}>

                                    {this.state.isTruncated 
                                        ? dato.ofertas_puesto_descripcion.substr(0, this.state.maxLenght)
                                        : dato.ofertas_puesto_descripcion
                                    }
                                    {this.state.isTruncated
                                        ? <span style={{fontSize: "small", color: "blue"}}>..Click to Expand...</span>
                                        : <span style={{fontSize: "small", color: "blue"}}>..Click to Decrease...</span>
                                    }
                                </div>
                            </td>
                            <td>{dato.contratos_descripcion_contrato}</td>
                            {/* <td>{dato.ofertas_id_contrato}</td> */}
                            <td>{dato.jornadas_descripcion_jornada}</td>
                            {/* <td>{dato.ofertas_id_jornada}</td> */}
                            <td>{dato.ofertas_id_estado_oferta}</td>
                            <td>{dato.ofertas_fecha_creacion}</td>
                            <td>{dato.ofertas_fecha_finalizacion}</td>
                            <td>
                                    <Link to={`/editoffer/${dato.ofertas_id_oferta}`} className="btn btn-success" 
                                        style={{marginRight: "10px"}} aria-label="linkEditOffer" title="Modificar Oferta"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                    <button type='button' onClick={() => this.HandleDeleteRecord(dato)} className="btn btn-danger"
                                        aria-label="buttondeleteOffer" title="Borrar Oferta"
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

export default withRouter(ListOffers);