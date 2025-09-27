export enum EmailTokenType {
  /**
   * A token for verifying an account
   */
  AccountVerification = 'AccountVerification',
  /**
   * A token for resetting a password
   */
  PasswordReset = 'PasswordReset',
  /**
   * Requests a login link
   */
  LoginRequest = 'LoginRequest',
  /**
   * Request encrypted private key blob for a user
   * (requires username/email)
   */
  PrivateKeyRequest = 'PrivateKeyRequest',
  /**
   * Request encrypted mnemonic blob for a user
   * (requires private key)
   */
  MnemonicRecoveryRequest = 'MnemonicRecoveryRequest',
}
