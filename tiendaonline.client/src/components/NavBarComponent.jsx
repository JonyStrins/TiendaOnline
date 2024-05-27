import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavBarComponent() {

    const [userExist, setUserExist] = useState(false)
    const [wishlist, setWishList] = useState([])

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishList(storedItems);
    }, [wishlist])

    useEffect(() => {
        setUserExist(localStorage.getItem('user') !== null);
    }, [userExist])

    return (

        <nav className="navbar navbar-expand-lg bg-primary bg-opacity-50 border-3 border-bottom border-primary">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold text-white p-3 bg-warning bg-opacity-50 border-warning border-2 border-top border-start rounded-end-pill" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-amazon" viewBox="0 0 16 16">
                        <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
                        <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
                    </svg>Tienda Online</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item d-flex align-items-end flex-column">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gold" className="bi bi-handbag-fill align-self-center" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2M5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0z" />
                            </svg>
                            <Link className="nav-link text-warning fw-medium " aria-current="page" to="/">Productos</Link>
                        </li>
                        <li className="nav-item d-flex align-items-end flex-column">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gold" className="bi bi-bookmark-star-fill align-self-center" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5M8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.18.18 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.18.18 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.18.18 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.18.18 0 0 1-.134-.098z" />
                            </svg>
                            <Link className="nav-link text-warning position-relative" to="/wishlist">Lista de Deseados
                                {
                                    wishlist.length != 0
                                        ?
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {wishlist.length}
                                        </span>
                                        :
                                        <div></div>
                                }
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {
                            userExist
                                ?
                                <li className="nav-item">
                                    <Link className="nav-link text-primary bg-warning rounded-5 d-flex align-items-end flex-column" to="/perfil">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-circle align-self-center" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                        </svg>

                                        Mi Perfil</Link>
                                </li>
                                :
                                <div className="d-flex">
                                    <li className="nav-item">
                                        <Link className="nav-link text-warning" to="/login">Iniciar Sesion</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-warning" to="/register">Registrarse</Link>
                                    </li>
                                </div>
                        }
                    </ul>
                </div>
            </div>
        </nav>

        /*
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Offcanvas navbar large">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Responsive offcanvas navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbar2Label">Offcanvas</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        */
    );
}

export default NavBarComponent;