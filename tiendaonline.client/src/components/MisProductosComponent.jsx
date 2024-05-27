import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function MisProductosComponent() {

    const dataUser = JSON.parse(localStorage.getItem('user'));
    const iduser = dataUser.idusers;
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    async function getProducts(id) {
        try {
            const response = await fetch(`productos/getproductsid/${id}`);
            const data = await response.json();
            setProductos(data);
            setCargando(false);
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarProducto = async (id) => {
        try {
            const response = await fetch(`productos/deleteproduct/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setProductos(productos.filter(producto => producto.idproducts !== id));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const mostrarAlerta = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Seguro que deseas eliminarlo?",
            text: "No se podra recuperar!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminalo!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (eliminarProducto(id)) {
                    swalWithBootstrapButtons.fire({
                        title: "Eliminado!",
                        text: "Tu producto ha sido eliminado.",
                        icon: "success"
                    });
                    const updatedWishlist = wishList.filter(item => item.idproducts !== id);
                    setWishList(updatedWishlist);
                    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
                } else {
                    swalWithBootstrapButtons.fire({
                        title: "No se pudo eliminar",
                        text: "Tu producto sigue en linea :)",
                        icon: "error"
                    });
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Todo bien con el producto :)",
                    icon: "error"
                });
            }
        });
    }



    useEffect(() => {
        getProducts(iduser);
    }, []);

    return (
        <div className="d-flex flex-wrap container">
            {cargando ? (
                <p>Loading...</p>
            ) : (
                productos.map((prod) => (
                    <div className="card m-3" style={{ width: '18rem' }} key={prod.idproducts}>
                        <img src={prod.fileroute} style={{ height: 150 }} className="card-img-top" alt={prod.name} />
                        <div className="card-header">
                            {prod.name}
                        </div>
                        <div className="card-body">
                            <h5 className="card-text">{prod.description}</h5>
                            <p className="card-text">${prod.unitPrice} MXN</p>
                        </div>
                        <div className="d-flex justify-content-evenly card-footer">
                            {/* <button className="btn btn-primary">Editar</button> */}
                            <button className="btn btn-danger" onClick={() => mostrarAlerta(prod.idproducts)}>Eliminar</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MisProductosComponent;
