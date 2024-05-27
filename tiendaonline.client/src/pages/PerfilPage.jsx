import React, { useState } from "react";
import AgregarProductoComponent from "../components/AgregarProductoComponent";
import MisProductosComponent from "../components/MisProductosComponent";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function PerfilPage() {

    const navigate = useNavigate()

    // Estado para almacenar el botón seleccionado
    const [selectedButton, setSelectedButton] = useState("agregarProductos");

    // Función para manejar el cambio de botón seleccionado
    const handleButtonClick = (buttonId) => {
        setSelectedButton(buttonId);
    };

    const logout = () => {
        if (localStorage.removeItem('user')) {
            return true;
        }else{
            localStorage.removeItem('wishlist');
            return false;
        }
    }

    const mostrarAlerta = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Seguro que deseas salir?",
            text: "Se Perdera Tu Lista de Deseados! :(",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, salir!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (logout()) {
                    swalWithBootstrapButtons.fire({
                        title: "Que bueno que decides quedarte",
                        text: "Sigue buscando productos :)",
                        icon: "error" 
                    });
                    navigate("/perfil")
                } else {
                    swalWithBootstrapButtons.fire({
                        title: "Hasta Pronto!",
                        text: "Esperamos tu Regreso.",
                        icon: "success"
                    });
                    navigate("/")
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Gracias Por Quedarte :)",
                    icon: "error"
                });
                navigate("/perfil")
            }
        });
    }

    // Función para renderizar el componente correspondiente al botón seleccionado
    const renderComponent = () => {
        switch (selectedButton) {
            case "agregarProductos":
                return <AgregarProductoComponent />;
            case "misProductos":
                return <MisProductosComponent />;
            case "cerrarSesion":
                mostrarAlerta();
            default:
                return null;
        }
    };

    return (
        <div className="container mt-3 d-flex">
            <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                <input type="radio" className="btn-check" name="btnOptions" id="btnAgregarProductos" autoComplete="off" checked={selectedButton === "agregarProductos"} onChange={() => handleButtonClick("agregarProductos")} />
                <label className="btn btn-outline-danger" htmlFor="btnAgregarProductos">Agregar Productos</label>
                <input type="radio" className="btn-check" name="btnOptions" id="btnMisProductos" autoComplete="off" checked={selectedButton === "misProductos"} onChange={() => handleButtonClick("misProductos")} />
                <label className="btn btn-outline-danger" htmlFor="btnMisProductos">Mis Productos</label>
                <input type="radio" className="btn-check" name="btnOptions" id="btnRadio3" autoComplete="off" onClick={() => mostrarAlerta()} />
                <label className="btn btn-outline-danger" htmlFor="btnRadio3">Cerrar Sesion</label>
            </div>
            {renderComponent()}
        </div>
    );
}

export default PerfilPage;
