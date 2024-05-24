import { useState, useEffect } from "react";
function AgregarProductoComponent() {

    const [file, setFile] = useState()
    const [categorias, setCategorias] = useState([])
    const [cargando, setCargando] = useState(false)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState()
    const [nombre, setNombre] = useState()
    const [descripcion, setDescripcion] = useState()
    const [unitPrice, setUnitPrice] = useState()
    const [stock, setStock] = useState()
    
    async function obtenerCategorias() {
        try {
            setCargando(false);
            const response = await fetch('categoria/getcategories');
            const data = await response.json();
            setCategorias(data);
            setCargando(true);
        } catch (e) {
            console.log(e);
        }
    }

    const selectedCategorieHandle = e => {
        setCategoriaSeleccionada(e.target.value)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [categorias]);

    const selectedHandleFiles = e => {
        setFile(e.target.files)
        console.log(e.target.files)
    }


    const handleSubmitButton = async (e) => {
        e.preventDefault();

        if (!file || file.length === 0) {
            alert("Por favor, selecciona al menos un archivo.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file[0]);

        try {
            const response = await fetch("upload/subir", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                console.log('Archivos subidos con exito');
            } else {
                console.log('Error en la respuesta del servidor', response);
            }
        } catch (error) {
            console.error('Error subiendo los archivos:', error);
        }

        try {
            const response = await fetch("productos/addproduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nombre || "", // Asegura que name no sea null
                    description: descripcion || null, // Si no hay descripci�n, env�a null
                    unitPrice: parseFloat(unitPrice), // Convierte el precio unitario a un n�mero decimal
                    stock: parseInt(stock), // Convierte el stock a un n�mero entero
                    idusers: 3, // Ajusta el ID del usuario seg�n corresponda
                    idcategories: parseInt(categoriaSeleccionada) // Convierte el ID de categor�a a un n�mero entero
                })
            });
            if (response.ok) {
                console.log('Producto Registrado');
            } else {
                console.log('Error en la respuesta del servidor', response);
            }
        } catch (error) {
            console.error('Error subiendo los archivos:', error);
        }

    }

    return (
        <div className="container w-50">
            <h1>Agregar Producto</h1>
            <form onSubmit={handleSubmitButton}>
                <div className="input-group mb-3" >
                    <span className="input-group-text" id="nombreSpan">Nombre:</span>
                    <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del Producto" aria-label="Nombre del Producto" aria-describedby="nombreSpan" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Descripcion:</span>
                    <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} aria-label="With textarea"></textarea>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="precioUnitario">Precio:</span>
                    <input type="number" className="form-control" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} placeholder="$" aria-label="$" aria-describedby="precioUnitario" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="piezasAgregar">Agregar Unidades:</span>
                    <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Agregar Unidades" aria-label="Agregar Unidades" aria-describedby="piezasAgregar" />
                </div>
                <div className="input-group mb-3">
                    <input type="file" className="form-control" id="inputSubirArchivos" onChange={selectedHandleFiles} />
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
                                        <option key={category.idcategories} value={category.idcategories}>{category.name}</option>
                                )
                        }
                    </select>
                </div>
                <input className="btn btn-success" type="submit" value="Agregar Producto" />
            </form>
        </div>
    )
};

export default AgregarProductoComponent;