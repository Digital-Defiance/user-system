import { EmailTokenType } from '../../src/enumerations/email-token-type';

describe('EmailTokenType', () => {
  it('should have correct enum values', () => {
    expect(EmailTokenType.AccountVerification).toBe('AccountVerification');
    expect(EmailTokenType.PasswordReset).toBe('PasswordReset');
    expect(EmailTokenType.LoginRequest).toBe('LoginRequest');
    expect(EmailTokenType.PrivateKeyRequest).toBe('PrivateKeyRequest');
    expect(EmailTokenType.MnemonicRecoveryRequest).toBe('MnemonicRecoveryRequest');
  });

  it('should have all expected enum members', () => {
    const values = Object.values(EmailTokenType);
    expect(values).toHaveLength(5);
    expect(values).toContain('AccountVerification');
    expect(values).toContain('PasswordReset');
    expect(values).toContain('LoginRequest');
    expect(values).toContain('PrivateKeyRequest');
    expect(values).toContain('MnemonicRecoveryRequest');
  });

  it('should be usable in type guards', () => {
    const isValidTokenType = (type: string): type is EmailTokenType => {
      return Object.values(EmailTokenType).includes(type as EmailTokenType);
    };

    expect(isValidTokenType('AccountVerification')).toBe(true);
    expect(isValidTokenType('InvalidType')).toBe(false);
  });
});