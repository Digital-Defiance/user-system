import { IBackupCode } from '../../src/interfaces/backup-code';

describe('IBackupCode interface', () => {
  it('should accept valid backup code object', () => {
    const backupCode: IBackupCode = {
      version: '1.0',
      checksumSalt: 'salt123',
      checksum: 'checksum456',
      encrypted: 'encryptedData789'
    };

    expect(backupCode.version).toBe('1.0');
    expect(backupCode.checksumSalt).toBe('salt123');
    expect(backupCode.checksum).toBe('checksum456');
    expect(backupCode.encrypted).toBe('encryptedData789');
  });

  it('should work with different version formats', () => {
    const backupCodes: IBackupCode[] = [
      {
        version: '1.0.0',
        checksumSalt: 'salt1',
        checksum: 'check1',
        encrypted: 'enc1'
      },
      {
        version: 'v2',
        checksumSalt: 'salt2',
        checksum: 'check2',
        encrypted: 'enc2'
      }
    ];

    expect(backupCodes).toHaveLength(2);
    expect(backupCodes[0].version).toBe('1.0.0');
    expect(backupCodes[1].version).toBe('v2');
  });

  it('should handle empty strings', () => {
    const backupCode: IBackupCode = {
      version: '',
      checksumSalt: '',
      checksum: '',
      encrypted: ''
    };

    expect(typeof backupCode.version).toBe('string');
    expect(typeof backupCode.checksumSalt).toBe('string');
    expect(typeof backupCode.checksum).toBe('string');
    expect(typeof backupCode.encrypted).toBe('string');
  });
});