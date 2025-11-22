
import React, { useState } from 'react';

function ContactForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: '',
    });
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Datos del Formulario Enviados:', formData); 

        setSuccessMessage('¡Gracias por tu mensaje! Te contactaremos pronto.'); 
        setFormData({ nombre: '', email: '', mensaje: '' }); 
        
        setTimeout(() => setSuccessMessage(null), 5000);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '20px auto' }}>
            {successMessage && (
                <div style={{ padding: '10px', backgroundColor: 'lightgreen', color: 'darkgreen', marginBottom: '10px', borderRadius: '4px' }}>
                    {successMessage}
                </div>
            )}
            
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handleChange} required />

            <button type="submit" style={{ marginTop: '15px' }}>Enviar Mensaje</button>
        </form>
    );
}
export default ContactForm;