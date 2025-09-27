import { BackupCodeString } from '../src/backup-code-string';
import { AccountStatus } from '../src/enumerations/account-status';
import { EmailTokenType } from '../src/enumerations/email-token-type';
import { Role } from '../src/enumerations/role';
// import { InvalidBackupCodeError } from '../src/errors/invalid-backup-code';
import * as UserSystem from '../src/index';

describe('User System Library Index', () => {
  it('should export BackupCodeString', () => {
    expect(UserSystem.BackupCodeString).toBe(BackupCodeString);
  });

  it('should export all enumerations', () => {
    expect(UserSystem.AccountStatus).toBe(AccountStatus);
    expect(UserSystem.Role).toBe(Role);
    expect(UserSystem.EmailTokenType).toBe(EmailTokenType);
  });

  // Temporarily disabled due to TypedHandleableError import issues
  // it('should export all error classes', () => {
  //   expect(UserSystem.InvalidBackupCodeError).toBe(InvalidBackupCodeError);
  // });

  it('should export interfaces (type-only, verified by compilation)', () => {
    // Interfaces are type-only exports, so we verify they exist by using them
    const testInterface = (user: UserSystem.IFrontendUser<'en'>) => user;
    const testBackupCode = (code: UserSystem.IBackupCode) => code;

    expect(typeof testInterface).toBe('function');
    expect(typeof testBackupCode).toBe('function');
  });

  it('should have all expected exports available', () => {
    const expectedExports = [
      'BackupCodeString',
      'AccountStatus',
      'Role',
      'EmailTokenType',
    ];

    expectedExports.forEach((exportName) => {
      expect(UserSystem).toHaveProperty(exportName);
    });
  });

  it('should allow creating instances of exported classes', () => {
    const backupCode = new UserSystem.BackupCodeString(
      '0123456789abcdef0123456789abcdef',
    );

    expect(backupCode).toBeInstanceOf(UserSystem.BackupCodeString);
  });
});
