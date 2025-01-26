import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
// import SearchOcupations from "./search-ocupations";

class OcupationsWorkers extends Component {
    constructor(props) {    // Receiving props from CreateEditWorker
      super(props); 

        this.state = {
            data: [],
            modalUpdate: false,
            modalInsert: false,
            form: {
                id: "",
                ocupaciones_id_ocupacion: "",
                ocupaciones_descripcion_ocupacion: "",
                trabajadores_ocupaciones_meses: "0",
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
        this.checkLength = this.checkLength.bind(this);
        this.validateValues = this.validateValues.bind(this);
    }

checkLength(e){
    console.log(e);
    if(e.target.value.length === e.target.maxLength && e.key !== "Tab") {
        // console.log("maxlength alcanzado");
        e.stopPropagation();
        e.preventDefault();
        if(e.key === "Tab") {
            if (e.target.value === "") {
                e.target.value = "0";
            } else {
                console.log("pulsado Tab");
                console.log(e.stopPropagation);
            return true;
            }
        }
        if(e.key === "Backspace" || e.key === "Delete") {
            // console.log("backspace o delete pulsado");
            e.target.value = "";
        }    
        return false;
    }
    if (e.target.value.length === 1 && (e.key === "Backspace" || e.key === "Delete")) {
        e.target.value = "0";
    }
    if (parseInt(e.target.value) === 0) {
        return false;
    }
    return true;
}

componentDidUpdate () {
    if (this.props.initialEditData) { // If we are Editing a Worker
            // Adding Line id to work on Ocupations prop modal table, it allows do it¿? it's is supposed props are READ ONLY¿?
        this.props.handleInitialEditDataOff();
        console.log("pasando por componentDidUpdate");
        var index = 0;
        this.props.ocupaciones.forEach(ocupacion => {
            ocupacion['id'] = index + 1;
            index +=1;
        });

        const data = this.props.ocupaciones; // Using in Edit Worker item Ocupaciones !!
//      Passing data from props to data state component
        this.setState({
            data: data
        });
    }
}

componentDidMount(){    
    console.log("pasando por componenDidMount");
    this.setState ({
        data: this.props.ocupaciones
    });
}

validateValues(inputValues) {
    debugger
    if (isNaN(parseInt(inputValues.trabajadores_ocupaciones_meses))) {
        return ("Introducir meses con un valor correcto.")
    }
    if ((parseInt(inputValues.trabajadores_ocupaciones_meses) < 0) ||
        (parseInt(inputValues.trabajadores_ocupaciones_meses) === 0)) {
        return ("Valor meses no válido.")
    }
    if (inputValues.trabajadores_ocupaciones_meses.length === 2 && inputValues.trabajadores_ocupaciones_meses[0] === "0") {
        return ("Valor introducido en meses no válido.")
    }
    var repeated = this.state.data.filter(item => {
        return item.ocupaciones_id_ocupacion === inputValues.ocupaciones_id_ocupacion;
    });
    if (document.querySelector("input#ocupationText.form-control").value === "") {
        return ("Ocupacion vacía.");
        // añadir para que que la ocupación se ponga a ""¿?
    }
    if ((this.state.inputOcupationIncomplete && !this.props.workerEditMode) || 
    (inputValues.ocupaciones_descripcion_ocupacion === "")) {
        return ("Ocupacion incorrecta. Borre Ocupacion y pruebe otra vez.");
        // añadir para que que la ocupación se ponga a ""¿?
    }
    if (repeated.length !== 0 && this.state.modalUpdate !== true) {
        return ("Ocupación ya existente");
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
            ocupaciones_id_ocupacion: "",
            ocupaciones_descripcion_ocupacion: "",
            trabajadores_ocupaciones_meses: "0",
        }
    });
}

closeInsertModal() {
    this.setState({ modalInsert: false });
}

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
            myArray[counter].ocupaciones_id_ocupacion = dato.ocupaciones_id_ocupacion;
            myArray[counter].ocupaciones_descripcion_ocupacion = this.props.ocupacionesData[dato.ocupaciones_id_ocupacion+1];
            myArray[counter].trabajadores_ocupaciones_meses = dato.trabajadores_ocupaciones_meses;
        }
        counter+=1;
    });
    this.setState({ data: myArray, modalUpdate: false });
    this.props.handleUpdateOcupaciones(dato,"edit");
    this.setState({
        form: {
            id: "",
            ocupaciones_id_ocupacion: "",
            ocupaciones_descripcion_ocupacion: "",
            trabajadores_ocupaciones_meses: "0",
        }
    });
};

handleDeleteRecord(dato) {
    var opcion = window.confirm("Estás seguro que deseas Eliminar la ocupacion "+dato.ocupaciones_descripcion_ocupacion);
    if (opcion === true) {
        this.setState({
            data: this.state.data.filter(item => {
            return item.ocupaciones_id_ocupacion !== dato.ocupaciones_id_ocupacion;
            })
        });
        this.props.handleUpdateOcupaciones(dato,"delete");
    }
};

