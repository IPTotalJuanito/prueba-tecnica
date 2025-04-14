import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar credenciales al backend
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        const { role, token } = response.data;

        // Guardar el token en el almacenamiento local
        localStorage.setItem("token", token);

        // Llamar a la función de autenticación en App.jsx
        onLogin(role); // Pasar el rol del usuario

        // Redirigir según el rol del usuario
        if (role === "admin") {
          navigate("/clientes"); // Redirigir a la página de clientes
        } else if (role === "cliente") {
          navigate("/solicitud-prestamo"); // Redirigir a la página de solicitud de préstamo
        }
      } else {
        setError("Credenciales inválidas. Inténtalo de nuevo.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;