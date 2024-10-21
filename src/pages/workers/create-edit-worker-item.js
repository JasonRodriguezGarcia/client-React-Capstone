import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "moment";
import { registerLocale } from  "react-datepicker";
import { es } from 'date-fns/locale/es';
import OcupationsWorkers from "./ocupations-workers";
import FormationsWorkers from "./formation-workers";
import PdftoView from "../../assets/LOPD.pdf";
import ViewCurriculumPdf from "../../shared/view-curriculum-pdf";
registerLocale('es', es)    // DatePicker config

// TODO:
//     - carnets subform
//     - idiom subform
//         -level subform
//     - SEND EMAIL when worker is created using this.state.newId

class CreateEditWorkerItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiAction: "POST",
            apiUrl: this.props.hostAPP + "/addworker",
            id: 0,
            nombre: "",
            apellidos: "",
            fecha_nacimiento: Moment(new Date()).format('YYYY-MM-DD'),
            doi: "",
            id_municipio: 1,
            codigo_postal: 0,
            id_provincia: 1,
            id_vehiculo: 1,
            curriculum: "",
            telefono_contacto: "",
            correo_electronico: "",
            id_situacion: 1,
            lopd: false,
            ocupaciones: [],
            formaciones: [],
            headerText: ["Crear Trabajador", "Modificar Trabajador"], // headerText: ["Create User", "Edit User"],
            fieldDisabled: false,           // to handle fields editting
            submitButtonEnabled: true,      // to handle Submit button
            curriculumIconEnabled: false,   // to handle pdf icon viewer
            curriculumFileOK: false,
            initialEditData: false,         // to handle the first time data to edit in ocupations-workers
            myHover: false,
            repeatedDOI: "",
        };            

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldsDisabled = this.handleFieldsDisabled.bind(this);
        this.handleChangeTrabajadores_situaciones = this.handleChangeTrabajadores_situaciones.bind(this);
        this.handleChangeVehiculos = this.handleChangeVehiculos.bind(this);
        this.handleChangeProvincias = this.handleChangeProvincias.bind(this);
        this.handleChangeMunicipios = this.handleChangeMunicipios.bind(this);
        this.handleChangeLOPD = this.handleChangeLOPD.bind(this);
        this.handleChangeCurriculumPDF = this.handleChangeCurriculumPDF.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.convertBase64 = this.convertBase64.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleUpdateOcupaciones = this.handleUpdateOcupaciones.bind(this); // To update Ocupaciones when leaving OcupationsWorkers
        this.handleUpdateFormaciones = this.handleUpdateFormaciones.bind(this); // To update Formaciones when leaving FormationsWorkers
        this.handleInitialEditDataOff = this.handleInitialEditDataOff.bind(this); // To handle initialEditData to off
        this.handleHover = this.handleHover.bind(this);
        this.checkDOIExist = this.checkDOIExist.bind(this);
    }

handleHover() {
    if (this.state.fieldDisabled ) {
        return
    }
    if (!this.state.myHover){
        this.setState({
            myHover: true
        });
    } else {
        this.setState({
            myHover: false
        });
    }
}

viewPdfFile(file) {
    window.open(file);
}

handleInitialEditDataOff() {
    this.setState({
        initialEditData: false
    })
}

handleUpdateFormaciones(data, action) {
    if (action === "insert"){
        this.setState({
            formaciones: [...data]  // Another good practise could be .concat
        });
    }else if (action === "delete") {
            this.setState({
                formaciones: this.state.formaciones.filter(item => {
                        return item.id !== data.id})
            });
    }else if(action === "edit") {
        var counter = 0;
        var myArray = this.state.formaciones;
        myArray.map((registro) => {
            if (data.id === registro.id) {
                myArray[counter].id_ocupacion = data.id_ocupacion;
                myArray[counter].descripcion_ocupacion = data.descripcion_ocupacion;
                myArray[counter].meses = data.meses;
            }
            counter++;
        });
        this.setState({
            formaciones: myArray
        });
    }
}

handleUpdateOcupaciones(data, action) {
    if (action === "insert"){
        this.setState({
            ocupaciones: [...data]  // Another good practise could be .concat
        });
    }else if (action === "delete") {
            this.setState({
                ocupaciones: this.state.ocupaciones.filter(item => {
                        return item.id !== data.id})
            });
    }else if(action === "edit") {
        var counter = 0;
        var myArray = this.state.ocupaciones;
        myArray.map((registro) => {
            if (data.id === registro.id) {
                myArray[counter].id_ocupacion = data.id_ocupacion;
                myArray[counter].descripcion_ocupacion = data.descripcion_ocupacion;
                myArray[counter].meses = data.meses;
            }
            counter++;
        });
        this.setState({
            ocupaciones: myArray
        });
    }
}

