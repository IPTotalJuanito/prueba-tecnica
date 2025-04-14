import React, { useState, useEffect } from "react";
import axios from "axios";

const SolicitudPrestamo = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    monto: "",
    plazo: "",
  });
  const [prestamos, setPrestamos] = useState([]); // Estado para almacenar los préstamos del cliente
  const [error, setError] = useState("");

  // Obtener los préstamos del cliente logueado al cargar el componente
  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/prestamos", {
          headers: {
            // Aquí puedes enviar un token o identificador del cliente si es necesario
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPrestamos(response.data); // Guardar los préstamos en el estado
      } catch (err) {
        console.error(err);
        setError("Error al cargar los préstamos.");
      }
    };

    fetchPrestamos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos del formulario al backend
      const response = await axios.post("http://localhost:5000/api/solicitar-prestamo", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Préstamo solicitado:", response.data);

      // Actualizar la lista de préstamos después de solicitar uno nuevo
      setPrestamos((prev) => [...prev, response.data]);
    } catch (err) {
      console.error(err);
      setError("Error al solicitar el préstamo.");
    }
  };

  return (
    <div>
      <h2>Solicitud de Préstamo</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
          <label>Monto:</label>
          <input
            type="number"
            name="monto"
            value={formData.monto}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Plazo (meses):</label>
          <input
            type="number"
            name="plazo"
            value={formData.plazo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Solicitar</button>
      </form>

      <h3>Mis Préstamos</h3>
      {prestamos.length === 0 ? (
        <p>No tienes préstamos registrados.</p>
      ) : (
        <ul>
          {prestamos.map((prestamo) => (
            <li key={prestamo.id}>
              <strong>Monto:</strong> {prestamo.monto} - <strong>Plazo:</strong> {prestamo.plazo} meses - <strong>Estado:</strong> {prestamo.estado}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { SolicitudPrestamo };