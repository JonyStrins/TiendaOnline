import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarComponent from './components/NavBarComponent';
import ProductosPage from './pages/ProductosPage';
import PerfilPage from "./pages/PerfilPage";

function App() {

    return (
        <BrowserRouter>

            <NavBarComponent />

            <Routes>
                <Route path="/" element={<ProductosPage />} />
                <Route path="/perfil" element={<PerfilPage /> } />
            </Routes>
        </BrowserRouter>
    );
    
}

export default App;