async uploadFile(e) {
    // console.log(e);
    // console.log(e.target.files);
    // console.log(e.target.files[0]);
    const fileName = (e.target.files[0].name)+", ";
    let files = e.target.files[0];
    let base64 = await this.convertBase64(files);
    console.log(base64);
    this.setState({
        curriculum: fileName+base64
    });
}

convertBase64(file) {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);   
        fileReader.onload = () => {
            resolve(fileReader.result);
        };   
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

componentWillUnmount() {
    if (this.props.workerEditMode) {
        console.log("ID Edited:")
        console.log(this.state.id);
    } else {
        console.log("ID created:")
        console.log(this.state.newId);
    }
    // alert("send sms");
}

componentDidUpdate () {
    if (Object.keys(this.props.workerItem).length > 0) {
        const {
            id,
            nombre,
            apellidos,
            fecha_nacimiento,
            doi,
            id_municipio,
            codigo_postal,
            id_provincia,
            id_vehiculo,
            curriculum,
            telefono_contacto,
            correo_electronico,
            id_situacion,
            lopd,
            ocupaciones,
            formaciones
            }  = this.props.workerItem[0];
        
        this.props.clearWorkerItem();

        if (curriculum) {
            // PROCESS TO POPULATE input WITH ATTACHED FILE DETAILS
            // Retrieving filename
            const i = curriculum.indexOf(',');
            const fileName = curriculum.slice(0, i);
            // Create a new File object
            const myFile = new File([curriculum], fileName, {
                type: 'application/pdf',
                lastModified: new Date(),
            });   
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(myFile);//your file(s) reference(s)
            document.getElementById('input').files = dataTransfer.files;
            console.log(dataTransfer);
        }

        this.setState({
            id: id,
            nombre: nombre || "",
            apellidos: apellidos || "",
            fecha_nacimiento: fecha_nacimiento || "",
            doi: doi || "",
            id_municipio: id_municipio || 1,
            codigo_postal: codigo_postal || "",
            id_provincia: id_provincia  || 1,
            id_vehiculo: id_vehiculo || 1,
            curriculum: curriculum || "",
            telefono_contacto: telefono_contacto || "",
            correo_electronico: correo_electronico || "",
            id_situacion: id_situacion || 1,
            lopd: lopd,
            ocupaciones: ocupaciones,
            formaciones: formaciones,
            apiUrl: this.props.hostAPP + `/editworker/${this.props.editedId}`,
            curriculumIconEnabled: true,
            initialEditData: true,
        });
        console.log(ocupaciones);
        console.log(formaciones);
    }
}

buildForm() {
    let formData = new FormData();

    formData.append("trabajadores[trabajadores_nombre]", this.state.nombre);
    formData.append("trabajadores[trabajadores_apellidos]", this.state.apellidos);
    formData.append("trabajadores[trabajadores_fecha_nacimiento]", this.state.fecha_nacimiento);
    formData.append("trabajadores[trabajadores_doi]", this.state.doi.toString().toUpperCase());
    formData.append("trabajadores[trabajadores_id_municipio]", this.state.id_municipio);
    formData.append("trabajadores[trabajadores_codigo_postal]", this.state.codigo_postal);
    formData.append("trabajadores[trabajadores_id_provincia]", this.state.id_provincia);
    formData.append("trabajadores[trabajadores_id_vehiculo]", this.state.id_vehiculo);
    formData.append("trabajadores[trabajadores_curriculum]", this.state.curriculum);
    formData.append("trabajadores[trabajadores_telefono_contacto]", this.state.telefono_contacto);
    formData.append("trabajadores[trabajadores_correo_electronico]", this.state.correo_electronico);
    formData.append("trabajadores[trabajadores_id_situacion]", this.state.id_situacion);
    formData.append("trabajadores[trabajadores_lopd]", this.state.lopd);
    formData.append("trabajadores[trabajadores_ocupaciones]", JSON.stringify(this.state.ocupaciones));
    formData.append("trabajadores[trabajadores_formaciones]", JSON.stringify(this.state.formaciones));
    return formData;  
}

