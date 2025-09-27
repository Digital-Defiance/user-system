export enum UserSystemStringKey {
  // Validation errors
  Validation_UsernameInUse = 'Validation_UsernameInUse',
  Validation_EmailInUse = 'Validation_EmailInUse',
  Validation_InvalidUsername = 'Validation_InvalidUsername',
  Validation_InvalidEmail = 'Validation_InvalidEmail',
  Validation_PasswordTooWeak = 'Validation_PasswordTooWeak',
  Validation_InvalidCredentials = 'Validation_InvalidCredentials',
  Validation_UsernameOrEmailRequired = 'Validation_UsernameOrEmailRequired',
  
  // Authentication errors
  Auth_UserNotFound = 'Auth_UserNotFound',
  Auth_AccountLocked = 'Auth_AccountLocked',
  Auth_TokenExpired = 'Auth_TokenExpired',
  Auth_InvalidToken = 'Auth_InvalidToken',
  Auth_InsufficientPermissions = 'Auth_InsufficientPermissions',
  
  // User management errors
  User_CreationFailed = 'User_CreationFailed',
  User_UpdateFailed = 'User_UpdateFailed',
  User_DeletionFailed = 'User_DeletionFailed',
  User_NotFound = 'User_NotFound',
  User_AlreadyExists = 'User_AlreadyExists',

  // Account status errors
  Error_AccountStatus_Active = 'Error_AccountStatus_Active',
  Error_AccountStatus_AdminLock = 'Error_AccountStatus_AdminLock',
  Error_AccountStatus_PendingEmailVerification = 'Error_AccountStatus_PendingEmailVerification',
}