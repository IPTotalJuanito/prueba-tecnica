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

## Instalación

### Requisitos previos:
- Node.js y npm instalados.
- PostgreSQL instalado y configurado.

### Pasos para instalar:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/IPTotalJuanito/prueba-tecnica.git
   cd gestion-prestamos-bancarios