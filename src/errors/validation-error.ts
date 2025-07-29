import {ValidationError} from "express-validator";
import status from "http-status-codes";

class RequestValidationError extends Error {
  public statusCode: number;

  constructor(private errors: ValidationError[]) {
    super();
    this.statusCode = status.BAD_REQUEST;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}

export { RequestValidationError };