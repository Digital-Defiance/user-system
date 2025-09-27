import { SecureString } from '@digitaldefiance/ecies-lib';
import { Constants } from './constants';
import { InvalidBackupCodeError } from './errors/invalid-backup-code';

export class BackupCodeString extends SecureString {
  private readonly _normalizedCode: string;

  constructor(code: string) {
    const normalizedCode = BackupCodeString.normalizeCode(code);
    if (!Constants.BACKUP_CODES.NormalizedHexRegex.test(normalizedCode)) {
      throw new InvalidBackupCodeError();
    }
    super(normalizedCode);
    this._normalizedCode = normalizedCode;
  }

  public override get value(): string {
    return this.notNullValue;
  }

  public override get notNullValue(): string {
    return BackupCodeString.formatBackupCode(this._normalizedCode);
  }

  public override get valueAsHexString(): string {
    const formattedValue = BackupCodeString.formatBackupCode(
      this._normalizedCode,
    );
    return new TextEncoder().encode(formattedValue).reduce((str, byte) => {
      return str + byte.toString(16).padStart(2, '0');
    }, '');
  }

  public override get valueAsBase64String(): string {
    const formattedValue = BackupCodeString.formatBackupCode(
      this._normalizedCode,
    );
    return btoa(formattedValue);
  }

  public override get valueAsUint8Array(): Uint8Array {
    const formattedValue = BackupCodeString.formatBackupCode(
      this._normalizedCode,
    );
    return new TextEncoder().encode(formattedValue);
  }

  /**
   * Format a 32-char normalized code into display form (8 groups of 4).
   * Does not restrict characters beyond grouping.
   */
  public static formatBackupCode(code: string): string {
    const groups = code.match(/.{1,4}/g) ?? [code];
    return groups.join('-');
  }
  /**
   * Normalize user-entered code: remove spaces and hyphens, lowercase, and trim.
   */
  public static normalizeCode(input: string): string {
    return input.replace(/[\s-]/g, '').toLowerCase().trim();
  }

  public static generateBackupCode(): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const rnd = crypto.getRandomValues(new Uint8Array(32));
    let raw = '';
    for (let j = 0; j < 32; j++) {
      raw += alphabet[rnd[j] % alphabet.length];
    }
    return raw;
  }

  /**
   * Generate the configured number of backup codes.
   * Note: If generation alphabet/length is controlled elsewhere, prefer that path.
   */
  public static generateBackupCodes(): Array<BackupCodeString> {
    const codes: Array<BackupCodeString> = [];
    for (let i = 0; i < Constants.BACKUP_CODES.Count; i++) {
      codes.push(new BackupCodeString(BackupCodeString.generateBackupCode()));
    }
    return codes;
  }
}
