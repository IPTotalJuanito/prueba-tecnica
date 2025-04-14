import './ClientePage.css';
import React, { useState, useEffect } from "react";
import { Cliente } from "../../components/clientes/Cliente";
import { FormularioCliente } from "../../components/formularioCliente/FormularioCliente";

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clientes")
      .then((response) => response.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error("Error al cargar clientes:", error));
  }, []);

  return (
    <div>
      <div className="contenedor-formulario">
        <FormularioCliente setClientes={setClientes} />
      </div>
      <div className="titulo-contenedor">Lista de Clientes</div>
      <div className="contenedor-clientes">
        {clientes.map((cliente) => (
          <Cliente key={cliente.id} cliente={cliente} setClientes={setClientes} />
        ))}
      </div>
    </div>
  );
};

export { ClientesPage };