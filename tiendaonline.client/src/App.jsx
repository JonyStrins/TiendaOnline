import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBarComponent from './components/NavBarComponent';
import ProductosPage from './pages/ProductosPage';
import ProductoPage from './pages/ProductoPage'; // Importa el componente ProductoPage
import PerfilPage from './pages/PerfilPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WishListPage from "./pages/WishListPage";

function App() {
    return (
        <BrowserRouter>
            <NavBarComponent />
            <Routes>
                <Route path="/" element={<ProductosPage />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/wishlist" element={<WishListPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/producto/:idProducto" element={<ProductoPage />} /> {/* Define la ruta con el parámetro idProducto */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
