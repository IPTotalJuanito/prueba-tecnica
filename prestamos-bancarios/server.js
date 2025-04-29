import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware/authMiddleware.js";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gestion_prestamos",
  password: "Antonio2000",
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// Ruta para iniciar sesión
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario es un administrador
    const adminResult = await pool.query(
      "SELECT * FROM administradores WHERE email = $1 AND contrasena = $2",
      [email, password]
    );

    if (adminResult.rows.length > 0) {
      const token = jwt.sign({ id: adminResult.rows[0].id, role: "admin" }, "tu_secreto_jwt", {
        expiresIn: "1h",
      });
      return res.json({ success: true, role: "admin", token });
    }

    // Verificar si el usuario es un cliente
    const clienteResult = await pool.query(
      "SELECT * FROM clientes WHERE email = $1 AND cedula = $2",
      [email, password]
    );

    if (clienteResult.rows.length > 0) {
      const token = jwt.sign({ id: clienteResult.rows[0].id, role: "cliente" }, "tu_secreto_jwt", {
        expiresIn: "1h",
      });
      return res.json({ success: true, role: "cliente", token });
    }

    // Si no se encuentra el usuario en ninguna tabla
    res.status(401).json({ success: false, message: "Credenciales inválidas" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Ruta para obtener los préstamos del cliente logueado
app.get("/api/prestamos", authMiddleware, async (req, res) => {
  const clienteId = req.user.id; // Ahora `req.user` debería estar definido

  try {
    const result = await pool.query(
      "SELECT * FROM prestamos WHERE cliente_id = $1",
      [clienteId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los préstamos.");
  }
});

// Ruta para solicitar un préstamo
app.post("/api/solicitar-prestamo", authMiddleware, async (req, res) => {
  const { monto, plazo } = req.body;
  const clienteId = req.user.id; // Ahora `req.user` debería estar definido

  try {
    const result = await pool.query(
      "INSERT INTO prestamos (cliente_id, monto, plazo, estado) VALUES ($1, $2, $3, $4) RETURNING *",
      [clienteId, monto, plazo, "pendiente"]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al solicitar el préstamo.");
  }
});

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});

app.get("/api/clientes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clientes");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener clientes");
  }
});

// Ruta para crear un nuevo cliente
app.post("/api/clientes", authMiddleware, async (req, res) => {
  const { nombre, email, telefono, cedula } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO clientes (nombre, email, telefono, cedula) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, email, telefono, cedula]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear el cliente");
  }
});

// Ruta para eliminar un cliente
app.delete("/api/clientes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar cliente");
  }
});

// Ruta para editar un cliente
app.put("/api/clientes/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  try {
    const result = await pool.query(
      "UPDATE clientes SET nombre = $1, email = $2, telefono = $3 WHERE id = $4 RETURNING *",
      [nombre, email, telefono, id]
    );
    res.json(result.rows[0]); // Devolver el cliente actualizado
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al editar cliente");
  }
});

// Ruta para obtener los préstamos de un cliente específico
app.get("/api/prestamos/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM prestamos WHERE cliente_id = $1",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los préstamos.");
  }
});

// Ruta para cambiar el estado de un préstamo
app.put("/api/prestamos/:prestamoId", authMiddleware, async (req, res) => {
  const { prestamoId } = req.params;
  const { estado } = req.body;
  try {
    const result = await pool.query(
      "UPDATE prestamos SET estado = $1 WHERE id = $2 RETURNING *",
      [estado, prestamoId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el préstamo.");
  }
});