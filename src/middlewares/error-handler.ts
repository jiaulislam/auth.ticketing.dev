import { Request, Response, NextFunction } from 'express';
import status from 'http-status-codes';

import { CustomError } from '../errors/base-error';

export const errorhandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }
  res.status(status.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
  next();
};
