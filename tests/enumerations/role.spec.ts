import { Role } from '../../src/enumerations/role';

describe('Role', () => {
  it('should have correct enum values', () => {
    expect(Role.Admin).toBe('Admin');
    expect(Role.Member).toBe('Member');
    expect(Role.System).toBe('System');
  });

  it('should have all expected enum members', () => {
    const values = Object.values(Role);
    expect(values).toHaveLength(3);
    expect(values).toContain('Admin');
    expect(values).toContain('Member');
    expect(values).toContain('System');
  });

  it('should be usable in type guards', () => {
    const isValidRole = (role: string): role is Role => {
      return Object.values(Role).includes(role as Role);
    };

    expect(isValidRole('Admin')).toBe(true);
    expect(isValidRole('InvalidRole')).toBe(false);
  });
});