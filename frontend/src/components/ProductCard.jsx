
import React from 'react';

function ProductCard({ product, onSelectProduct }) {
  const imagePath = `/assets/Fotos_hermanos_jota/${product.nombre}.png`.replace(/\s/g, '%20');
  
  const handleClick = () => {
    onSelectProduct(product);
  };

  return (
    <div className="product-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={imagePath} alt={product.alt || product.nombre} style={{ width: '100%', height: 'auto' }} />
      <div className="card-info">
        <h3>{product.nombre}</h3>
        <p className="precio">${product.precio} USD</p>
      </div>
    </div>
  );
}
export default ProductCard;