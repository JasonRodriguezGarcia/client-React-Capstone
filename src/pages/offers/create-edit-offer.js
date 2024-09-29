import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Moment from "moment";
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class 
import { Button, Col, Row, Form, FormGroup } from "reactstrap";
import ListResults from '../results/list-results';

// BE CARE OF END LINE CLASS CREATEEDITOFFER COMPONENT
// TUNNED withRouter to allow using Router parameters
class CreateEditOffer extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            apiUrl: this.props.hostAPP + "/addoffer",
            // apiUrl: "http://127.0.0.1:5000/addoffer",
            apiAction: "POST",
            // editedId: this.props.match.params.slug, <-- it ONLY WORKS IN ROUTER V.5
            editedId: this.props.params.id,
            newId: "",
            enterpriseItem: [],
            empresasData: [],
            ocupacionesData: [],
            formacionesData: [],
            vehiculosData: [],
            municipiosData: [],
            provinciasData: [],
            contratosData: [],
            jornadasData: [],
            estadosOfertasData: [],
            form: {
                id_oferta: "",
                id_empresa: "1",
                id_ocupacion: "1",
                meses_experiencia: 0,
                id_formacion: "1",
                id_vehiculo: "1",
                id_municipio: "1",
                id_provincia: "1",
                puesto_descripcion: "",
                id_contrato: "1",
                id_jornada: "1",
                salario: 0,
                id_estado_oferta: "1",
                fecha_creacion: Moment(new Date()).format('DD-MM-YYYY'),
                priorityField1: false,
                priorityField2: false,
                priorityField3: false,
                priorityField4: false,

            },
            headerText: ["Crear Oferta", "Modificar Oferta"], // headerText: ["Create Offer", "Edit Offer"],
            fieldDisabled: false,
            submitButtonEnabled: true,
            initialEditData: false,         // to handle the first time data to edit in enterprises
            handleListResultsDisabled: false,
        };

        this.getEnterpriseItem = this.getEnterpriseItem.bind(this);
        this.clearEnterpriseItem = this.clearEnterpriseItem.bind(this);
        this.handleInitialEditDataOff = this.handleInitialEditDataOff.bind(this); // To handle initialEditData to off
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getOfferSecundaryData = this.getOfferSecundaryData.bind(this);
        this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
        this.handleListResults = this.handleListResults.bind(this); // To handle ListResults showing
        this.handleNewId = this.handleNewId.bind(this);
    }

handleNewId(id){
    this.setState({
        newId: id
    });
}

handleListResults() {
    this.setState({
        handleListResultsDisabled: !this.setState.handleListResultsDisabled
    });
}

buildForm() {
    let formData = new FormData();

    formData.append("id_empresa", this.state.form.id_empresa);
    formData.append("id_ocupacion", this.state.form.id_ocupacion);
    formData.append("meses_experiencia", this.state.form.meses_experiencia);
    formData.append("id_formacion", this.state.form.id_formacion);
    formData.append("id_vehiculo", this.state.form.id_vehiculo);
    formData.append("id_municipio", this.state.form.id_municipio);
    formData.append("id_provincia", this.state.form.id_provincia);
    formData.append("puesto_descripcion", this.state.form.puesto_descripcion);
    formData.append("id_contrato", this.state.form.id_contrato);
    formData.append("id_jornada", this.state.form.id_jornada);
    formData.append("salario", this.state.form.salario);
    formData.append("id_estado_oferta", this.state.form.id_estado_oferta);
    formData.append("fecha_creacion", this.state.form.fecha_creacion);
    formData.append("priorityField1", this.state.form.priorityField1);
    formData.append("priorityField2", this.state.form.priorityField2);
    formData.append("priorityField3", this.state.form.priorityField3);
    formData.append("priorityField4", this.state.form.priorityField4);
    return formData;
}
    
handleSubmit(e) {
    // console.log(e);
    e.preventDefault();
    if (this.state.form.priorityField1 === false && this.state.form.priorityField2 === false &&
            this.state.form.priorityField3 === false && this.state.form.priorityField4 === false){
        window.alert("Seleccionar al menos un campo prioritario para la búsqueda");
        return;
    }
    axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        data: this.buildForm(),
        headers: {
            'content-type': 'multipart/form-data',
        },
        withCredentials: false
    })
    .then(response => {
        if (this.props.offerEditMode){
            console.log(response.data)
            console.log("Data modified OK");
        } else {
            console.log(response.data);
            console.log("Data created OK");
            this.handleNewId(response.data[0].id);
        }
    })
    .catch(error => {
        if (this.props.offerEditMode) {
            return console.log("Offer Data MODIFICATION error");
        } else {
            return console.log("Offer Data CREATION error");
        }
    });
    this.setState ({
        fieldDisabled: true,
        submitButtonEnabled: false
    });
    this.props.handleOfferItem(this.state.form);
    this.handleListResults();
}

