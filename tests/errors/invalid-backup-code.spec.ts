import { InvalidBackupCodeError } from '../../src/errors/invalid-backup-code';

describe('InvalidBackupCodeError', () => {
  it('should create error with default message', () => {
    const error = new InvalidBackupCodeError();
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('InvalidBackupCodeError');
    expect(error.message).toBe('Invalid backup code');
  });

  it('should create error with custom message', () => {
    const customMessage = 'Custom backup code error';
    const error = new InvalidBackupCodeError(customMessage);
    expect(error.message).toBe(customMessage);
    expect(error.name).toBe('InvalidBackupCodeError');
  });

  it('should be instanceof Error and InvalidBackupCodeError', () => {
    const error = new InvalidBackupCodeError();
    expect(error instanceof Error).toBe(true);
    expect(error instanceof InvalidBackupCodeError).toBe(true);
  });

  it('should have proper stack trace', () => {
    const error = new InvalidBackupCodeError();
    expect(error.stack).toBeDefined();
    expect(error.stack).toContain('InvalidBackupCodeError');
  });
});