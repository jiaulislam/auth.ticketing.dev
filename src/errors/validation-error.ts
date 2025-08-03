import { FieldValidationError } from 'express-validator';
import status from 'http-status-codes';

import { CustomError } from './base-error';

class RequestValidationError extends CustomError {
  public statusCode: number;

  constructor(public errors: FieldValidationError[]) {
    super('Invalid request parameters');
    this.statusCode = status.BAD_REQUEST;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.path,
      };
    });
  }
}

export { RequestValidationError };
