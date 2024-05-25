import { useEffect } from "react";
import { useState } from "react";

function ProductosPage() {

    const [files, setFiles] = useState([])
    const [cargando, setCargando] = useState(false)

    async function obtenerImagenes() {
        try {
            setCargando(false)
            const response = await fetch('upload/getmultimedia');
            const data = await response.json();
            setFiles(data);
            setCargando(true)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        obtenerImagenes();
    }, [])

    return (
        <div className="d-flex flex-wrap container">
            {cargando ?
                files.map((img) => (
                    <div key={img.fileName} className="p-3">
                        <div className="card fw-bold bg-warning bg-opacity-25 border-warning border-1 border-top border-start rounded-bottom shadow-lg p-3 mb-5 rounded" style={{ width: '18rem' }}>
                            <a href={img.filePath} role="button">
                                <img src={img.filePath} style={{ height: 150 }} className="card-img-top" alt={img.fileName} />
                            </a>
                            <div className="card-body position-relative">
                                <a className="position-absolute bottom-100 start-50 translate-middle badge border border-light rounded-1 bg-warning p-2" href="#" role="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bookmark-plus-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z" />
                                    </svg>
                                    <span className="visually-hidden">Agregar a wishlist</span>
                                </a>
                                <a className="text-light link-offset-2 link-underline link-underline-opacity-0" href={img.filePath} role="button">
                                    <h5 className="card-title">{img.fileName}</h5>
                                    <p className="card-text">File size: {img.fileSize} bytes</p>
                                </a>
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