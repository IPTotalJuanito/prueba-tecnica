import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ClientesPage } from "./pages/clientePage/ClientePage";
import { SolicitudPrestamo } from "./pages/solicitudPrestamoPage/SolicitudPrestamo";
import { CambiarEstadoPrestamo } from "./pages/updatePrestamoPage/CambiarEstadoPrestamo";
import PrestamosPage from "./pages/prestamosPage/PrestamosPage";
import LoginPage from "./pages/loginPage/LoginPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para manejar la autenticación

  // Función para manejar el inicio de sesión exitoso
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de inicio de sesión */}
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

        {/* Rutas protegidas */}
        <Route
          path="/clientes"
          element={isAuthenticated ? <ClientesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/solicitud-prestamo"
          element={isAuthenticated ? <SolicitudPrestamo /> : <Navigate to="/" />}
        />
        <Route
          path="/cambiar-estado-prestamo"
          element={isAuthenticated ? <CambiarEstadoPrestamo /> : <Navigate to="/" />}
        />
        <Route
          path="/cambiar-estado-prestamo/:prestamoId"
          element={isAuthenticated ? <CambiarEstadoPrestamo /> : <Navigate to="/" />}
        />
        <Route
          path="/prestamos/:id"
          element={isAuthenticated ? <PrestamosPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;