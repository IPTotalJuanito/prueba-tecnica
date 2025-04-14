import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado. Token no proporcionado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificar el token y extraer los datos del usuario
    const decoded = jwt.verify(token, "tu_secreto_jwt"); // Reemplaza "tu_secreto_jwt" con tu clave secreta
    req.user = decoded; // Agregar los datos del usuario al objeto `req`
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token inválido." });
  }
};

export default authMiddleware;