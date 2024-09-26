import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class 
import { Button, Col, Row, Form, FormGroup } from "reactstrap";
 
// BE CARE OF END LINE CLASS CREATEEDITENTERPRISE COMPONENT
// TUNNED withRouter to allow using Router parameters
class CreateEditEnterprise extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            apiUrl: "http://127.0.0.1:5000/addenterprise",
            apiAction: "POST",
            newId: [],
            editedId: this.props.params.id,
            enterpriseItem: [],
            form: {
                id_empresa: "",
                cif: "",
                nombre: "",
                correo_electronico: "",
                persona_contacto: "",
                telefono: "",

            },
            headerText: ["Crear Empresa", "Modificar Empresa"], // headerText: ["Create User", "Edit User"],
            fieldDisabled: false,
            submitButtonEnabled: true,
            initialEditData: false,         // to handle the first time data to edit in ocupations-workers
            repeatedCIF: "",
        };
        this.getEnterpriseItem = this.getEnterpriseItem.bind(this);
        this.clearEnterpriseItem = this.clearEnterpriseItem.bind(this);
        this.handleInitialEditDataOff = this.handleInitialEditDataOff.bind(this); // To handle initialEditData to off
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkCIFExist = this.checkCIFExist.bind(this);
    }
    
checkCIFExist(cifToCheck) {
    axios({
        method: "POST",
        url: `http://127.0.0.1:5000//check_cifexist/"${cifToCheck.target.value}"`,
        withCredentials: false
    })
    .then(response => {
        console.log(response.data);
        console.log("Retrieving repeated CIF");
        this.setState({
            repeatedCIF: Boolean(response.data).valueOf()
        });
    })
    .catch(error => {
        console.log("retrieving getWorkerItem error");
    });
}
    
buildForm() {
    let formData = new FormData();

    formData.append("cif", this.state.form.cif);
    formData.append("nombre", this.state.form.nombre);
    formData.append("correo_electronico", this.state.form.correo_electronico);
    formData.append("persona_contacto", this.state.form.persona_contacto);
    formData.append("telefono", this.state.form.telefono);
    return formData;  
}
    
handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    if (this.state.repeatedCIF) {
        alert("Documento CIF ya existente.");
        this.setState({
            repeatedCIF: false,
            cif: ""
        });
        return null;
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
        if (this.props.workerEditMode){
            console.log("Data modified OK");
        } else {
            this.setState({
                newId: response.data,
            });
            console.log(response.data);
            console.log("Data created OK");
        }
    })
    .catch(error => {
        if (this.props.workerEditMode) {
            return console.log("Worker Data MODIFICATION error");
        } else {
            return console.log("Worder Data CREATION error");
        }
    });
    this.setState ({
        fieldDisabled: true,
        submitButtonEnabled: false
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
        method: "POST",
        url: `http://127.0.0.1:5000/get_listenterprises/${this.state.editedId}`,
        withCredentials: false
    })
    .then(response => {
        this.setState ({
            enterpriseItem: response.data,
            apiAction: "POST",
            // apiUrl: `http://127.0.0.1:5000/get_user`,
            apiUrl: `http://127.0.0.1:5000/editenterprise/${this.state.editedId}`,
            initialEditData: true,
        });
        console.log(response.data);
        console.log("Retrieving getEnterpriseItem data Ok");
    })
    .catch(error => {
        console.log("retrieving getEnterpriseItem error");
    });
}

clearEnterpriseItem() {
    this.setState ({
        enterpriseItem: []
    });
}

// componentWillUnmount() {
//     if (this.props.workerEditMode) {
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
    if (this.state.initialEditData) { // If we are Editing a Worker
            // Adding Line id to work on Ocupations prop modal table, it allows do it¿? it's is supposed props are READ ONLY¿?
        this.handleInitialEditDataOff();
        console.log("pasando por componentDidUpdate");
        const {
            empresas_id_empresa,
            empresas_cif,
            empresas_nombre,
            empresas_correo_electronico,
            empresas_persona_contacto,
            empresas_telefono
            } = this.state.enterpriseItem[0];

            // this.props.clearEnterpriseItem();

            this.setState({
                form: { ...this.state.form,
                    id_empresa: empresas_id_empresa,
                    cif: empresas_cif,
                    nombre: empresas_nombre,
                    correo_electronico: empresas_correo_electronico,
                    persona_contacto: empresas_persona_contacto,
                    telefono: empresas_telefono
                }
            });
    }
}

componentDidMount () {
    if (this.props.enterpriseEditMode) {
        this.getEnterpriseItem();
    }
}

    render() {
        return (
            <>
            <br/>
            <div>
                <h5>{this.props.enterpriseEditMode ? this.state.headerText[1]: this.state.headerText[0]}: {this.state.editedId}</h5>
            </div>
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <label htmlFor="cif">
                                CIF 
                            </label>
                            <input
                                className="form-control"
                                name="cif"
                                id="cif"
                                type="text"
                                maxLength={9}
                                minLength={9}
                                placeholder="X99999999"
                                required
                                // disabled={this.state.fieldDisabled}
                                disabled={(this.state.fieldDisabled && !this.props.enterpriseEditMode) ||
                                    this.props.enterpriseEditMode}
                                onBlur={this.checkCIFExist}
                                onChange={this.handleChange}
                                value={this.state.form.cif}
                                />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <label htmlFor="nombre">
                                Empresa 
                            </label>
                            <input
                                className="form-control"
                                name="nombre"
                                id="nombre"
                                type="text"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.nombre}

                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <label htmlFor="correo_electronico">
                                Correo electrónico 
                            </label>
                            <input
                                className="form-control"
                                name="correo_electronico"
                                id="correo_electronico"
                                type="email"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.correo_electronico}
                                />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <label htmlFor="persona_contacto">
                                Persona Contacto
                            </label>
                            <input
                                className="form-control"
                                name="persona_contacto"
                                id="persona_contacto"
                                type="text"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.persona_contacto}
                                />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <label htmlFor="telefono">
                                Teléfono
                            </label>
                            <input
                                className="form-control"
                                name="telefono"
                                id="telefono"
                                type="text"
                                maxLength={9}
                                placeholder="999999999"
                                required
                                disabled={this.state.fieldDisabled}
                                onChange={this.handleChange}
                                value={this.state.form.telefono}
                                />
                        </FormGroup>
                    </Col>
                </Row>
                {this.state.submitButtonEnabled // Action Text
                    ?   <Button
                            color="primary"
                            // onClick={() => this.handleSubmit(e)}
                            // onSubmit={this.handleSubmit}
                        >
                            Guardar
                        </Button>

                    :   (<div>
                            <Link to="/" className="btn btn-success">Back to main</Link>
                            <div>DATA SAVED</div>
                        </div>)
                }
            </Form>
            </>
        );
    }
}
export default withRouter(CreateEditEnterprise);