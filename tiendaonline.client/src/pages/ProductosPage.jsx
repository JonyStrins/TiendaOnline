import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductosPage() {

    const [files, setFiles] = useState([])
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()
    const [wishlist, setWishList] = useState([])
    const [userExist, setUserExist] = useState(false)

    useEffect(() => {
        setUserExist(localStorage.getItem('user') !== null);
    }, [userExist])

    async function obtenerImagenes() {
        try {
            setCargando(false)
            const response = await fetch('productos/getproducts');
            const data = await response.json();
            setFiles(data);
            setCargando(true)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        obtenerImagenes();
        const storedItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishList(storedItems);
    }, [])

    const agregarWL = (objeto) => {
        const existe = wishlist.some(item => item.idproducts === objeto.idproducts);

        if (existe) {
            console.log("El producto ya existe");
            return;
        }

        const updatewishlist = [...wishlist, objeto];
        setWishList(updatewishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatewishlist));

    }

    const removerWishList = (id) => {
        const updatedWishlist = wishlist.filter(item => item.idproducts !== id);
        setWishList(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }

    return (
        <div className="d-flex flex-wrap container">
            {cargando ?
                files.map((prod) => (
                    <div key={prod.idproducts} className="p-3">
                        <div className="card fw-bold bg-warning bg-opacity-25 border-warning border-1 border-top border-start rounded-bottom shadow-lg p-3 mb-5 rounded" style={{ width: '18rem' }}>
                            <a href={prod.fileroute} role="button">
                                <img src={prod.fileroute} style={{ height: 150 }} className="card-img-top" alt={prod.name} />
                            </a>
                            <div className="card-body">
                                {/* <a className="position-absolute bottom-100 start-50 translate-middle badge border border-light rounded-1 bg-warning p-2" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bookmark-plus-fill" onClick={agregarWL(prod)} viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z" />
                                    </svg>
                                    <span className="visually-hidden">Agregar a wishlist</span>
                                </a> */}
                                <a className="text-light link-offset-2 link-underline link-underline-opacity-0" onClick={() => navigate(`/producto/${prod.idproducts}`)} role="button">
                                    <h5 className="card-title">{prod.name}</h5>
                                    <p className="card-text">{prod.description}</p>
                                    <p className="card-text">${prod.unitPrice} MXN</p>
                                </a>
                                {
                                    userExist
                                        ?
                                        <div className="d-flex">
                                            {
                                                wishlist.some(item => item.idproducts === prod.idproducts)
                                                    ?
                                                    <button className="btn btn-danger" onClick={() => removerWishList(prod.idproducts)}>Eliminar de Lista de Deseados</button>
                                                    :
                                                    <button className="btn btn-primary" onClick={() => agregarWL(prod)}>Agregar a Lista de Deseados</button>
                                            }
                                        </div>
                                        :
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-success" onClick={() => navigate("/login")}>Iniciar Sesion</button>
                                            <button className="btn btn-info" onClick={() => navigate("/register")}>Registrarse</button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                ))
                :
                <p>Loading...</p>
            }
        </div>
    );

}

export default ProductosPage;