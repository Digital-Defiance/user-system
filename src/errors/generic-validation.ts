import {
  HandleableError,
  HandleableErrorOptions,
} from '@digitaldefiance/ecies-lib';

export class GenericValidationError extends HandleableError {
  constructor(message: string, options?: HandleableErrorOptions) {
    super(message, { ...options, statusCode: 422 });
  }
}
