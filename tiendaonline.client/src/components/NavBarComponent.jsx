import { Link } from "react-router-dom";

function NavBarComponent() {
    return (
        <nav className="navbar navbar-expand-lg bg-secondary bg-opacity-50">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Tienda Online</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/wishlist">Lista de Deseados</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/wishlist">Categorias</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                            <button className="btn bg-success" type="submit">Buscar</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBarComponent;