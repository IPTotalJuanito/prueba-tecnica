import './FormularioCliente.css';
import React, { useState } from "react";

export const FormularioCliente = ({ setClientes }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    cedula: "", // Nuevo campo para la cédula
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newCliente) => {
        setClientes((prevClientes) => [...prevClientes, newCliente]); // Actualizar el estado con el nuevo cliente
        setFormData({ nombre: "", email: "", telefono: "", cedula: "" }); // Limpiar el formulario
      })
      .catch((error) => console.error("Error al crear cliente:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Cédula:</label>
        <input
          type="text"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Crear Cliente</button>
    </form>
  );
};