handleChangeCheckBox(e) {
    this.setState({
        form: {
        ...this.state.form,
        [e.target.name]: e.target.checked,
        },
    });
}

handleChange(e) {
    this.setState({
        form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
        },
    });
}
        
handleInitialEditDataOff() {
    this.setState({
        initialEditData: false
    })
}
    
getEnterpriseItem () {
    axios({
        method: "GET",
        url: this.props.hostAPP + `/get_listoffers/${this.state.editedId}`,
        // url: `http://127.0.0.1:5000/get_listoffers/${this.state.editedId}`,
        withCredentials: false
    })
    .then(response => {
        this.setState ({
            enterpriseItem: response.data,
            apiAction: "POST",
            apiUrl: this.props.hostAPP + `/editoffer/${this.state.editedId}`,
            // apiUrl: `http://127.0.0.1:5000/editoffer/${this.state.editedId}`,
            initialEditData: true,
        });
        this.props.handleOfferId(response.data[0].ofertas_id_oferta); // Passing id to parent component to be forwarded to list-results component
        console.log("imprimo response.data: ", response.data[0].ofertas_id_oferta);
        console.log("Retrieving getOfferItem data Ok");
    })
    .catch(error => {
        console.log("retrieving getOfferItem error");
    });
}

clearEnterpriseItem() {
    this.setState ({
        enterpriseItem: []
    });
}

getOfferSecundaryData () {
    axios({
        method: "GET",
        url: this.props.hostAPP + "/get_offer_secundary_databases",
        // url: "http://127.0.0.1:5000/get_offer_secundary_databases",
        withCredentials: false
    })
        .then(response => {
            this.setState({
                empresasData: response.data.empresas,
                ocupacionesData: response.data.ocupaciones,
                formacionesData: response.data.formaciones,
                vehiculosData: response.data.vehiculos,
                municipiosData: response.data.municipios,
                provinciasData: response.data.provincias,
                contratosData: response.data.contratos,
                jornadasData: response.data.jornadas,
                estadosOfertasData: response.data.estados_ofertas,
            });
            // console.log("Printing Offer secundary_datatabases response.data")
            // console.log(response.data);
            console.log("Offer Secundary databases GET Data OK");
        })
        .catch(error => {
            console.log("Offer Secundary databases GET Data ERROR");
        });
}


// componentWillUnmount() {
//     if (this.props.offerEditMode) {
//         console.log("ID Edited:")
//         console.log(this.state.id);
//     } else {
//         console.log("ID created:")
//         console.log(this.state.newId);
//     }
//     // alert("mandar sms");
//     // TODO
//     //  - SEND EMAIL using this.state.newId
// }
componentDidUpdate () {
    if (this.state.initialEditData) { // If we are Editing a Offer
        this.handleInitialEditDataOff();
        console.log("pasando por componentDidUpdate");
        const {
            ofertas_id_oferta,
            ofertas_id_empresa,
            ofertas_id_ocupacion,
            ofertas_meses_experiencia,
            ofertas_id_formacion,
            ofertas_id_vehiculo,
            ofertas_id_municipio,
            ofertas_id_provincia,
            ofertas_puesto_descripcion,
            ofertas_id_contrato,
            ofertas_id_jornada,
            ofertas_salario,
            ofertas_id_estado_oferta,
            ofertas_fecha_creacion, 
            ofertas_priorityField1,
            ofertas_priorityField2,
            ofertas_priorityField3,
            ofertas_priorityField4,

                 
            } = this.state.enterpriseItem[0];

            this.setState({
                form: { ...this.state.form,
                    id_oferta: ofertas_id_oferta,
                    id_empresa: ofertas_id_empresa,
                    id_ocupacion: ofertas_id_ocupacion,
                    meses_experiencia: ofertas_meses_experiencia,
                    id_formacion: ofertas_id_formacion,
                    id_vehiculo: ofertas_id_vehiculo,
                    id_municipio: ofertas_id_municipio,
                    id_provincia: ofertas_id_provincia,
                    puesto_descripcion: ofertas_puesto_descripcion,
                    id_contrato: ofertas_id_contrato,
                    id_jornada: ofertas_id_jornada,
                    salario: ofertas_salario,
                    id_estado_oferta: ofertas_id_estado_oferta,
                    fecha_creacion: ofertas_fecha_creacion,
                    priorityField1: ofertas_priorityField1.toLowerCase() === "true",
                    priorityField2: ofertas_priorityField2.toLowerCase() === "true",
                    priorityField3: ofertas_priorityField3.toLowerCase() === "true",
                    priorityField4: ofertas_priorityField4.toLowerCase() === "true",
                }
            });
    }
}

