import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access denied.' });
    }

    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);

    (req as AuthenticatedRequest).payload = decoded as jwt.JwtPayload;

    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
