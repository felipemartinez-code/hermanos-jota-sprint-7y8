// frontend/src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Importa el CSS aquí
import './css/Hermanos-Jota-estilos.css' 
// Importa el componente principal App
import App from './App.jsx'; 

// Ya NO necesitas importar ListaProductos aquí si ya lo haces en App.jsx

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <StrictMode>
    <App /> {/* ¡Renderiza App! */}
  </StrictMode>
)