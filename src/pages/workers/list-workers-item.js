import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ListWorkersItem = props => {
    const {
        trabajadores_id_trabajador,
        trabajadores_nombre,
        trabajadores_apellidos,
        trabajadores_fecha_nacimiento,
        trabajadores_doi,
        trabajadores_id_municipio,
        trabajadores_codigo_postal,
        trabajadores_id_provincia,
        trabajadores_telefono_contacto,
     } = props.workerItem;


    const deleteWorker = (id) => {
        var opcion = window.confirm("Estás seguro que deseas Eliminar el trabajador "+id);
        if (opcion === true) {
            axios({
                method: 'DELETE',
                url: props.hostAPP + `/deleteworker/${id}`,
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
        <tr key={trabajadores_id_trabajador}>
            <td>{trabajadores_id_trabajador}</td>
            <td>{trabajadores_nombre} {trabajadores_apellidos}</td>
            <td>{trabajadores_fecha_nacimiento}</td>
            <td>{trabajadores_doi}</td>
            <td>{trabajadores_id_municipio}</td>
            <td>{trabajadores_codigo_postal}</td>
            <td>{trabajadores_id_provincia}</td>
            <td>{trabajadores_telefono_contacto}</td>
            <td>
                <Link to={`/editworker/${trabajadores_id_trabajador}`} className="btn btn-success" style={{marginRight: "10px"}} aria-label="linkEditWorker"
                    title="Modificar Trabajador"
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button type='button' onClick={() => deleteWorker(trabajadores_id_trabajador)} className="btn btn-danger" aria-label="buttondeleteWorker"
                    title="Borrar Trabajador"
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    )
}
  
export default withRouter(ListWorkersItem);
