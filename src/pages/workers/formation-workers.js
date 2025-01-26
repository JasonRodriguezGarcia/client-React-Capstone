import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
// import SearchOcupations from "./search-formations";

class FormationsWorkers extends Component {
    constructor(props) {
      super(props); 
        this.state = {
            data: [],
            modalUpdate: false,
            modalInsert: false,
            form: {
                id: "",
                trabajadores_formaciones_id_formacion: "",
                formaciones_descripcion_formacion: "",
            },
            inputOcupationIncomplete: true,
        };
      
        this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
        this.handleInsertRecord = this.handleInsertRecord.bind(this);
        this.handleEditRecord = this.handleEditRecord.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showInsertModal = this.showInsertModal.bind(this);
        this.showUpdateModal = this.showUpdateModal.bind(this);
        this.closeInsertModal = this.closeInsertModal.bind(this);
        this.newIdGenerator = this.newIdGenerator.bind(this);
        this.validateValues = this.validateValues.bind(this);
        this.clickFormations = this.clickFormations.bind(this);
    }

clickFormations(e) {
    console.log("onclick en formations: ",e);
}
componentDidUpdate() {
    if (this.props.initialEditData) { // If we are Editing a Worker
            // Adding Line id to work on Formations prop modal table, it allows do it¿? it's is supposed props are READ ONLY¿?
        this.props.handleInitialEditDataOff();
        console.log("pasando por componentDidUpdate");
        var index = 0;
        this.props.formaciones.forEach(formacion => {
            formacion['id'] = index + 1;
            index +=1;
        });

        const data = this.props.formaciones; // Using in Edit Worker item Formaciones !!
//      Passing data from props to data state component
        this.setState({
            data: data
        });
    }
}

componentDidMount(){    
    console.log("pasando por componenDidMount");
    this.setState ({
        data: this.props.formaciones
    });
}

validateValues(inputValues) {
    debugger
    if ((inputValues.formaciones_descripcion_formacion === "") || 
        (parseInt(inputValues.trabajadores_formaciones_id_formacion === "")) ||
        document.querySelector("input#formationText.form-control").value === "") {
        return ("Formación vacía");
    }
    var repeated = this.state.data.filter(item => {
        console.log("imprimo item.trabajadores_formaciones_id_formacion", item.trabajadores_formaciones_id_formacion);
        return item.trabajadores_formaciones_id_formacion === inputValues.trabajadores_formaciones_id_formacion;
    });
    if (repeated.length !== 0 && this.state.modalUpdate !== true) {
        return ("Formación ya existente");
    }
    return "";
}

showUpdateModal(dato) {
    this.setState({
      form: dato,
      modalUpdate: true,
    });
  };

closeUpdateModal = () => {
    this.setState({ modalUpdate: false });
};

showInsertModal() {
    this.setState({
        modalInsert: true,
        form: {
            id: "",
            trabajadores_formaciones_id_formacion: "",
            formaciones_descripcion_formacion: "",
            // formaciones_id_formacion: "1",
            // formaciones_descripcion_formacion: this.props.formacionesData[0].descripcion_formacion,
        }

    });
}

closeInsertModal() {
    this.setState({ modalInsert: false });
};

newIdGenerator() {
    if (this.state.data.length >= 1) {
        var sortedActualDataArray = this.state.data.sort((a, b) => {return a.id-b.id});
        return (sortedActualDataArray[sortedActualDataArray.length-1].id+1);
    } else {
        return (1); // First time modal is oppened, initial record id assignement
    }
}

handleEditRecord(dato) {
    var errors = this.validateValues(this.state.form);
    if (errors !== ""){
        alert(errors);
        return ;
    }
    var counter = 0;
    var myArray = this.state.data;
    myArray.forEach((registro) => {
        if (dato.id === registro.id) {
            myArray[counter].trabajadores_formaciones_id_formacion = dato.trabajadores_formaciones_id_formacion;
            myArray[counter].formaciones_descripcion_formacion = this.props.formacionesData[dato.trabajadores_formaciones_id_formacion+1];
            // myArray[counter].ocupaciones_descripcion_ocupacion = this.props.ocupacionesData[dato.ocupaciones_id_ocupacion+1];
        }
        counter+=1;
    });
    this.setState({ data: myArray, modalUpdate: false });
    this.props.handleUpdateFormaciones(dato,"edit");
    this.setState({
        form: {
            id: "",
            trabajadores_formaciones_id_formacion: "",
            formaciones_descripcion_formacion: "",
        }
    });
};

handleDeleteRecord(dato) {
    var opcion = window.confirm("Estás seguro que deseas Eliminar la formación "+dato.formaciones_descripcion_formacion);
    if (opcion === true) {
        this.setState({
            data: this.state.data.filter(item => {
            return item.trabajadores_formaciones_id_formacion !== dato.trabajadores_formaciones_id_formacion;
            })
        });
        this.props.handleUpdateFormaciones(dato,"delete");
    }
};

handleInsertRecord() {
    var errors = this.validateValues(this.state.form);
    if (errors !== ""){
        alert(errors);
        return ;
    }
    var newValue= {...this.state.form};
    // Allway override newValue.descripcion_formacion due to not possible 
    // to start state with props for initial value
    // if (this.state.data.length === 0 && this.state.form.id_formacion === "1") { // It is the first line introduced and id_formacion was not changed
    //     newValue.descripcion_formacion = this.props.formacionesData[0].descripcion_formacion
    // } else {
    //     newValue.descripcion_formacion = this.props.formacionesData[newValue.id_formacion-1].descripcion_formacion
    // }

    newValue.id = this.newIdGenerator();
    var lista= this.state.data;
    lista.push(newValue);
    this.setState({ 
        modalInsert: false,
        data: lista,
     });
    this.props.handleUpdateFormaciones(lista,"insert");
    this.setState({
        form: {
            id: "",
            trabajadores_formaciones_id_formacion: "",
            formaciones_descripcion_formacion: "",
        },
    });
}

handleChange(e) {
    // console.log(e);
    // if (e.target.name === "formationsText") {
    //     console.log(e);
    //     this.setState({
    //         form: {
    //         ...this.state.form,
    //         [e.target.name]: e.target.value,
    //         descripcion_formacion: this.props.formacionesData[e.target.value-1].descripcion_formacion
    //         }
    //     });
    // } else {
    //     this.setState({
    //         form: {
    //         ...this.state.form,
    //         [e.target.name]: e.target.value,
    //         },
    //     });
    // }
    if (e.target.name === "formationText") {
        const selectedOption = e.target.value;
        // Encontramos la opción que coincide con el valor seleccionado en el datalist
        const datalist = document.getElementById('formationList');
        const options = Array.from(datalist.options);
        const selectedOptionElement = options.find(option => option.value === selectedOption);
        if (selectedOptionElement) {
          const dataIdFormacion = selectedOptionElement.getAttribute('data-idformacion');
          console.log('data-idformacion:', dataIdFormacion);
          // Aquí puedes hacer algo con el valor de data-idFormacion
          this.setState ({
              form: {
                  ...this.state.form,
                  formaciones_descripcion_formacion: e.target.value,
                  trabajadores_formaciones_id_formacion: dataIdFormacion
                },
                inputOcupationIncomplete: false
            });
        } else {
            this.setState({ inputOcupationIncomplete: true }); 
        }
    } else {
        
        this.setState({
            form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
            },
        });
    }

}

