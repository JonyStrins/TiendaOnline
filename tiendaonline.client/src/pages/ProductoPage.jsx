import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductoPage() {
    const { idProducto } = useParams()

    return (
        <div>
            <h1>Detalles del Producto</h1>
            <p>ID del producto: {idProducto}</p>
        </div>
    );
}

export default ProductoPage;
