import { Constants, BACKUP_CODES } from '../src/constants';

describe('Constants', () => {
  describe('BACKUP_CODES', () => {
    it('should have correct count value', () => {
      expect(BACKUP_CODES.Count).toBe(10);
    });

    it('should have valid normalized hex regex', () => {
      const regex = BACKUP_CODES.NormalizedHexRegex;
      
      // Valid cases
      expect(regex.test('0123456789abcdef0123456789abcdef')).toBe(true);
      expect(regex.test('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toBe(true);
      expect(regex.test('00000000000000000000000000000000')).toBe(true);
      
      // Invalid cases
      expect(regex.test('0123456789ABCDEF0123456789ABCDEF')).toBe(false); // uppercase
      expect(regex.test('0123456789abcdef0123456789abcde')).toBe(false); // too short
      expect(regex.test('0123456789abcdef0123456789abcdef0')).toBe(false); // too long
      expect(regex.test('0123456789abcdef0123456789abcde!')).toBe(false); // invalid char
      expect(regex.test('')).toBe(false); // empty
    });

    it('should have valid display regex', () => {
      const regex = BACKUP_CODES.DisplayRegex;
      
      // Valid case
      expect(regex.test('0123-4567-89ab-cdef-0123-4567-89ab-cdef')).toBe(true);
      expect(regex.test('aaaa-bbbb-cccc-dddd-eeee-ffff-0000-1111')).toBe(true);
      
      // Invalid cases
      expect(regex.test('0123-4567-89AB-CDEF-0123-4567-89AB-CDEF')).toBe(false); // uppercase
      expect(regex.test('0123-4567-89ab-cdef-0123-4567-89ab')).toBe(false); // too short
      expect(regex.test('0123456789abcdef0123456789abcdef')).toBe(false); // no hyphens
      expect(regex.test('0123-4567-89ab-cdef-0123-4567-89ab-cdef-')).toBe(false); // trailing hyphen
      expect(regex.test('')).toBe(false); // empty
    });
  });

  describe('Constants object', () => {
    it('should contain BACKUP_CODES', () => {
      expect(Constants.BACKUP_CODES).toBe(BACKUP_CODES);
    });

    it('should have expected structure', () => {
      expect(Constants).toHaveProperty('BACKUP_CODES');
      expect(Constants.BACKUP_CODES).toHaveProperty('Count');
      expect(Constants.BACKUP_CODES).toHaveProperty('NormalizedHexRegex');
      expect(Constants.BACKUP_CODES).toHaveProperty('DisplayRegex');
    });
  });
});