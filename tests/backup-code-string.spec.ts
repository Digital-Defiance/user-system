import { BackupCodeString } from '../src/backup-code-string';
import { Constants } from '../src/constants';
import { InvalidBackupCodeError } from '../src/errors/invalid-backup-code';

// Polyfill btoa for Node/Jest
const g = globalThis as any;
if (typeof g.btoa === 'undefined') {
  g.btoa = (s: string) => Buffer.from(s, 'utf8').toString('base64');
}

describe('BackupCodeString', () => {
  describe('constructor validation', () => {
    it('accepts normalized 32-char lowercase hex', () => {
      expect(
        () => new BackupCodeString('deadbeefcafebabefeedface01234567'),
      ).not.toThrow();
    });

    it('accepts messy input that normalizes to valid hex', () => {
      expect(
        () => new BackupCodeString('DEAD-BEEF CAFE-babe FEED FACE 0123 4567'),
      ).not.toThrow();
    });

    it('throws InvalidBackupCodeError for non-alphanumeric characters even if 32 chars', () => {
      const invalid = '0123456789abcde!0123456789abcdef'; // contains "!"
      expect(() => new BackupCodeString(invalid)).toThrow(
        InvalidBackupCodeError,
      );
    });

    it('throws InvalidBackupCodeError for incorrect length after normalization', () => {
      const tooShort = '0123456789abcdef0123456789abcde'; // 31
      const tooLong = '0123456789abcdef0123456789abcdef0'; // 33
      expect(() => new BackupCodeString(tooShort)).toThrow(
        InvalidBackupCodeError,
      );
      expect(() => new BackupCodeString(tooLong)).toThrow(
        InvalidBackupCodeError,
      );
      expect(() => new BackupCodeString('----0123 4567----')).toThrow(
        InvalidBackupCodeError,
      );
    });

    it('throws for empty/whitespace-only input', () => {
      expect(() => new BackupCodeString('')).toThrow(InvalidBackupCodeError);
      expect(() => new BackupCodeString('    ')).toThrow(
        InvalidBackupCodeError,
      );
      expect(
        () => new BackupCodeString('---- ---- ---- ---- ---- ---- ---- ----'),
      ).toThrow(InvalidBackupCodeError);
    });

    it('throws for invalid separators or symbols that survive normalization (e.g., underscores)', () => {
      expect(
        () => new BackupCodeString('dead_beefcafebabefeedface01234567'),
      ).toThrow(InvalidBackupCodeError);
    });
  });

  describe('valueAsUint8Array', () => {
    const normalized = '0123456789abcdef0123456789abcdef';
    const formatted = '0123-4567-89ab-cdef-0123-4567-89ab-cdef';

    it('returns UTF-8 bytes of the formatted code for normalized input', () => {
      const bc = new BackupCodeString(normalized);
      const expected = new TextEncoder().encode(formatted);
      expect(bc.valueAsUint8Array).toEqual(expected);
    });

    it('normalizes input (spaces, hyphens, uppercase) before formatting and encoding', () => {
      const messy = '0123 4567-89AB cdef 0123-4567 89ab cdef';
      const bc = new BackupCodeString(messy);
      const expected = new TextEncoder().encode(formatted);
      expect(bc.valueAsUint8Array).toEqual(expected);
    });

    it('includes hyphens at the correct positions and has correct length', () => {
      const bc = new BackupCodeString(normalized);
      const buf = bc.valueAsUint8Array;
      const hyphen = '-'.charCodeAt(0);
      expect(buf.length).toBe(39);
      const dashPositions = [4, 9, 14, 19, 24, 29, 34];
      for (const idx of dashPositions) {
        expect(buf[idx]).toBe(hyphen);
      }
    });

    it('returns a new buffer instance on each access with identical content', () => {
      const bc = new BackupCodeString(normalized);
      const a = bc.valueAsUint8Array;
      const b = bc.valueAsUint8Array;
      expect(a).not.toBe(b);
      expect(a).toEqual(b);
    });
  });

  describe('getters and encodings', () => {
    const normalized = '0123456789abcdef0123456789abcdef';
    const formatted = '0123-4567-89ab-cdef-0123-4567-89ab-cdef';

    it('value equals notNullValue and both are formatted with hyphens', () => {
      const bc = new BackupCodeString(normalized);
      expect(bc.value).toBe(formatted);
      expect(bc.notNullValue).toBe(formatted);
    });

    it('valueAsHexString is the lowercase hex of the UTF-8 bytes of the formatted value', () => {
      const bc = new BackupCodeString(normalized);
      const expected = new TextEncoder()
        .encode(formatted)
        .reduce((acc, b) => acc + b.toString(16).padStart(2, '0'), '');
      expect(bc.valueAsHexString).toBe(expected);
    });

    it('valueAsBase64String is base64 of the formatted value', () => {
      const bc = new BackupCodeString(normalized);
      const expected = g.btoa(formatted);
      expect(bc.valueAsBase64String).toBe(expected);
    });

    it('encodings (hex/base64) represent the same bytes as valueAsUint8Array', () => {
      const bc = new BackupCodeString(normalized);
      const buf = bc.valueAsUint8Array;

      const hexFromBuf = Array.from(buf)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      expect(bc.valueAsHexString).toBe(hexFromBuf);

      const base64FromBuf = Buffer.from(buf).toString('base64');
      expect(bc.valueAsBase64String).toBe(base64FromBuf);
    });

    it('formatted value length is 39 chars, hex string is 78 chars, base64 is 52 chars', () => {
      const bc = new BackupCodeString(normalized);
      expect(bc.value.length).toBe(39);
      expect(bc.valueAsHexString.length).toBe(78);
      expect(bc.valueAsBase64String.length).toBe(52); // 39 bytes => ceil(39/3)*4 = 52
    });

    it('normalizing formatted value yields original normalized code', () => {
      const bc = new BackupCodeString(normalized);
      expect(BackupCodeString.normalizeCode(bc.value)).toBe(normalized);
    });
  });

  describe('normalizeCode', () => {
    it('removes spaces and hyphens, lowercases, and trims', () => {
      const input = '  0 1-23-AB cd-ef  ';
      expect(BackupCodeString.normalizeCode(input)).toBe('0123abcdef');
    });

    it('removes tabs and newlines as whitespace too', () => {
      const input = '\t01 23-\nAB cd-\r\nEF';
      expect(BackupCodeString.normalizeCode(input)).toBe('0123abcdef');
    });

    it('is idempotent for already-normalized strings', () => {
      const s = 'abcdef0123456789';
      expect(
        BackupCodeString.normalizeCode(BackupCodeString.normalizeCode(s)),
      ).toBe(s);
    });

    it('empty input normalizes to empty', () => {
      expect(BackupCodeString.normalizeCode('')).toBe('');
      expect(BackupCodeString.normalizeCode('   -  -   ')).toBe('');
    });
  });

  describe('formatBackupCode', () => {
    it('formats 32-char string into 8 groups of 4', () => {
      const s = '0123456789abcdef0123456789abcdef';
      expect(BackupCodeString.formatBackupCode(s)).toBe(
        '0123-4567-89ab-cdef-0123-4567-89ab-cdef',
      );
    });

    it('handles non-hex input without restriction (grouping only)', () => {
      const s = 'zzzzYYYYxxxx!!!!----@@@@';
      expect(BackupCodeString.formatBackupCode(s)).toBe(
        'zzzz-YYYY-xxxx-!!!!------@@@@',
      );
    });

    it('handles strings not multiple of 4 by keeping the last shorter group', () => {
      expect(BackupCodeString.formatBackupCode('abc')).toBe('abc');
      expect(BackupCodeString.formatBackupCode('abcde')).toBe('abcd-e');
      expect(BackupCodeString.formatBackupCode('abcdefgh')).toBe('abcd-efgh');
      expect(BackupCodeString.formatBackupCode('abcdefghi')).toBe(
        'abcd-efgh-i',
      );
    });

    it('returns empty string unchanged', () => {
      expect(BackupCodeString.formatBackupCode('')).toBe('');
    });

    it('groups by UTF-16 code units (emoji)', () => {
      const s = '😀😃😄😁😆'; // 5 emojis, 10 code units
      expect(BackupCodeString.formatBackupCode(s)).toBe('😀😃-😄😁-😆');
    });
  });

  describe('integration: messy input yields consistent getters', () => {
    it('produces consistent formatted value and encodings from messy input', () => {
      const messy = '0123 4567-89AB cdef 0123-4567 89ab cdef';
      const expectedFormatted = '0123-4567-89ab-cdef-0123-4567-89ab-cdef';
      const expectedBuf = new TextEncoder().encode(expectedFormatted);
      const expectedHex = Array.from(expectedBuf)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      const expectedB64 = Buffer.from(expectedBuf).toString('base64');

      const bc = new BackupCodeString(messy);
      expect(bc.value).toBe(expectedFormatted);
      expect(bc.notNullValue).toBe(expectedFormatted);
      expect(bc.valueAsUint8Array).toEqual(expectedBuf);
      expect(bc.valueAsHexString).toBe(expectedHex);
      expect(bc.valueAsBase64String).toBe(expectedB64);
    });
  });

  describe('generateBackupCodes', () => {
    const originalCrypto = (globalThis as any).crypto;

    afterEach(() => {
      (globalThis as any).crypto = originalCrypto;
    });

    it('calls crypto.getRandomValues once per code with a 32-byte buffer', () => {
      const mockGetRandomValues = jest.fn((arr: Uint8Array) => {
        // Fill with 0 -> alphabet[0] = 'a' so results are valid hex
        arr.fill(0);
        return arr;
      });
      (globalThis as any).crypto = { getRandomValues: mockGetRandomValues };

      const codes = BackupCodeString.generateBackupCodes();
      expect(codes.length).toBe(Constants.BACKUP_CODES.Count);
      expect(mockGetRandomValues).toHaveBeenCalledTimes(
        Constants.BACKUP_CODES.Count,
      );
      for (const call of mockGetRandomValues.mock.calls) {
        expect(call).toHaveLength(1);
        const arg = call[0] as Uint8Array;
        expect(arg).toBeInstanceOf(Uint8Array);
        expect(arg.length).toBe(32);
      }
    });

    it('maps RNG bytes via modulo alphabet length (e.g., 255 -> "d")', () => {
      // 255 % 36 === 3 -> alphabet[3] === 'd'
      (globalThis as any).crypto = {
        getRandomValues: (arr: Uint8Array) => {
          arr.fill(255);
          return arr;
        },
      };

      const codes = BackupCodeString.generateBackupCodes();
      const expectedNormalized = 'd'.repeat(32);
      const expectedFormatted = 'dddd-dddd-dddd-dddd-dddd-dddd-dddd-dddd';

      expect(codes.length).toBe(Constants.BACKUP_CODES.Count);
      for (const c of codes) {
        expect(c).toBeInstanceOf(BackupCodeString);
        expect(c.value).toBe(expectedFormatted);
        expect(BackupCodeString.normalizeCode(c.value)).toBe(
          expectedNormalized,
        );

        // Encodings consistent with formatted string
        const buf = c.valueAsUint8Array;
        const hexFromBuf = Array.from(buf)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        const b64FromBuf = Buffer.from(buf).toString('base64');
        expect(c.valueAsHexString).toBe(hexFromBuf);
        expect(c.valueAsBase64String).toBe(b64FromBuf);
      }
    });

    it('generates Count valid, formatted, hex-only codes using deterministic RNG stub', () => {
      // Stub RNG so indices map to 'abcdef0123456789' repeatedly
      const allowedIndices = [
        0, 1, 2, 3, 4, 5, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
      ]; // a..f then 0..9
      (globalThis as any).crypto = {
        getRandomValues: (arr: Uint8Array) => {
          for (let i = 0; i < arr.length; i++) {
            arr[i] = allowedIndices[i % allowedIndices.length];
          }
          return arr;
        },
      };

      const codes = BackupCodeString.generateBackupCodes();
      expect(Array.isArray(codes)).toBe(true);
      expect(codes.length).toBe(Constants.BACKUP_CODES.Count);

      const expectedNormalized = 'abcdef0123456789abcdef0123456789';
      const expectedFormatted = 'abcd-ef01-2345-6789-abcd-ef01-2345-6789';

      for (const c of codes) {
        expect(c).toBeInstanceOf(BackupCodeString);

        // formatted value checks
        expect(c.value).toBe(expectedFormatted);
        expect(c.value.length).toBe(39);
        const dashPositions = [4, 9, 14, 19, 24, 29, 34];
        for (const i of dashPositions) {
          expect(c.value[i]).toBe('-');
        }

        // normalization is 32-char lowercase hex
        const normalizedOut = BackupCodeString.normalizeCode(c.value);
        expect(normalizedOut).toBe(expectedNormalized);
        expect(normalizedOut).toMatch(/^[0-9a-f]{32}$/);

        // encodings consistent
        const buf = c.valueAsUint8Array;
        const hex = c.valueAsHexString;
        const b64 = c.valueAsBase64String;
        const hexFromBuf = Array.from(buf)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');
        const b64FromBuf = Buffer.from(buf).toString('base64');
        expect(hex).toBe(hexFromBuf);
        expect(b64).toBe(b64FromBuf);
      }

      // Ensure different objects returned (no aliasing)
      if (codes.length >= 2) {
        expect(codes[0]).not.toBe(codes[1]);
      }
    });
  });
});
