import { CustomError } from './base-error';
import status from 'http-status-codes';

export class NotAuthenticatedError extends CustomError {
  public statusCode: number = status.NOT_FOUND;
  reason = 'Wrong username or password';

  constructor() {
    super('Wrong username or password');
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
