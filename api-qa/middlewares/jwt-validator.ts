import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface UserPayload {
  uid: string;
  name: string;
}

export const jwtValidator = (req: Request, res: Response, next: NextFunction) => {
  //x-token Headers
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la peticion',
    });
  }

  try {
    const { uid, name } = verify(token, 'process.env.SECRET_JWT_SEED') as UserPayload;

    req.params.uid = uid;
    req.params.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }

  next();
};
