import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBarComponent from './components/NavBarComponent';
import ProductosPage from './pages/ProductosPage';

function App() {

    return (
        <BrowserRouter>

            <NavBarComponent />

            <Routes>
                <Route path="/" element={<ProductosPage />} />
            </Routes>
        </BrowserRouter>
    );
    
}

export default App;