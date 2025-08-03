import { CustomError } from './base-error';
import status from 'http-status-codes';

export class AlreadyExistsError extends CustomError {
  public statusCode: number = status.BAD_REQUEST;
  reason = 'Object already exists';

  constructor(message?: string) {
    super('Object already exists');
    // Set the prototype explicitly.
    if (message) {
      this.reason = message;
    }
    Object.setPrototypeOf(this, AlreadyExistsError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
