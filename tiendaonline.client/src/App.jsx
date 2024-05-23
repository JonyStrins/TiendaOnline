import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarComponent from './components/NavBarComponent';
import ProductosPage from './pages/ProductosPage';
import PerfilPage from './pages/PerfilPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {

    return (
        <BrowserRouter>

            <NavBarComponent />

            <Routes>
                <Route path="/" element={<ProductosPage />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/login" element={ <LoginPage /> } />
                <Route path="/register" element={ <RegisterPage /> } />
            </Routes>
        </BrowserRouter>
    );
    
}

export default App;