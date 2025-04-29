import './Cliente.css';
import React from "react";
import { useNavigate } from "react-router-dom";

export const Cliente = ({ cliente, setClientes }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/clientes/${cliente.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setClientes((prevClientes) =>
          prevClientes.filter((c) => c.id !== cliente.id)
        );
      })
      .catch((error) => console.error("Error al eliminar cliente:", error));
  };

  const handleEdit = () => {
    const nombre = prompt("Ingrese el nuevo nombre:", cliente.nombre);
    const email = prompt("Ingrese el nuevo email:", cliente.email);
    const telefono = prompt("Ingrese el nuevo teléfono:", cliente.telefono);

    if (nombre && email && telefono) {
      fetch(`http://localhost:5000/api/clientes/${cliente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
        body: JSON.stringify({ nombre, email, telefono }),
      })
        .then((response) => response.json())
        .then((updatedCliente) => {
          setClientes((prevClientes) =>
            prevClientes.map((c) =>
              c.id === cliente.id ? { ...c, ...updatedCliente } : c
            )
          );
        })
        .catch((error) => console.error("Error al editar cliente:", error));
    }
  };

  const handleViewPrestamos = () => {
    // Redirigir a la página de listado de préstamos del cliente
    navigate(`/prestamos/${cliente.id}`);
  };

  return (
    <div className="cliente">
      <p>Nombre: {cliente.nombre}</p>
      <p>Email: {cliente.email}</p>
      <p>Teléfono: {cliente.telefono}</p>
      <p>Cédula: {cliente.cedula}</p> {/* Mostrar cédula */}
      <button className="btn-default" onClick={handleEdit}>Editar</button>
      <button className="btn-eliminar-cliente" onClick={handleDelete}>
        Eliminar
      </button>
      <button className='btn-default' onClick={handleViewPrestamos}>Listado de Préstamos</button>
    </div>
  );
};