componentDidMount () {
    if (this.props.offerEditMode) {
        this.getEnterpriseItem();
    }
    this.getOfferSecundaryData();
}

    render() {
        const empresas = this.state.empresasData.map((empresa => {
            return ( 
                <option key={empresa.empresas_id_empresa} value={empresa.empresas_id_empresa}>{empresa.empresas_nombre} </option> 
            );
        }));
        const ocupaciones = this.state.ocupacionesData.map((ocupacion => {
            return ( 
                <option key={ocupacion.ocupaciones_id_ocupacion} value={ocupacion.ocupaciones_id_ocupacion}>{ocupacion.ocupaciones_descripcion_ocupacion} </option> 
            );
        }));
        const formaciones = this.state.formacionesData.map((formacion => {
            return ( 
                <option key={formacion.formaciones_id_formacion} value={formacion.formaciones_id_formacion}>{formacion.formaciones_descripcion_formacion} </option> 
            );
        }));
        const vehiculos = this.state.vehiculosData.map((vehiculo => {
            return ( 
                <option key={vehiculo.vehiculos_id_vehiculo} value={vehiculo.vehiculos_id_vehiculo}>{vehiculo.vehiculos_descripcion_vehiculo} </option> 
            );
        }));
        const municipios = this.state.municipiosData.map((municipio => {
            return ( 
                <option key={municipio.municipios_id_municipio} value={municipio.municipios_id_municipio}>{municipio.municipios_descripcion_municipio} </option> 
            );
        }));
        // const provincias = this.state.provinciasData.map((provincia => {
        //     return ( 
        //         <option key={provincia.provincias_id_provincia} value={provincia.provincias_id_provincia}>{provincia.provincias_descripcion_provincia} </option> 
        //     );
        // }));
        const contratos = this.state.contratosData.map((contrato => {
            return ( 
                <option key={contrato.contratos_id_contrato} value={contrato.contratos_id_contrato}>{contrato.contratos_descripcion_contrato} </option> 
            );
        }));
        const jornadas = this.state.jornadasData.map((jornada => {
            return ( 
                <option key={jornada.jornadas_id_jornada} value={jornada.jornadas_id_jornada}>{jornada.jornadas_descipcion_jornada} </option> 
            );
        }));
        const estadosOfertas = this.state.estadosOfertasData.map((estadosOferta => {
            return ( 
                <option key={estadosOferta.estados_ofertas_id_estado_oferta} value={estadosOferta.estados_ofertas_id_estado_oferta}>{estadosOferta.estados_ofertas_descripcion_estado_oferta} </option> 
            );
        }));
        return (
            <>
            <br/>
            <div>
                <h5>{this.props.offerEditMode ? this.state.headerText[1]: this.state.headerText[0]}: {this.state.editedId}</h5>
            </div>
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <label htmlFor="id_empresa">
                                Empresa 
                            </label>
                            <select
                                className="form-control"
                                name="id_empresa"
                                id="id_empresa"
                                type="text"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.id_empresa}
                            >
                                {empresas}
                            </select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <label htmlFor="id_ocupacion">
                                Ocupacion &nbsp;
                                    <input
                                        className="priorityField1"
                                        name="priorityField1"
                                        id="priorityField1"
                                        type="checkbox"
                                        disabled={this.state.fieldDisabled}
                                        checked={this.state.form.priorityField1}
                                        onChange={this.handleChangeCheckBox}
                                    />
                                    <label htmlFor="priorityField1">
                                        Imprescindible
                                    </label>
                            </label>
                            <select
                                className="form-control"
                                name="id_ocupacion"
                                id="id_ocupacion"
                                type="text"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.id_ocupacion}
                            >
                                {ocupaciones}
                            </select>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <label htmlFor="meses_experiencia">
                                Meses experiencia &nbsp;
                                    <input
                                        className="priorityField2"
                                        name="priorityField2"
                                        id="priorityField2"
                                        type="checkbox"
                                        disabled={this.state.fieldDisabled}
                                        checked={this.state.form.priorityField2}
                                        onChange={this.handleChangeCheckBox}
                                    />
                                    <label htmlFor="priorityField1">
                                        Imprescindible
                                    </label>
                            </label>
                            <input
                                className="form-control"
                                name="meses_experiencia"
                                id="meses_experiencia"
                                type="number"
                                min={0} max={1000}
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.meses_experiencia}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <label htmlFor="id_formacion">
                                Formacion &nbsp;
                                    <input
                                        className="priorityField3"
                                        name="priorityField3"
                                        id="priorityField3"
                                        type="checkbox"
                                        disabled={this.state.fieldDisabled}
                                        checked={this.state.form.priorityField3}
                                        onChange={this.handleChangeCheckBox}
                                    />
                                    <label htmlFor="priorityField3">
                                        Imprescindible
                                    </label>
                            </label>
                            <select
                                className="form-control"
                                name="id_formacion"
                                id="id_formacion"
                                type="text"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.id_formacion}
                            >
                                {formaciones}
                            </select>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <label htmlFor="id_vehiculo">
                                Vehículo &nbsp;
                                    <input
                                        className="priorityField4"
                                        name="priorityField4"
                                        id="priorityField4"
                                        type="checkbox"
                                        disabled={this.state.fieldDisabled}
                                        checked={this.state.form.priorityField4}
                                        onChange={this.handleChangeCheckBox}
                                    />
                                    <label htmlFor="priorityField1">
                                        Imprescindible
                                    </label>
                            </label>
                            <select
                                className="form-control"
                                name="id_vehiculo"
                                id="id_vehiculo"
                                type="text"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.id_vehiculo}
                            >
                                {vehiculos}
                            </select>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <label htmlFor="id_municipio">
                                Municipio
                            </label>
                            <select
                                className="form-control"
                                name="id_municipio"
                                id="id_municipio"
                                type="text"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.id_municipio}
                            >
                                {municipios}
                            </select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <label htmlFor="id_jornada">
                                Jornada
                            </label>
                            <select
                                className="form-control"
                                name="id_jornada"
                                id="id_jornada"
                                type="text"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.id_jornada}
                            >
                                {jornadas}
                            </select>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <label htmlFor="salario">
                                Salario bruto anual
                            </label>
                            <input
                                className="form-control"
                                name="salario"
                                id="salario"
                                type="number"
                                min={0} max={100000}
                                maxLength={5}
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.salario}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <label htmlFor="id_contrato">
                                Contrato
                            </label>
                            <select
                                className="form-control"
                                name="id_contrato"
                                id="id_contrato"
                                type="text"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.id_contrato}
                            >
                                {contratos}
                            </select>
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <label htmlFor="puesto_descripcion"
                            >
                                Descripcion puesto
                            </label>
                            <textarea
                                className="form-control"
                                name="puesto_descripcion"
                                id="puesto_descripcion"
                                type="textarea"
                                rows={5}
                                style={{
                                    resize: "none"
                                }}
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.puesto_descripcion}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <label htmlFor="fecha_creacion">
                                Fecha Creacion
                            </label>
                            <input
                                className="form-control"
                                name="fecha_creacion"
                                id="fecha_creacion"
                                type="text"
                                required
                                disabled
                                value={this.state.form.fecha_creacion}
                                />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label htmlFor="id_estado_oferta">
                                Estado Oferta
                            </label>
                            <select
                                className="form-control"
                                name="id_estado_oferta"
                                id="id_estado_oferta"
                                type="text"
                                required
                                disabled
                                onChange={this.handleChange}
                                value={this.state.form.id_estado_oferta}
                            >
                                {estadosOfertas}
                            </select>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                    {this.state.submitButtonEnabled // Action Text
                    ?   <Button
                            color="primary"
                        >
                            Guardar
                        </Button>

                    :   (<div>
                            <Link to="/" className="btn btn-success">Volver al menu principal</Link>
                            {/* <Link to="/" className="btn btn-success">Back to main</Link> */}
                            <div>DATA SAVED</div>
                        </div>)
                }
                    </Col>
                    <hr/>
                </Row>
            </Form>
            {this.state.handleListResultsDisabled
                ?<ListResults offerEditMode = {this.props.offerEditMode}
                    hostAPP = {this.props.hostAPP}
                    offerId = {this.props.offerEditMode
                                ? this.state.editedId
                                : this.state.newId
                            }
                    offerItem = {this.state.form}
                />
                : null
            }
            </>
        );
    }
}
export default withRouter(CreateEditOffer);
