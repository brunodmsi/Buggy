import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error.message);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
