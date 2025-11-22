
import React from 'react';

function ProductDetail({ product, onAddToCart, onBackToCatalog }) {
    
    const imagePath = `/assets/Fotos_hermanos_jota/${product.nombre}.png`.replace(/\s/g, '%20');

    return (
        <div className="product-detail" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <button onClick={onBackToCatalog} style={{ marginBottom: '20px' }}>← Volver al Catálogo</button>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <img src={imagePath} alt={product.alt || product.nombre} style={{ width: '100%', maxWidth: '300px' }} />
                <div>
                    <h2>{product.nombre}</h2>
                    <p><strong>Precio:</strong> ${product.precio} USD</p>
                    <p>{product.descripcion}</p>
                    <button onClick={() => onAddToCart(product)} style={{ padding: '10px 20px', backgroundColor: '#A0522D', color: 'white', border: 'none', cursor: 'pointer' }}>
Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ProductDetail;