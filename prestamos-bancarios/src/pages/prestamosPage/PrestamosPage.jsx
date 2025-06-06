import "./PrestamosPage.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PrestamosPage = () => {
  const { id } = useParams(); // Obtener el ID del cliente desde la URL
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Para redirigir al formulario de cambiar estado

  useEffect(() => {
    // Cargar los préstamos del cliente
    const fetchPrestamos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/prestamos/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPrestamos(response.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los préstamos.");
      }
    };

    fetchPrestamos();
  }, [id]);

  const handleChangeEstado = (prestamoId) => {
    // Redirigir al formulario de cambiar estado del préstamo
    navigate(`/cambiar-estado-prestamo/${prestamoId}`);
  };

  console.log(prestamos); // Para depuración
  return (
    <div className="prestamos-page">
      <h2>Listado de Préstamos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {prestamos.length === 0 ? (
        <p>No hay préstamos registrados para este cliente.</p>
      ) : (
        <div className="prestamos-list">
          {prestamos.map((prestamo) => (
            <div key={prestamo.id} className="prestamo-item">
              <p>Monto: {prestamo.monto}</p>
              <p>Plazo: {prestamo.plazo} meses</p>
              <p>Estado: {prestamo.estado}</p>
              <button className="btn-default" onClick={() => handleChangeEstado(prestamo.id)}>
                Cambiar Estado
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrestamosPage;