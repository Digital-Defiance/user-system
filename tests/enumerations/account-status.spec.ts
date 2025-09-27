import { AccountStatus } from '../../src/enumerations/account-status';

describe('AccountStatus', () => {
  it('should have correct enum values', () => {
    expect(AccountStatus.PendingEmailVerification).toBe('PendingEmailVerification');
    expect(AccountStatus.Active).toBe('Active');
    expect(AccountStatus.AdminLock).toBe('AdminLock');
  });

  it('should have all expected enum members', () => {
    const values = Object.values(AccountStatus);
    expect(values).toHaveLength(3);
    expect(values).toContain('PendingEmailVerification');
    expect(values).toContain('Active');
    expect(values).toContain('AdminLock');
  });

  it('should be usable in type guards', () => {
    const isValidStatus = (status: string): status is AccountStatus => {
      return Object.values(AccountStatus).includes(status as AccountStatus);
    };

    expect(isValidStatus('Active')).toBe(true);
    expect(isValidStatus('InvalidStatus')).toBe(false);
  });
});