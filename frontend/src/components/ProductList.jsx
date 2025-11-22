
import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, onSelectProduct }) {
  return (
    <div className="products-container">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
}
export default ProductList;