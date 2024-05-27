import { useEffect, useState } from "react";

function WishListPage() {

    const [wishList, setWishList] = useState([])
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        obtenerDatos()
    }, [])

    function obtenerDatos() {
        setCargando(false);
        const storedItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishList(storedItems);
        console.log(storedItems);
        setCargando(true)
    }

    const removerWishList = (id) => {
        const updatedWishlist = wishList.filter(item => item.idproducts !== id);
        setWishList(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        console.log(JSON.parse(localStorage.getItem('wishlist')) || []);
    }

    return (
        <div className="d-flex flex-wrap container">
            {cargando ?
                wishList.map((prod) => (
                    <div key={prod.idproducts} className="p-3">
                        <div className="card fw-bold bg-warning bg-opacity-25 border-warning border-1 border-top border-start rounded-bottom shadow-lg p-3 mb-5 rounded" style={{ width: '18rem' }}>
                            <a href={prod.fileroute} role="button">
                                <img src={prod.fileroute} style={{ height: 150 }} className="card-img-top" alt={prod.name} />
                            </a>
                            <div className="card-body">
                                <a className="text-light link-offset-2 link-underline link-underline-opacity-0" onClick={() => navigate(`/producto/${prod.idproducts}`)} role="button">
                                    <h5 className="card-title">{prod.name}</h5>
                                    <p className="card-text">{prod.description}</p>
                                    <p className="card-text">${prod.unitPrice} MXN</p>
                                </a>
                                <button className="btn btn-danger" onClick={() => removerWishList(prod.idproducts)}>Eliminar de Lista de Deseados</button>
                            </div>
                        </div>
                    </div>
                ))
                :
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            }
        </div>
    )
};

export default WishListPage;