import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

const roleMiddleware = (requiredRole: string) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json('Access denied, no token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY || '') as jwt.JwtPayload;

    if (payload.role !== requiredRole) {
      return res.status(403).json('Access denied, insufficient p ermissions');
    }

    req.payload = payload;
    next();
  } catch {
    res.status(400).json('Invalid token');
  }
};

export default roleMiddleware;
