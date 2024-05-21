import { useEffect } from "react";
import { useState } from "react";

function PerfilPage() {

    const [fileList, setFileList] = useState(null)
    const [categorias, setCategorias] = useState([])
    const [cargando, setCargando] = useState(false)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState()
    async function obtenerCategorias() {
        try {
            setCargando(false)
            const response = await fetch('categoria/getcategories');
            const data = await response.json();
            setCategorias(data);
            setCargando(true)
        } catch (e) {
            console.log(e)
        } 
    }

    const selectedHandleFiles = e => {
        setFileList(e.target.files)
        console.log(e.target.files)
    }

    const selectedCategorieHandle = e => {
        setCategoriaSeleccionada(e.target.value)
    }

    //Formato para subir a la base de datos
    //const formdata = new FormData()
    //formdata.append('image', file)

    useEffect(() => {
        obtenerCategorias()
    }, [categorias]);

    return (
        <div>
            <div className="container w-50">
                <h1>Agregar Producto</h1>
                <form>
                    <div className="input-group mb-3" >
                        <span className="input-group-text" id="nombreSpan">Nombre:</span>
                        <input type="text" className="form-control" placeholder="Nombre del Producto" aria-label="Nombre del Producto" aria-describedby="nombreSpan" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Descripcion:</span>
                        <textarea className="form-control" aria-label="With textarea"></textarea>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="precioUnitario">Precio:</span>
                        <input type="number" className="form-control" placeholder="$" aria-label="$" aria-describedby="precioUnitario" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="piezasAgregar">Aagregar Unidades:</span>
                        <input type="number" className="form-control" placeholder="Agregar Unidades" aria-label="Agregar Unidades" aria-describedby="piezasAgregar" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="file" multiple className="form-control" id="inputSubirArchivos" onChange={selectedHandleFiles} />
                        <label className="input-group-text" htmlFor="inputSubirArchivos">Subir Imagene o Video</label>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Categoria</label>
                        <select className="form-select" id="inputGroupSelect01" value={categoriaSeleccionada} onChange={selectedCategorieHandle}>
                            <option>Categoria...</option>
                            {
                                cargando
                                    ?
                                    <option value="999999999">No hay Categorias</option>
                                    :
                                    categorias.map(
                                        (category) =>
                                            <option key={category.idcategories} value={category.idcategories}>{category.name }</option>
                                    )
                            }
                        </select>
                    </div>
                    <input className="btn btn-success" type="submit" value="Agregar Producto"/>
                </form>
            </div>
        </div>
    );

}

export default PerfilPage;