// frontend/src/Contacto.jsx

import React, { useState } from 'react';

function Contacto() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const [mensajeEnvio, setMensajeEnvio] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        console.log("Datos del formulario enviados:", formData);

        setMensajeEnvio("✅ ¡Mensaje enviado con éxito! Revisaremos tu consulta pronto.");

        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            mensaje: ''
        });
    };

    return (
        <main className="featured-products contact-main-padded"> 
            <h1 className="featured-title">Contactanos</h1>
            <p className="contact-intro-text">
                Tenes alguna pregunta? Envíanos un mensaje.
            </p>

            {/* Mensaje de éxito visible */}
            {mensajeEnvio && (
                <div className="success-message-box"> 
                    {mensajeEnvio}
                </div>
            )}

            
            <form 
                className="contact-form" 
                onSubmit={handleSubmit} 
            >
                {/* Campo Nombre */}
                <div>
                    <label htmlFor="nombre">Nombre Completo:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre} 
                        onChange={handleChange}
                        required
                        className="form-input-field" 
                    />
                </div>

                {/* Campo Email */}
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input-field" 
                    />
                </div>
                
                {/* Campo Teléfono */}
                <div>
                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="form-input-field" 
                    />
                </div>

                {/* Campo Mensaje */}
                <div>
                    <label htmlFor="mensaje">Tu Mensaje:</label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        rows="4"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        className="form-input-field" 
                    ></textarea>
                </div>

            
                <button type="submit" className="btn btn-submit-margin"> 
                    Enviar Consulta
                </button>
            </form>
        </main>
    );
}

export default Contacto;