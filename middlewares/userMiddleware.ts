import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  payload?: jwt.JwtPayload;
}

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('no token');
  }

  if (token) {
    const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);
    (req as AuthenticatedRequest).payload = decoded as jwt.JwtPayload;
  }

  next();
};

export default userMiddleware;