render() {
    const formaciones = this.props.formacionesData.map((formacion => {
        return ( 
            <option key={formacion.id_formacion} value={formacion.descripcion_formacion}
                data-idformacion={formacion.id_formacion}/>
        );
    }));

    return (
        <>
        <Container>
            <Button color="success" 
                disabled={this.props.fieldDisabled}
                onClick={()=>this.showInsertModal()}
                title="Crear Formaciones"
            >
                <FontAwesomeIcon icon={faPlusCircle} />
            </Button>
            Formaciones
            <Table size="sm">
                <thead>
                    <tr>
                        <th>Formación</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody id="formationsTableRows">
                    {this.state.data.map((dato) => (
                        <tr key={dato.trabajadores_formaciones_id_formacion}>
                            <td title={dato.formaciones_descripcion_formacion}
                            >
                                {dato.formaciones_descripcion_formacion}
                            </td>
                            <td>
                                <Button 
                                    color="danger"
                                    disabled={this.props.fieldDisabled}
                                    onClick={()=> this.handleDeleteRecord(dato)}
                                >
                                    {/* Eliminar */}
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
            {/* Modal start with autofocus=false to allow autofocus in Id formacion */}
        <Modal autoFocus={false} isOpen={this.state.modalUpdate}>
            <ModalHeader>
                <div><h3>Editar Formación</h3></div>
            </ModalHeader>
  
            <ModalBody>
                <FormGroup hidden>
                    <label>
                        Id:
                    </label>
                    <input
                        className="form-control"
                        name="id"
                        readOnly
                        type="text"
                        value={this.state.form.id}
                    />
                </FormGroup>
              
                <FormGroup>
                    <label>
                        Formación: {this.state.form.formaciones_descripcion_formacion}
                    </label>
                    {/* <label>
                        Formación:
                    </label>
                    <select
                        className="form-control"
                        name="id_formacion"
                        disabled={true}
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.form.id_formacion}
                    >
                        {formaciones}
                    </select> */}
                </FormGroup>
            </ModalBody>
  
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => this.handleEditRecord(this.state.form)}
                >
                    Save
                    {/* Guardar */}
                </Button>
                <Button
                    color="danger"
                    onClick={() => this.closeUpdateModal()}
                >
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
  
            {/* Modal start with autofocus=false to allow autofocus in Id formacion */}
        <Modal autoFocus={false} isOpen={this.state.modalInsert}>
            <ModalHeader>
                <div><h3>Insertar Formación</h3></div>
            </ModalHeader>

            <ModalBody>
                <FormGroup hidden>
                    <label>
                        Linea Id: 
                    </label>
                    <input
                        className="form-control"
                        name="id"
                        readOnly
                        type="number"
                        onChange={this.handleChange}
                        value={this.newIdGenerator()}
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                        Formación: 
                    </label>
                    <input type="search" name="formationText" id="formationText" list="formationList"
                        autoComplete="on"
                        onChange={this.handleChange}
                        onClick={this.clickFormations}
                        className="form-control"
                        placeholder="Escribir término y seleccione de la lista"
                    />
                    <datalist
                        id="formationList"
                    >
                        {formaciones}
                    </datalist>

                    {/* <SearchOcupations ocupationsData = {this.props.formacionesData}
                        handleOcupation = {this.handleOcupation}
                        form = {this.state.form}
                        handleInputOcupationIncomplete = {this.handleInputOcupationIncomplete}
                        // inputOcupationIncomplete = {this.state.inputOcupationIncomplete}
                        // form = {this.state.form}
                    /> */}
                    {/* <select
                        className="form-control"
                        name="id_formacion"
                        type="number"
                        autoFocus={true}
                        autoComplete="on"
                        onChange={this.handleChange}
                        value={this.state.form.id_formacion}
                    >
                        {formaciones}
                    </select> */}
                </FormGroup>
            </ModalBody>

            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => this.handleInsertRecord()}
                >
                    Save
                    {/* Guardar */}
                </Button>
                <Button
                    className="btn btn-danger"
                    onClick={() => this.closeInsertModal()}
                >
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
        </>
        );
    }
}

export default FormationsWorkers;