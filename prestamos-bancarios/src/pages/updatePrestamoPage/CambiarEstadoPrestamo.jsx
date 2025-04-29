import "./CambiarEstadoPrestamo.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CambiarEstadoPrestamo = () => {
  const { prestamoId } = useParams(); // Obtener el ID del préstamo desde la URL
  const [estado, setEstado] = useState("");
  const [prestamo, setPrestamo] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar los datos del préstamo
    const fetchPrestamo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/prestamos/${prestamoId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data) {
          setPrestamo(response.data); // Guardar los datos del préstamo en el estado
          setEstado(response.data.estado); // Establecer el estado actual del préstamo
        } else {
          setError("No se encontraron datos para este préstamo.");
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar el préstamo.");
      }
    };

    fetchPrestamo();
  }, [prestamoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/prestamos/${prestamoId}`,
        { estado },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Estado del préstamo actualizado correctamente.");
      navigate(-1); // Regresar a la página anterior
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el estado del préstamo.");
    }
  };
  console.log(prestamo); // Para depuración

  
  return (
    <div className="cambiar-estado-prestamo-page">
      <h2>Cambiar Estado del Préstamo</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {prestamo ? (
        <form onSubmit={handleSubmit}>
          <label>
            <strong>Nuevo Estado:</strong>
            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="pendiente">Pendiente</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </label>
          <div className="boton-submit">
          <button type="submit">Actualizar Estado</button>
          </div>
        </form>
      ) : (
        <p>Cargando datos del préstamo...</p>
      )}
    </div>
  );
};

export { CambiarEstadoPrestamo };