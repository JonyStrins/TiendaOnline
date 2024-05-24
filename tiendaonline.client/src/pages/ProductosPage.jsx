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
                    <div key={img.fileName} className="card" style={{width: '18rem'}}>
                        <img src={img.filePath} style={{width: 'auto', height: 150}} className="card-img-top" alt={img.fileName} />
                        <div className="card-body">
                            <h5 className="card-title">{img.fileName}</h5>
                            <p className="card-text">File size: {img.fileSize} bytes</p>
                            <a href={img.filePath} className="btn btn-primary">View File</a>
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