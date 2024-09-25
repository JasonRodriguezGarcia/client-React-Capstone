import React, { Component } from "react";
import axios from "axios";
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class 
import CreateEditWorkerItem from './create-edit-worker-item';
 
// BE CARE OF END LINE CLASS CREATEWORKER COMPONENT
// TUNNED withRouter to allow using Router parameters
class CreateEditWorker extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            apiUrl: "http://127.0.0.1:5000/addworker",
            apiAction: "POST",
            newId: [],
            // editedId: this.props.match.params.slug, <-- it ONLY WORKS IN ROUTER V.5
            editedId: this.props.params.id,
            workerItem: {},
            situacionesData: [],
            carnetsData: [],
            vehiculosData: [],
            municipiosData: [],
            provinciasData: [],
            ocupacionesData: [],
            formacionesData: []
        };
        this.getWorkerItem = this.getWorkerItem.bind(this);
        this.clearWorkerItem = this.clearWorkerItem.bind(this);
        this.getWorkerSecundaryData = this.getWorkerSecundaryData.bind(this);
    }

getWorkerSecundaryData () {
    axios({
        method: "GET",
        url: "http://127.0.0.1:5000/get_worker_secundary_databases",
        withCredentials: false
    })
        .then(response => {
            this.setState({
                secundaryData: response.data,
                situacionesData: response.data.trabajadores_situaciones,
                carnetsData: response.data.carnets,
                vehiculosData: response.data.vehiculos,    
                municipiosData: response.data.municipios,
                provinciasData: response.data.provincias,
                ocupacionesData: response.data.ocupaciones,
                formacionesData: response.data.formaciones,

            });
            console.log("Printing Worker secundary_datatabases response.data")
            console.log(response.data);
            console.log("Worker Secundary databases GET Data OK");
        })
        .catch(error => {
            console.log("Worker Secundary databases GET Data ERROR");
        });
}
    
getWorkerItem () {
    axios({
        method: "POST",
        url: `http://127.0.0.1:5000/get_listworkers/${this.state.editedId}`,
        data: {
            query: `SELECT * FROM trabajadores WHERE trabajadores_id_trabajador=${this.state.editedId};`
        },
        withCredentials: false
    })
    .then(response => {
        this.setState ({
            workerItem: response.data,
            apiAction: "POST",
            apiUrl: `http://127.0.0.1:5000/editworker/${this.state.editedId}`,
        });
        console.log(response.data);
        console.log("Retrieving getWorkerItem data Ok");
    })
    .catch(error => {
        console.log("retrieving getWorkerItem error");
    });
}

clearWorkerItem() {
    this.setState ({
        workerItem: {}
    });
}

componentDidMount () {
    if (this.props.workerEditMode) {
        this.getWorkerItem();
    }
    this.getWorkerSecundaryData();
}

    render() {
        return (
            <CreateEditWorkerItem workerItem = {this.state.workerItem}
                workerEditMode = {this.props.workerEditMode}
                clearWorkerItem = {this.clearWorkerItem}
                editedId = {this.state.editedId}
                situacionesData = {this.state.situacionesData}
                carnetsData = {this.state.carnetsData}
                vehiculosData = {this.state.vehiculosData}
                municipiosData = {this.state.municipiosData}
                provinciasData = {this.state.provinciasData}
                ocupacionesData = {this.state.ocupacionesData}
                formacionesData = {this.state.formacionesData}
            />
        );
    }
}
export default withRouter(CreateEditWorker);
