// frontend/src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import ListaProductos from './ListaProductos.jsx';
import ProductoDetalle from './ProductoDetalle.jsx';
import Carrito from './Carrito.jsx'; 
import Contacto from './Contacto.jsx'; 
import ProductForm from './ProductForm';
import './App.css'; 

const HeroPage = () => (
    <main>
        <div className="hero-banner">
            <div className="hero-content">
                <h1>¡Bienvenidos a Hermanos Jota!</h1>
                <p>Tu tienda de muebles de diseño y calidad. Descubre nuestras últimas colecciones.</p>
                <Link to="/catalogo" className="btn">Ver Catálogo</Link>
            </div>
        </div>
    </main>
);

const CatalogWrapper = () => {
    const location = useLocation();
    const successMessage = location.state?.successMessage;

    return (
        <main>
            {successMessage && (
                <div className="cart-confirmation-message" style={{position: 'static', transform: 'none', margin: '20px auto', width: 'fit-content'}}>
                    {successMessage}
                </div>
            )}
            <ListaProductos />
        </main>
    );
};

const addToCart = (productToAdd) => {
    
    const productId = productToAdd._id || productToAdd.id; 
    const existingItem = cart.find(item => item.id === productId);
    const price = Number(productToAdd.precio); 

    const currentStock = Number(productToAdd.stock || 0); 
    
    // ESTE IF VERIFICA QUE NO SE SOBREPASE EL STOCK
    if (existingItem && existingItem.quantity >= currentStock) {

        window.alert(`No puedes añadir más ${productToAdd.nombre}. Límite de stock real (${currentStock}) alcanzado.`);
        return; // Bloquea la adición
    }

    if (existingItem) {
        setCart(cart.map(item =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 } 
                : item
        ));
    } else {

        setCart([...cart, { ...productToAdd, quantity: 1, id: productId, precio: price, stock: currentStock }]);
    }
};

function App() {
    
    const [cart, setCart] = useState([]); 
    
    
    const addToCart = (productToAdd) => { 
        
        const existingItem = cart.find(item => item.id === productToAdd._id);
        const price = Number(productToAdd.precio); 

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === productToAdd._id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            
            setCart([...cart, { ...productToAdd, quantity: 1, id: productToAdd._id, precio: price }]);
        }
    };

    const removeFromCart = (productId, removeAll = false) => { 
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === productId);
            if (!existingItem) return currentCart;

            if (removeAll || existingItem.quantity === 1) {
                return currentCart.filter(item => item.id !== productId);
            } else {
                return currentCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
        });
    };
    
    const clearCart = () => { setCart([]); };

    
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce( (total, item) => total + (item.precio * item.quantity), 0 ).toFixed(2); 

    
    return (
        <Router>
            <header className="header">
                <Link to="/" className="logo-container">
                    <img src="\public\assets\Fotos_hermanos_jota\logo.svg" alt="Hermanos Jota Logo" />
                    <h1>Mueblería Jota</h1>
                </Link>
                <nav className="nav-menu">
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/catalogo">Catálogo</Link></li>
                        
                        <li><Link to="/admin/crear-producto" style={{color: 'red', fontWeight: 'bold'}}>Admin (CRUD)</Link></li> 
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li>
                            <Link to="/carrito" className="cart-icon">
                                🛒 Carrito ({cartItemCount})
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            
            <div style={{minHeight: '80vh'}}> 
                <Routes>
                    {/*Rutas Principales */}
                    <Route path="/" element={<HeroPage />} /> 
                    <Route path="/catalogo" element={<CatalogWrapper />} /> 
                    <Route path="/contacto" element={<Contacto />} />
                    
                  
                    <Route path="/admin/crear-producto" element={<ProductForm />} /> 
                    
                    <Route path="/admin/editar-producto/:id" element={<ProductForm />} /> 
                    
                   
                    <Route 
                        path="/productos/:id" 
                        element={<ProductoDetalle addToCart={addToCart} cart={cart} />} 
                    />
                    
                    <Route 
                        path="/carrito" 
                        element={<Carrito 
                                    cart={cart}
                                    totalPrice={totalPrice} 
                                    removeFromCart={removeFromCart}
                                    clearCart={clearCart}
                                    addToCart={addToCart} 
                                />} 
                    /> 
                </Routes>
            </div>
            
            
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Hermanos Jota. Todos los derechos reservados.</p>
            </footer>
        </Router>
    );
}

export default App;