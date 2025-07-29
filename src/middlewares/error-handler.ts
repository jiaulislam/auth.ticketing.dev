import { Request, Response, NextFunction } from 'express';
import status from 'http-status-codes';

import { RequestValidationError } from '../errors';

export const errorhandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  res.status(status.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
  next();
};
