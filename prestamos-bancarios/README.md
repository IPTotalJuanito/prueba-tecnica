# Gestión de Préstamos Bancarios

Este proyecto es una aplicación web para la gestión de préstamos bancarios. Permite a los administradores gestionar clientes y préstamos, y a los clientes solicitar préstamos y ver su estado.

## Características

### Para Administradores:
- Crear, editar y eliminar clientes.
- Ver la lista de clientes registrados.
- Ver y gestionar los préstamos de cada cliente.
- Cambiar el estado de un préstamo (pendiente, aprobado, rechazado).

### Para Clientes:
- Solicitar un nuevo préstamo.
- Ver la lista de préstamos asociados a su cuenta.
- Consultar el estado de sus préstamos.

---

## Tecnologías Utilizadas

### Frontend:
- **React**: Biblioteca para construir interfaces de usuario.
- **React Router**: Para la navegación entre páginas.
- **Axios**: Para realizar solicitudes HTTP al backend.

### Backend:
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para construir la API REST.
- **PostgreSQL**: Base de datos relacional para almacenar clientes y préstamos.
- **jsonwebtoken (JWT)**: Para la autenticación y autorización.

---

### DB Postgres tablas
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY, -- Identificador único para cada cliente
    nombre VARCHAR(100) NOT NULL, -- Nombre del cliente
    email VARCHAR(100) UNIQUE NOT NULL, -- Correo electrónico único
    telefono VARCHAR(15) NOT NULL, -- Teléfono del cliente
	 cedula VARCHAR(10) NOT NULL, -- cedula del cliente la cual utilizara de contraseña
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación del registro
);

CREATE TABLE administradores (
    id SERIAL PRIMARY KEY, -- Identificador único para cada administrador
    nombre VARCHAR(100) NOT NULL, -- Nombre del administrador
    email VARCHAR(100) UNIQUE NOT NULL, -- Correo electrónico único
    contrasena VARCHAR(255) NOT NULL, -- Contraseña (debería estar encriptada)
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación del registro
);

CREATE TABLE prestamos (
    id SERIAL PRIMARY KEY, -- Identificador único para cada préstamo
    cliente_id INT NOT NULL, -- Relación con el cliente que solicita el préstamo
    monto NUMERIC(10, 2) NOT NULL, -- Monto del préstamo
    plazo INT NOT NULL, -- Plazo en meses
    estado VARCHAR(50) DEFAULT 'pendiente', -- Estado del préstamo (pendiente, aprobado, rechazado)
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de solicitud del préstamo
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de última actualización del estado
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE -- Relación con la tabla clientes
);

INSERT INTO clientes (nombre, email, telefono, cedula) 
VALUES ('Juan Cuesta', 'juan.cuesta@example.com', '123456789', '1234567890');

INSERT INTO administradores (nombre, email, contrasena) 
VALUES ('Admin1', 'admin1@example.com', 'password123');

INSERT INTO prestamos (cliente_id, monto, plazo, estado) 
VALUES (1, 5000.00, 12, 'pendiente');

## Instalación

### Requisitos previos:
- Node.js y npm instalados.
- PostgreSQL instalado y configurado.

### Pasos para instalar:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/IPTotalJuanito/prueba-tecnica.git
   cd gestion-prestamos-bancarios