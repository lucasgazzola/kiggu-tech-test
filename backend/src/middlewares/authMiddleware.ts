import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Tipar req.user para TypeScript
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// Para solucionar el error de types, ejecuta:
// npm i --save-dev @types/jsonwebtoken