handleSubmit(event) {
    event.preventDefault();
    if (document.getElementById("ocupationsTableRows").rows.length === 0) {
        alert ("Obligatorio introducir al menos una Ocupación");
        return null;
    }
    var a = Moment(this.state.fecha_nacimiento).month(0).format('YYYY-MM-DD');
    var b = Moment(new Date()).format('YYYY-MM-DD');
    if ((b.slice(0,4)-a.slice(0,4)) < 45) {  // if less than 45 years old
        alert("Para poder dar de alta hay que tener por lo menos 45 años");
        return null;
    }
    if (this.state.repeatedDOI) {
        alert("Documento NIF/NIE ya existente.");
        this.setState({
            repeatedDOI: false,
            doi: ""
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
            console.log(response.data);
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
    document.getElementById('iconPDF').style.color = "grey";
    document.getElementById('iconPDF').style.cursor = "default";
    this.setState ({
        fieldDisabled: true,
        submitButtonEnabled: false
    });
}
    
handleFieldsDisabled() {
    this.setState ({
            fieldDisabled: true
    });
}

handleChange(event) {
    // console.log("evento handleChange: ",event);
    this.setState ({
        [event.target.name]: [event.target.value]
    });
}

handleChangeTrabajadores_situaciones(event) {
    this.setState ({
        id_situacion: [event.target.value],
        [event.target.name]: this.props.situacionesData[event.target.value-1].descripcion_situacion
    });
}

handleChangeVehiculos(event) {
    this.setState ({
        id_vehiculo: [event.target.value],
        [event.target.name]: this.props.vehiculosData[event.target.value-1].descripcion_vehiculo
    });
}

handleChangeProvincias(event) {
    this.setState ({
        id_provincia: [event.target.value],
        [event.target.name]: this.props.provinciasData[event.target.value-1].descripcion_provincia
    });
}

handleChangeMunicipios(event) {
    this.setState ({
        id_municipio: [event.target.value],
        [event.target.name]: this.props.municipiosData[event.target.value-1].descripcion_municipio
    });
}

handleChangeLOPD(event) {
    // console.log(event)
    this.setState ({
        lopd: [event.target.checked],
        [event.target.name]: event.target.checked
    });
}

handleChangeCurriculumPDF(event) {
// console.log(event);
    if(event.target.files.length >= 1){
        if(event.target.files[0].size > 5 * 1000 * 1024) {
                alert("Fichero muy grande maximo 5Mb");
            // BORRAR FICHERO, desactivar icono pdf
            // Remove all files from the FileList
            document.getElementById('input').value = []
            // Deactivate Pdf icon
            if(this.state.curriculumIconEnabled) {
                this.setState({
                    curriculumIconEnabled: false
                })
            }
            return
        }
        this.uploadFile(event);
        this.setState ({
            curriculumIconEnabled: true,
        });
    }
    else if (this.state.curriculum){
        // alert(document.getElementById("input").value);
        //Cancel button has been called and a previous file was already selected
        // in a previous situation before canceling selecting another file again in new file browser
            // PROCESS TO rePOPULATE input WITH current ATTACHED FILE DETAILS
            // due to file details in file selected field were lost
            // Retrieving filename
            const i = this.state.curriculum.indexOf(',');
            const fileName = this.state.curriculum.slice(0, i);
            // Create a new File object
            const myFile = new File([this.state.curriculum], fileName, {
                type: 'application/pdf',
                lastModified: new Date(),
            });   
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(myFile);//your file(s) reference(s)
            document.getElementById('input').files = dataTransfer.files;
    }
}

handleChangeDate(date) {
    // console.log(date);
    if (date){
        // Formatting date to avoid long date with time
        this.setState({
            fecha_nacimiento: Moment(date).format('YYYY-MM-DD'),
        });
    }
}

checkDOIExist(doiToCheck) {
    console.log("imprimo doiToCheck: ", doiToCheck);
    axios({
        method: "GET",
        url: this.props.hostAPP + `/check_doiexist/"${doiToCheck.target.value}"`,
        withCredentials: false
    })
    .then(response => {
        console.log(response.data);
        console.log("Retrieving repeated DOI");
        this.setState({
            repeatedDOI: Boolean(response.data).valueOf()
        });
    })
    .catch(error => {
        console.log("retrieving getWorkerItem error");
    });
}

render() {
    const situaciones = this.props.situacionesData.map((situacion => {
        return ( 
            <option key={situacion.id_situacion} value={situacion.id_situacion}>{situacion.descripcion_situacion} </option> 
        );
    }));
    // const optionsCarnets = this.props.carnetsData.map((carnet => {
    //     return ( 
    //         <option key={carnet.id_carnet} value={carnet.id_carnet}>{carnet.descripcion_carnet} </option> 
    //     );
    // }));
    const optionsVehiculos = this.props.vehiculosData.map((vehiculo => {
        return ( 
            <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>{vehiculo.descripcion_vehiculo} </option> 
        );
    }));
    const optionsProvincias = this.props.provinciasData.map((provincia => {
        return ( 
            <option key={provincia.id_provincia} value={provincia.id_provincia}>{provincia.descripcion_provincia} </option> 
        );
    }));
    const optionsMunicipios = this.props.municipiosData.map((municipio => {
        return ( 
            <option key={municipio.id_municipio} value={municipio.id_municipio}>{municipio.descripcion_municipio} </option> 
        );
    }));

    
    return (
        <div>
        {/* // <div className="container h-100">
            // <div className="card shadow">
            //     <div className="card-body"> */}
                    <h5>{this.props.workerEditMode ? this.state.headerText[1]: this.state.headerText[0]}: {this.props.editedId}</h5>
                    <form name="formData" onSubmit={this.handleSubmit}>
                        <div className="row mb-1">
                            <div className="col">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" className="form-control" id="nombre" name="nombre" value={this.state.nombre}
                                    disabled={this.state.fieldDisabled} placeholder="Nombre" onChange={this.handleChange}
                                    required={true} />
                            </div>
                            <div className="col">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" className="form-control" id="apellidos" name="apellidos" value={this.state.apellidos} 
                                    disabled={this.state.fieldDisabled} placeholder="Apellidos" onChange={this.handleChange}
                                    required={true} />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col d-flex flex-column">
                                <div>
                                    <label htmlFor="fechanacimiento">Fecha Nacimiento</label>
                                </div>
                                <div>
                                    <DatePicker className="form-control"
                                        id="fechanacimiento"
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.fecha_nacimiento}
                                        showIcon
                                        locale="es"
                                        showYearDropdown
                                        yearDropdownItemNumber={70}
                                        scrollableYearDropdown
                                        disabled={this.state.fieldDisabled}
                                        onChange={this.handleChangeDate}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <label htmlFor="doi">DNI/NIE</label>
                                <input type="text" className="form-control" id="doi" name="doi" value={this.state.doi} 
                                    disabled={(this.state.fieldDisabled && !this.props.workerEditMode) ||
                                                this.props.workerEditMode}
                                    onBlur={this.checkDOIExist}
                                    onChange={this.handleChange}  
                                    maxLength={9} required={true} placeholder="X99999999 ó 99999999A"/>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col">
                                <label htmlFor="municipio">Municipio</label>
                                <select name="municipio" id="municipio" className="form-control" value={this.state.id_municipio} onChange={this.handleChangeMunicipios}
                                    disabled={this.state.fieldDisabled}>
                                    {optionsMunicipios} 
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="codigo_postal">Codigo Postal</label>
                                <input type="text" className="form-control" id="codigo_postal" name="codigo_postal" value={this.state.codigo_postal} 
                                    disabled={this.state.fieldDisabled} onChange={this.handleChange} 
                                    maxLength={5} placeholder="99999" pattern="[0-9]{5}" required={true}/>
                            </div>
                            <div className="col">
                                <label htmlFor="provincia">Provincia</label>
                                <select name="provincia" id="provincia" className="form-control" value={this.state.id_provincia} onChange={this.handleChangeProvincias}
                                    disabled={this.state.fieldDisabled}>
                                    {optionsProvincias} 
                                </select>
                            </div>
                        </div>    
                        <div className="row mb-1">
                            <div className="col">
                                <label htmlFor="vehiculo">Vehículo</label>
                                <select name="vehiculo" id="vehiculo" className="form-control" value={this.state.id_vehiculo} onChange={this.handleChangeVehiculos}
                                    disabled={this.state.fieldDisabled}>
                                    {optionsVehiculos} 
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="telefono_contacto">Teléfono de Contacto</label>
                                <input type="text" name="telefono_contacto" id="telefono_contacto" className="form-control"value={this.state.telefono_contacto} 
                                    disabled={this.state.fieldDisabled} onChange={this.handleChange} 
                                    maxLength={9} placeholder="999999999" pattern="[0-9]{3}[0-9]{6}" required={true}/>
                                    {/* revisar mas tarde: https://desarrolloweb.com/articulos/1251.php */}
                            </div>
                            <div className="col">
                                <label htmlFor="correo_electronico">Correo Electrónico</label>
                                <input type="email" className="form-control" id="correo_electronico" name="correo_electronico" value={this.state.correo_electronico} 
                                    disabled={this.state.fieldDisabled} onChange={this.handleChange} 
                                    placeholder="ejemplo: test@test.com" required={true}/>
                            </div>
                            <div className="col">
                                <label htmlFor="situacion">Situación</label>
                                <select name="situacion" id="situacion" className="form-control" value={this.state.id_situacion} onChange={this.handleChangeTrabajadores_situaciones}
                                    disabled={this.state.fieldDisabled}>
                                    {situaciones} 
                                </select>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col">
                                <OcupationsWorkers ocupaciones={this.state.ocupaciones}
                                    ocupacionesData={this.props.ocupacionesData}
                                    fieldDisabled={this.state.fieldDisabled}
                                    handleUpdateOcupaciones={this.handleUpdateOcupaciones}
                                    workerEditMode={this.props.workerEditMode}
                                    initialEditData={this.state.initialEditData}
                                    handleInitialEditDataOff={this.handleInitialEditDataOff}
                                    />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col">
                                <FormationsWorkers formaciones={this.state.formaciones}
                                    formacionesData={this.props.formacionesData}
                                    fieldDisabled={this.state.fieldDisabled}
                                    handleUpdateFormaciones={this.handleUpdateFormaciones}
                                    workerEditMode={this.props.workerEditMode}
                                    initialEditData={this.state.initialEditData}
                                    handleInitialEditDataOff={this.handleInitialEditDataOff}
                                    />
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col">
                                <label htmlFor="input">Seleccione Fichero PDF (tamaño max. 5Mb)</label>
                                <input type="file" id="input" className="form-control" name="input" 
                                    disabled={this.state.fieldDisabled} onChange={this.handleChangeCurriculumPDF}
                                    accept=".pdf" required/>
                                    {/* añadir a secas para varios ficheros --> multiple */}
                            </div>
                            <div className="col">
                                    <div className="pdf-link">
                                        {/* Curriculum icon is enabled if there is an attached file or is fieldDisabled = false */}
                                        {this.state.curriculumIconEnabled   // type="button" to avoid SUBMIT default behaviour
                                            ?   <button  type="button" id="buttonPDF" aria-label="buttonPDF" disabled={this.state.fieldDisabled} onClick={() => ViewCurriculumPdf(this.state.curriculum)}>
                                                    <FontAwesomeIcon id="iconPDF" icon={faFilePdf} 
                                                        style={{
                                                            cursor: "pointer",
                                                            color: this.state.myHover ? "blue" : "green",
                                                            fontSize: "1.5em",
                                                        }}
                                                        onMouseEnter= {() => this.handleHover()}
                                                        onMouseLeave= {() => this.handleHover()}
                                                />
                                                </button>
                                            : null
                                        }
                                    </div>
                            </div>
                            <div className="col">
                                <fieldset>Aceptación 
                                <button onClick={() => {this.viewPdfFile(PdftoView)} }
                                    style={{ 
                                        fontweight: "900",
                                        color: "blue",
                                        cursor: "pointer",
                                        border: "none",
                                        background: "white"
                                    }}
                                    >
                                        &nbsp;<u><b>L.O.P.D</b></u>
                                </button>
                                    &nbsp;(click en el recuadro)
                                </fieldset>
                                    <input type="checkbox" name="lopd" id="lopd" checked={this.state.lopd} 
                                        disabled={this.state.fieldDisabled || this.state.id!==0} aria-label="lopd"
                                        required onChange={this.handleChangeLOPD}
                                        style={{
                                            width: "30px",
                                            height: "30px",

                                        }}
                                        />
                            </div>
                        </div>
                        {this.state.submitButtonEnabled // Action Text
                            ?   <button type="submit" name="add" className="btn btn-primary">
                                    Save
                                    {/* Guardar */}
                                </button>
                            :   (<div>
                                    <Link to="/" className="btn btn-success">Back to main</Link>
                                    <div>DATA SAVED</div>
                                </div>)
                        }
                    </form>
        {/* //         </div>
        //     </div> */}
        </div>
    );
    }
};

export default withRouter(CreateEditWorkerItem);