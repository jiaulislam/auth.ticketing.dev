import { CustomError } from './base-error';
import status from 'http-status-codes';

export class NotFoundError extends CustomError {
  public statusCode: number = status.NOT_FOUND;
  reason = 'Resource not found';

  constructor() {
    super('Resource not found');
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