handleInsertRecord() {
    var errors = this.validateValues(this.state.form);
    if (errors !== ""){
        alert(errors);
        return ;
    }
    var newValue= {...this.state.form};
    // Allway override newValue.descripcion_ocupacion due to not possible 
    // to start state with props for initial value
    // if (this.state.data.length === 0 && this.state.form.id_ocupacion === "1") { // It is the first line introduced and id_ocupation was not changed
    //     newValue.descripcion_ocupacion = this.props.ocupacionesData[0].descripcion_ocupacion
    // } else {
    //     newValue.descripcion_ocupacion = this.props.ocupacionesData[newValue.id_ocupacion-1].descripcion_ocupacion
    // }

    newValue.id = this.newIdGenerator();
    var lista= this.state.data;
    lista.push(newValue);
    this.setState({ 
        modalInsert: false,
        data: lista,
     });
    this.props.handleUpdateOcupaciones(lista,"insert");
    this.setState({
        form: {
            id: "",
            ocupaciones_id_ocupacion: "",
            ocupaciones_descripcion_ocupacion: "",
            trabajadores_ocupaciones_meses: "0",
        },
    });
}

handleChange(e) {
    console.log(e);
    if (e.target.name === "ocupationText") {
        const selectedOption = e.target.value;
        // Encontramos la opción que coincide con el valor seleccionado en el datalist
        const datalist = document.getElementById('ocupationList');
        const options = Array.from(datalist.options);
        const selectedOptionElement = options.find(option => option.value === selectedOption);
        if (selectedOptionElement) {
          const dataIdOcupacion = selectedOptionElement.getAttribute('data-idocupacion');
          console.log('data-idocupacion:', dataIdOcupacion);
          // Aquí puedes hacer algo con el valor de data-idocupacion
          this.setState ({
              form: {
                  ...this.state.form,
                  ocupaciones_descripcion_ocupacion: e.target.value,
                  ocupaciones_id_ocupacion: dataIdOcupacion
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
    const ocupaciones = this.props.ocupacionesData.map((ocupacion => {
        return ( 
            <option key={ocupacion.id_ocupacion} value={ocupacion.descripcion_ocupacion}
                data-idocupacion={ocupacion.id_ocupacion}/>
        );
    }));

    return (
        <>
        <Container>
            <Button color="success" 
                disabled={this.props.fieldDisabled}
                onClick={()=>this.showInsertModal()}
                title="Crear Ocupaciones"
            // >Crear
            >
                <FontAwesomeIcon icon={faPlusCircle} />
            </Button>
            {/* Ocupations  */}
            Ocupaciones
            <Table size="sm">
                <thead>
                    <tr>
                        <th>Ocupacion</th>
                        <th>Meses</th>
                        <th>Acción</th>
                    </tr>
                </thead>

                <tbody id="ocupationsTableRows">
                    {this.state.data.map((dato) => (
                        <tr key={dato.ocupaciones_id_ocupacion}>
                            <td title={dato.ocupaciones_descripcion_ocupacion}
                            >
                                {dato.ocupaciones_descripcion_ocupacion}</td>
                            <td>{dato.trabajadores_ocupaciones_meses}</td>
                            <td>
                                <Button
                                    color="primary"
                                    disabled={this.props.fieldDisabled}
                                    onClick={() => this.showUpdateModal(dato)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>{" "}
                                <Button 
                                    color="danger"
                                    disabled={this.props.fieldDisabled}
                                    onClick={()=> this.handleDeleteRecord(dato)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
            {/* Modal start with autofocus=false to allow autofocus in Id ocupacion */}
        <Modal autoFocus={false} isOpen={this.state.modalUpdate}>
            <ModalHeader>
                <div><h3>Editar Ocupación</h3></div>
            </ModalHeader>
  
            <ModalBody>
            <FormGroup hidden>
                <label>
                        Línea Id:
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
                        Ocupación: {this.state.form.ocupaciones_descripcion_ocupacion}
                    </label>
                </FormGroup>
                <FormGroup>
                    <label>
                        Meses: 
                    </label>
                    <input
                        className="form-control"
                        name="trabajadores_ocupaciones_meses"
                        type="text"
                        maxLength={3}
                        min={1} max={999}
                        required
                        onKeyDown={e=>this.checkLength(e)}
                        onChange={this.handleChange}
                        value={this.state.form.trabajadores_ocupaciones_meses}
                    />
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
  
        <Modal autoFocus={false} isOpen={this.state.modalInsert}>
            <ModalHeader>
                <div><h3>Insertar Ocupación</h3></div>
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
                        Ocupacion: 
                    </label>
                    <input type="search" name="ocupationText" id="ocupationText" list="ocupationList"
                        autoComplete="on"
                        onChange={this.handleChange}
                        autoFocus="yes"
                        className="form-control"
                        placeholder="Clickar, escribir término y seleccione de la lista"
                    />
                    <datalist
                        id="ocupationList"
                    >
                        {ocupaciones}
                    </datalist>
                </FormGroup>

                <FormGroup>
                    <label>
                        Meses: 
                    </label>
                    <input
                        className="form-control"
                        name="trabajadores_ocupaciones_meses"
                        type="number"
                        maxLength={3}
                        min={1} max={999}
                        required
                        onKeyDown={e=>this.checkLength(e)}
                        onChange={this.handleChange}
                        value={this.state.form.trabajadores_ocupaciones_meses}
                    />
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

export default OcupationsWorkers;