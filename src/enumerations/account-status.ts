/**
 * Values for the status of an account.
 */
export enum AccountStatus {
  /**
   * The user has not verified their email address
   */
  PendingEmailVerification = 'PendingEmailVerification',
  /**
   * The user has verified their email address
   */
  Active = 'Active',
  /**
   * The user has been locked by an admin
   */
  AdminLock = 'AdminLock',
}
