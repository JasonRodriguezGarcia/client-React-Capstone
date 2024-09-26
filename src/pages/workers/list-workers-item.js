import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ListWorkersItem = props => {
    const {
        id,
        nombre,
        apellidos,
        fecha_nacimiento,
        doi,
        id_municipio,
        codigo_postal,
        id_provincia,
        telefono_contacto,
     } = props.workerItem;


    const deleteWorker = (id) => {
        var opcion = window.confirm("Estás seguro que deseas Eliminar el trabajador "+id);
        if (opcion === true) {
            axios({
                method: 'DELETE',
                url: this.props.hostAPP+`/deleteworker/${id}`,
                // url: `http://127.0.0.1:5000/deleteworker/${id}`,
                withCredentials: false
                })
                .then(response => {
                    console.log(response.data);
                    console.log("Worker Deleted")
                    props.handleUpdateListWorkers(id);

                })
                .catch(error => {
                    console.log("Error Deleting");
                });
            return
        }
    }

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{nombre} {apellidos}</td>
            <td>{fecha_nacimiento}</td>
            <td>{doi}</td>
            <td>{id_municipio}</td>
            <td>{codigo_postal}</td>
            <td>{id_provincia}</td>
            <td>{telefono_contacto}</td>
            <td>
                <Link to={`/editworker/${id}`} className="btn btn-success" style={{marginRight: "10px"}} aria-label="linkEditWorker"
                    title="Modificar Trabajador"
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button type='button' onClick={() => deleteWorker(id)} className="btn btn-danger" aria-label="buttondeleteWorker"
                    title="Borrar Trabajador"
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    )
}
  
export default withRouter(ListWorkersItem);
