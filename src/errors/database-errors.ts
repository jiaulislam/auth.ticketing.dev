import { CustomError } from './base-error';
import status from 'http-status-codes';

export class DatabaseError extends CustomError {
  public statusCode: number = status.INTERNAL_SERVER_ERROR;
  reason = 'Database connection error';

  constructor() {
    super('Database connection error');
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
