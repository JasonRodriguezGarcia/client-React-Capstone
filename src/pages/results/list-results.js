// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import axios from "axios";
import "./table.css";
import { Table, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ListResults extends Component {
    constructor(props) {
      super(props);   
        this.state = {
            offerResults: [],
            isLoading: true,
            isSpinnerLoading: true,
            fieldsCriteria: "",
            criteriaSql: "",
            initialData: false,
            submitButtonEnabled: true, 
            modalOpen: true,
        };
    
        this.createCriteria = this.createCriteria.bind(this);
        this.generateResults = this.generateResults.bind(this);
        this.saveResults = this.saveResults.bind(this);
        this.populateResults = this.populateResults.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.handleAptoClick = this.handleAptoClick.bind(this);
        this.viewCurriculumPDF = this.viewCurriculumPDF.bind(this);
    }

viewCurriculumPDF(curriculum) {
    // Retrieving filename and filedata
    const index = curriculum.indexOf(',');
    const viewFileData = curriculum.slice(index+30);
    // Decode the base64 string to binary data
    var binaryData = atob(viewFileData);
    // Create a Uint8Array from the binary data
    var byteArray = new Uint8Array(binaryData.length);
    for (var i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i) & 0xff;
    }
    var blob = new Blob([byteArray], {type: "application/pdf"});
    //Build a URL from the file
    const fileURL = URL.createObjectURL(blob);
    //Open the URL on new Window
    window.open(fileURL); 
}
handleAptoClick(event, workerSelection) {
    // debugger
    // console.log("imprimiendo evento:", event);
    // console.log("imprimo clase:", event.target.parentElement.classList)
    let myInnerText = event.target.parentElement.parentElement.children[0]
    let myEventClass = event.target.parentElement.parentElement;
    let myRow = event.target.parentElement.parentElement.rowIndex;
    if (myEventClass.className === workerSelection) {
        myEventClass.className = "table-light";
        myInnerText.innerHTML = "x";
        // this.state.offerResults[myRow-1].trabajador_estado = "x";
        const newOfferResults = [...this.state.offerResults];
        newOfferResults[myRow - 1].trabajador_estado = "x";
        this.setState({ offerResults: newOfferResults });
        return;
    } else {
        myEventClass.className = workerSelection;
        myInnerText.innerHTML = workerSelection === "table-success" ? "apto": "no apto";
        const newOfferResults = [...this.state.offerResults];
        newOfferResults[myRow - 1].trabajador_estado = workerSelection === "table-success" ? "apto" : "no apto";
        this.setState({ offerResults: newOfferResults });
        // this.state.offerResults[myRow-1].trabajador_estado = workerSelection === "table-success" ? "apto" : "no apto";
    }
}

buildForm() {
        let formData = new FormData();
        formData.append("offerResults", JSON.stringify(this.state.offerResults));
        formData.append("offerEditMode", this.props.offerEditMode);
    return formData;  
}

populateResults(){
    // populating offerResults with 1 more propierty
    this.state.offerResults.forEach((result) => {
        result.id_oferta = this.props.offerId // TO BE USE IN EDIT MODE CASE
    });
    // console.log("imprimo result tuneado:", this.state.offerResults);
}

saveResults() {
    // Saving results
    axios({
        method: "POST",
        url: this.props.hostAPP + `/save_offerresults/${this.props.offerId}`,
        // url: `http://127.0.0.1:5000/save_offerresults/${this.props.offerId}`,
        data: this.buildForm(),
        withCredentials: false
    })
    .then(response => {
        console.log(response.data);
        console.log("Saving offerResults data Ok");
    })
    .catch(error => {
        console.log("Saving offerResults error");
    });
    this.setState({
        submitButtonEnabled: false,
        modalOpen: false
    });
}

generateResults() {
    // Generating Results with criteria string
    // If modifying a offer, current data in offer will never dissapear to allow list for selection
    // New results could appear when changing criteria.
    // Also offer worker state (Suitable-Unfit) could be changed to allow worker selection in the future.
    // Hire button still under development
    var criterias = this.createCriteria();
    console.log(criterias);
    axios({
        method: "POST",
        url: this.props.offerEditMode
            ? this.props.hostAPP + `/generate_offerresults/${this.props.offerId}`
            : this.props.hostAPP + `/generate_offerresults`
        // ? `http://127.0.0.1:5000/generate_offerresults/${this.props.offerId}`
        // : `http://127.0.0.1:5000/generate_offerresults`
,
        data: {
            criteria: criterias,
            offerEditMode: this.props.offerEditMode
        },
        withCredentials: false
    })
    .then(response => {
        this.setState ({
            offerResults: response.data,
            initialData: true,
        });
        console.log(response.data);
        console.log("Retrieving generate_offerResults data Ok");
    })
    .catch(error => {
        console.log("retrieving generate_offerResults error");
    });
}

createCriteria() {
    var stringCriteria = ""; // Sting to fillup with criteria
    if (this.props.offerItem.priorityField1){
        stringCriteria += ` trabajadores_ocupaciones.trabajadores_ocupaciones_id_ocupacion = 
                            ${this.props.offerItem.id_ocupacion} AND `;
    }
    if (this.props.offerItem.priorityField2){
        stringCriteria += ` trabajadores_ocupaciones.trabajadores_ocupaciones_meses >= 
                            ${this.props.offerItem.meses_experiencia} AND `;
    }
    if (this.props.offerItem.priorityField3){
        stringCriteria += ` trabajadores_formaciones.trabajadores_formaciones_id_formacion = 
                            ${this.props.offerItem.id_formacion} AND `;
    }
    if (this.props.offerItem.priorityField4){
        stringCriteria += ` trabajadores.trabajadores_id_vehiculo = 
                            ${this.props.offerItem.id_vehiculo} AND `;
    }
    stringCriteria += `trabajadores.trabajadores_id_situacion = 1`;
return stringCriteria
}

componentDidMount(){
    // Generating Results to parse in Modal
    this.generateResults(this.props.offerEditMode); //offerEditMode still not in use
}

render() {
    const colorFila = ((dato) => {
        switch (dato) {
            case "x":
                return "table-ligth"
            case "apto":
                return "table-success"
            case "no apto":
                return "table-danger"
            default:
                return ""
        }
    });
    return (
        <>
        <Modal autoFocus={false} isOpen={this.state.modalOpen} size="xl">
            <ModalHeader>
                Oferta guardada, las candidaturas son las siguientes {/*"{this.props.offerId} quitar numero" */}
            </ModalHeader>
            <ModalBody>
                <Container>
                    <Table hover bordered responsive size="sm"> 
                        <thead>
                            <tr>
                                <th>Estado</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Telefono Contacto</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody id="ListResultsTableRows">
                            {this.state.offerResults.map((dato, index) => (
                                <tr id="myTableRow" key={index} className={colorFila(dato.trabajador_estado)}>
                                {/* <tr id="myTableRow" key={dato.trajadores_id_trabajador} className={colorFila(dato.trabajador_estado)}> */}
                                <td>{dato.trabajador_estado}</td>
                                    <td>{dato.trabajadores_nombre}</td>
                                    <td>{dato.trabajadores_apellidos}</td>
                                    <td>{dato.trabajadores_telefono_contacto}</td>
                                    <td><button type='button' className="none" style={{marginRight: "10px"}}
                                            aria-label="buttonpdf" title="pdf"
                                            onClick={() => this.viewCurriculumPDF(dato.trabajadores_curriculum)}
                                        >PDF
                                        </button>
                                        <button type='button' id="apto" className="green sm" style={{marginRight: "10px"}}
                                            aria-label="buttonapto" title="Apto"
                                            onClick={(e) => this.handleAptoClick(e, "table-success")}
                                            // >Apto
                                        >Suitable
                                        </button>
                                        <button type='button' className="red" style={{marginRight: "10px"}}
                                            aria-label="buttonnoapto" title="No Apto"
                                            onClick={(e) => this.handleAptoClick(e, "table-danger")}
                                            // >No Apto
                                        >Unfit
                                        </button>
                                        <button type='button' className="btn btn-danger" style={{marginRight: "10px"}}
                                            aria-label="buttoncontratado" title="Contratado"
                                            // >Contratar
                                        >Hire!
                                        </button></td>
                                        {/* <button type='button' className="none" style={{marginRight: "10px"}}
                                            aria-label="buttoneye" title="Check"
                                        >OJO
                                        </button> */}
                                        {/* <button type='button' className="btn btn-danger" style={{marginRight: "10px"}} */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => this.saveResults()}
                >
                    Save
                    {/* Guardar */}
                </Button>
                {/* <div> */}
                    {/* <Link to="/" className="btn btn-success">Cancelar</Link> */}
                {/* </div> */}
            </ModalFooter>
        </Modal>
        </>
        );
    }
}

export default ListResults;