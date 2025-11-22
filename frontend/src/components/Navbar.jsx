
import React from 'react';

function Navbar({ cartCount, onViewChange }) {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="..\assets\Fotos_hermanos_jota\logo.svg" alt="Logo de Mueblería Jota" style={{ height: '60px' }} />
        <h1>Mueblería Hermanos Jota</h1>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><button onClick={() => onViewChange('catalog')}>Catálogo</button></li>
          <li><button onClick={() => onViewChange('contact')}>Contacto</button></li>
          
          <li>
            <a href="#" className="cart-icon" title={`Carrito: ${cartCount} items`}>
                🛒 <span id="cart-counter">{cartCount}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;