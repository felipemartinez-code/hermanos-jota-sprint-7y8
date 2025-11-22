import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
//import React from 'react';

const API_URL = 'http://localhost:5000/api/productos';

function ListaProductos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 

    // Carga de datos desde la API persistente
    useEffect(() => {
        fetch(API_URL)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setProductos(data);
                setCargando(false);
            })
            .catch(err => {
                console.error("No se pudo conectar al backend:", err);
                setError("❌ Error: No se pudo obtener la lista de productos. Asegúrate que el servidor de Express esté corriendo en el puerto 5000."); 
                setCargando(false);
            });
    }, []); 
    
    // Lógica de filtrado
    const filteredProducts = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Renderizado de estados
    if (cargando) {
        return <div className="catalogo-header">Cargando productos...</div>;
    }

    if (error) {
        return <div className="catalogo-header error-text">{error}</div>; 
    }
    
    // Renderizado del catálogo
    return (
        <main className="featured-products">
            <h1 className="featured-title">Nuestro Catálogo</h1>

            
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Buscar productos por nombre..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
            
            
            {filteredProducts.length === 0 && productos.length > 0 && (
                <div className="catalogo-header">
                    No se encontraron productos que coincidan con "{searchTerm}".
                </div>
            )}
            
            
            <div className="products-container">
                {filteredProducts.map(producto => (
                    
                    <Link 
                        key={producto._id} 
                        to={`/productos/${producto._id}`} 
                        className="product-card product-link"
                    >
                        
                        <img 
                            
                            src={producto.imagenUrl || '/assets/Fotos_Hermanos_Jota/placeholder.jpg'} 
                            alt={producto.nombre} 
                            className="product-card-image"
                        />
                        
                        <div className="product-card-info">
                            <h2>{producto.nombre}</h2>
                            <p className="product-price">
                                ${producto.precio ? Number(producto.precio).toLocaleString('es-AR') : 'N/A'}
                            </p>
                            <p style={{fontSize: '0.9em', color: producto.stock > 0 ? 'green' : 'red'}}>
                                Stock: {producto.stock > 0 ? 'Disponible' : 'Agotado'}
                            </p>
                            
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}

export default ListaProductos;