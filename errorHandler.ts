import { NextFunction, Request, Response } from 'express';
import { ValidationError, BaseError } from './error';

// error handler middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message
    });
  } else if (err instanceof BaseError) {
    if (err.isOperational) {
      res.status(err.status).json({
        status: err.status < 500 && err.status >= 400 ? 'fail' : 'error',
        message: err.message
      });
      //
    } else {
      // send generic error message
      res.status(err.status).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }
  }
  next();
};
