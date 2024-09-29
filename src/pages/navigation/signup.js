import React, { Component } from "react";
import "./signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBuilding} from "@fortawesome/free-solid-svg-icons";
import Image1 from "../../assets/workers/carretillero.jpg";
import Image2 from "../../assets/workers/soldador.jpg";
import Image3 from "../../assets/workers/manipul-alimentos.jpg";
import Image4 from "../../assets/workers/oficinista.jpg";
import Image5 from "../../assets/enterprises/empresa-oficina.jpg";
import Image6 from "../../assets/enterprises/empresa-fabrica.jpg";
import Image7 from "../../assets/enterprises/empresa-obra.jpg";
import Image8 from "../../assets/enterprises/empresario-oficina1.jpg";

export default class SignUp extends Component { // props are like parameters
    render() {
        return (
            <div className="body">

                    <h1><a href="#" name="inicio">Bienvenido a T@lent+45</a></h1>
                    <br/>
                    <div className="introduction">
                        <p>La presente página web permite poner en contacto a personas con 45 años o más, desempleadas o en búsqueda de trabajo, con empresas buscando en busca personal. Para ello hay que seguir un proceso de alta en el sistema que permite almacenar los datos introducidos y gestinarlos para poder recibir ofertas y ser seleccionado como candidato (usuario trabajador) o poder seleccionar candidatos (usuario empresa).
                        </p>

                        <ol>
                            En resumen:
                            <li>Darse de alta e Introducir datos detallados (trabajador/empresa) para poder recibir credenciales</li>
                            <li>Entrar en el sistema con las credenciales recibidas</li>
                            <li>Poder gestionar los datos introducidos así como poder consultar ofertas recibidas (trabajador)/ofertas gestionadas (empresa)
                            </li>
                        </ol>
                    </div>
                    <div className="main">
                        <div className="initialentrance">
                            <div className="iconWorkerEnterprise">
                                <FontAwesomeIcon icon={faUser}
                                                    />
                            </div>
                            <h2>Como trabajador</h2>
                        </div>
                            <p>
                                Utiliza esta página web para conseguir un empleo que se adapte lo mejor posible a las características de tu perfil.
                            </p>
                            <p>Para poder darte de alta, tendrás que introducir tus datos personales poder darte a conocer de una manera y poder revisar/recibir las ofertas de las empresas interesadas.<br/>
                            El proceso no es complicado pero hará falta un teléfono para poder recibir sms del alta y un correo electrónico para poder recibir las ofertas que cumplan con tu perfil. Durante el mismo proceso se tendrá que aceptar las cláusulas de la LOPD (Ley Orgánica de Protección de Datos).</p>
                        <div className="workercontainerimages">
                            <a href="https://www.generacionsavia.org/formaciones-savia" target="_blank" rel="noreferrer">
                                <img src={Image1} alt="Image1" title="GENERACION SAVIA"></img></a>
                            <a href="https://www.camara.es/formacion-y-empleo/programa-talento-45-mas" target="_blank" rel="noreferrer">
                                <img src={Image2} alt="Image2" title="PROGRAMA TALENTO 45+"></img></a>
                            <a href="https://www.secot.org/" target="_blank" rel="noreferrer">
                                <img src={Image3} alt="Image3" title="SECOT"></img></a>
                            <a href="https://delcampovillares.com/asociacion-encuentra-empleo-mayores-de-50/" target="_blank" rel="noreferrer">
                                <img src={Image4} alt="Image4" title="ASOCIACION ENCUENTRA EMPLETO MAYORES DE 50"></img></a>
                        </div>
                        <p>Encontrar empleo con una edad mayor o igual a 45 años es una problemática muy extendida, la cual se denomina Edadismo.</p>
                        <ul>A continuación detallamos links con información sobre esta problemática.
                        <li><a href="https://www.diversiedad.com" target="_blank" rel="noreferrer">https://www.diversiedad.com</a></li>
                        <li><a href="https://www.lanbide.euskadi.eus/ayuda_subvencion/2023/dem50/weblan00-content/es/" target="_blank" rel="noreferrer">
                                    https://www.lanbide.euskadi.eus/ayuda_subvencion/2023/dem50/weblan00-content/es/</a></li>
                        <li><a href="http://somospersonasmas50.com" target="_blank" rel="noreferrer">somospersonasmas50.com</a></li>
                        <li><a href="https://youtu.be/nWyzFBewtwo?feature=shared" target="_blank" rel="noreferrer">
                                <img className="iconyoutube" src="https://img.youtube.com/vi/nWyzFBewtwo/0.jpg" alt="ImageYoutube1" title="Edadismo"></img></a></li>
                        <li><a href="https://youtu.be/Va6LhpWURc4?feature=shared" target="_blank" rel="noreferrer">
                                <img className="iconyoutube" src="https://img.youtube.com/vi/Va6LhpWURc4/0.jpg" alt="ImageYoutube2" title="A combatir el edadismo"></img></a></li>
                        <li><a href="https://youtu.be/rexobXGF5vU?feature=shared" target="_blank" rel="noreferrer">
                                <img className="iconyoutube" src="https://img.youtube.com/vi/rexobXGF5vU/0.jpg" alt="ImageYoutube3" title="Qué es el edadismo"></img></a></li>
                        <li><a href="https://www.youtube.com/live/_cSQSj8KFak?feature=shared" target="_blank" rel="noreferrer">
                                <img className="iconyoutube" src="https://img.youtube.com/vi/_cSQSj8KFak/0.jpg" alt="ImageYoutube4" title="Edadismo y personas mayores"></img></a></li>
                        <br/>
                        <span><a href="#inicio">Volver al comienzo...</a></span>
                        </ul>
                        <div className="initialentrance">
                            <div className="iconWorkerEnterprise">
                                <FontAwesomeIcon icon={faBuilding}
                                                    />
                            </div>
                            <h2>Como empresa</h2>
                            <p>Ingresa en esta página web para conseguir una búsqueda de personal de una manera cómoda y fácil que mejor se adapte a sus necesidades de reclutamiento</p>
                            <p>Una vez realizada el alta, se introducirán los datos necesarios del perfil a concretar pudiéndo modificar los criterios de búsqueda para conseguir una mayor lista de posibles candidatos.</p>
                        </div>
                        <div className="enterprisescontainerimages">
                            <a href="https://youtu.be/FO2ZkKjSnqc?feature=shared" target="_blank" rel="noreferrer" title="Ayudas a la contratacion">
                                <img src={Image5} alt="Image5"></img></a>
                            <a href="https://youtu.be/B-pQYtwyVr8?feature=shared" target="_blank" rel="noreferrer" title="¿Conoces las ventajas de contratar talento sénior en tu organización?">
                                <img src={Image6} alt="Image6"></img></a>
                            <a href="https://youtu.be/frMCOGVQdC0?feature=shared" target="_blank" rel="noreferrer" title="Beneficios tributarios por contratar personas entre los 40 y 50 años">
                                <img src={Image7} alt="Image7"></img></a>
                            <a href="https://youtu.be/cwhRVAphe3I?feature=shared" target="_blank" rel="noreferrer" title="Beneficios de contratar a mayores de 50">
                                <img src={Image8} alt="Image8"></img></a>
                            <br/>
                        </div>
                        <span><a href="#inicio">Volver al comienzo...</a></span>
                    </div>
            </div>
        );
    }
}