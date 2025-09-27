import { HandleableError } from '@digitaldefiance/ecies-lib';
import { BackupCodeString } from '../src/backup-code-string';
import { Constants } from '../src/constants';
import { AccountStatus } from '../src/enumerations/account-status';
import { InvalidBackupCodeError } from '../src/errors/invalid-backup-code';

// Polyfill btoa for Node/Jest
const g = globalThis as any;
if (typeof g.btoa === 'undefined') {
  g.btoa = (s: string) => Buffer.from(s, 'utf8').toString('base64');
}

describe('Integration Tests', () => {
  describe('BackupCodeString with Constants', () => {
    it('should validate codes using Constants regex', () => {
      const validCode = '0123456789abcdef0123456789abcdef';
      expect(Constants.BACKUP_CODES.NormalizedHexRegex.test(validCode)).toBe(
        true,
      );

      const backupCode = new BackupCodeString(validCode);
      expect(backupCode.value).toMatch(Constants.BACKUP_CODES.DisplayRegex);
    });

    it('should generate correct number of backup codes', () => {
      const mockCrypto = {
        getRandomValues: jest.fn((arr: Uint8Array) => {
          arr.fill(0); // Fill with 0s which map to 'a'
          return arr;
        }),
      };
      (globalThis as any).crypto = mockCrypto;

      const codes = BackupCodeString.generateBackupCodes();
      expect(codes).toHaveLength(Constants.BACKUP_CODES.Count);
      expect(mockCrypto.getRandomValues).toHaveBeenCalledTimes(
        Constants.BACKUP_CODES.Count,
      );
    });
  });

  describe('Error handling integration', () => {
    it('should throw InvalidBackupCodeError for invalid codes', () => {
      expect(() => new BackupCodeString('invalid')).toThrow(
        InvalidBackupCodeError,
      );
      expect(() => new BackupCodeString('invalid')).toThrow(
        'Invalid backup code',
      );
    });

    it('should work with HandleableError for error chaining', () => {
      try {
        new BackupCodeString('invalid');
      } catch (originalError) {
        const wrappedError = new HandleableError(
          'Backup code validation failed',
          {
            cause: originalError as Error,
            statusCode: 400,
          },
        );

        expect(wrappedError.cause).toBeInstanceOf(InvalidBackupCodeError);
        expect(wrappedError.statusCode).toBe(400);
        expect(wrappedError.stack).toContain('Caused by:');
      }
    });
  });

  describe('Type system integration', () => {
    it('should work with AccountStatus in user-like objects', () => {
      interface TestUser {
        id: string;
        status: AccountStatus;
        backupCodes: BackupCodeString[];
      }

      const backupCode = new BackupCodeString(
        '0123456789abcdef0123456789abcdef',
      );
      const user: TestUser = {
        id: 'user123',
        status: AccountStatus.Active,
        backupCodes: [backupCode],
      };

      expect(user.status).toBe(AccountStatus.Active);
      expect(user.backupCodes).toHaveLength(1);
      expect(user.backupCodes[0]).toBeInstanceOf(BackupCodeString);
    });
  });

  describe('Library consistency', () => {
    it('should maintain consistent formatting across operations', () => {
      const input = 'DEAD-BEEF CAFE-babe FEED FACE 0123 4567';
      const backupCode = new BackupCodeString(input);

      // All representations should be consistent
      const formatted = backupCode.value;
      const normalized = BackupCodeString.normalizeCode(formatted);
      const reformatted = BackupCodeString.formatBackupCode(normalized);

      expect(formatted).toBe(reformatted);
      expect(Constants.BACKUP_CODES.DisplayRegex.test(formatted)).toBe(true);
      expect(Constants.BACKUP_CODES.NormalizedHexRegex.test(normalized)).toBe(
        true,
      );
    });

    it('should handle edge cases gracefully', () => {
      // Empty input
      expect(() => new BackupCodeString('')).toThrow(InvalidBackupCodeError);

      // Whitespace only
      expect(() => new BackupCodeString('   ')).toThrow(InvalidBackupCodeError);

      // Invalid characters
      expect(
        () => new BackupCodeString('!123456789abcdef0123456789abcdef'),
      ).toThrow(InvalidBackupCodeError);
    });
  });
});
