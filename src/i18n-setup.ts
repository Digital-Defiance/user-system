import { DefaultLanguage, I18nEngine, CurrencyCode, Timezone, Language } from '@digitaldefiance/i18n-lib';
import { UserSystemStringKey } from './enumerations/user-system-string-key';

export const UserSystemI18nEngineKey = 'DigitalDefiance.UserSystem.I18nEngine' as const;

export function initUserSystemI18nEngine() {
// Build complete translations for all string keys
  const englishTranslations: Record<UserSystemStringKey, string> = {
    [UserSystemStringKey.Auth_AccountLocked]: 'Account is temporarily locked',
    [UserSystemStringKey.Auth_InsufficientPermissions]: 'Insufficient permissions for this action',
    [UserSystemStringKey.Auth_InvalidToken]: 'Invalid authentication token',
    [UserSystemStringKey.Auth_TokenExpired]: 'Authentication token has expired',
    [UserSystemStringKey.Auth_UserNotFound]: 'User account not found',
    [UserSystemStringKey.User_AlreadyExists]: 'User already exists',
    [UserSystemStringKey.User_CreationFailed]: 'Failed to create user account',
    [UserSystemStringKey.User_DeletionFailed]: 'Failed to delete user account',
    [UserSystemStringKey.User_NotFound]: 'User not found',
    [UserSystemStringKey.User_UpdateFailed]: 'Failed to update user account',
    [UserSystemStringKey.Validation_EmailInUse]: 'Email address is already in use',
    [UserSystemStringKey.Validation_InvalidCredentials]: 'Invalid username or password',
    [UserSystemStringKey.Validation_InvalidEmail]: 'Invalid email address format',
    [UserSystemStringKey.Validation_InvalidUsername]: 'Invalid username format',
    [UserSystemStringKey.Validation_PasswordTooWeak]: 'Password does not meet security requirements',
    [UserSystemStringKey.Validation_UsernameInUse]: 'Username is already in use',
    [UserSystemStringKey.Validation_UsernameOrEmailRequired]: 'Username or email is required',
    [UserSystemStringKey.Error_AccountStatus_Active]: 'Account is active',
    [UserSystemStringKey.Error_AccountStatus_AdminLock]: 'Account is locked by an administrator',
    [UserSystemStringKey.Error_AccountStatus_PendingEmailVerification]: 'Account is pending email verification',
  };

  const frenchTranslations: Record<UserSystemStringKey, string> = {
    [UserSystemStringKey.Auth_AccountLocked]: 'Le compte est temporairement verrouillé',
    [UserSystemStringKey.Auth_InsufficientPermissions]: 'Permissions insuffisantes pour cette action',
    [UserSystemStringKey.Auth_InvalidToken]: 'Jeton d\'authentification invalide',
    [UserSystemStringKey.Auth_TokenExpired]: 'Le jeton d\'authentification a expiré',
    [UserSystemStringKey.Auth_UserNotFound]: 'Compte utilisateur introuvable',
    [UserSystemStringKey.User_AlreadyExists]: 'L\'utilisateur existe déjà',
    [UserSystemStringKey.User_CreationFailed]: 'Échec de la création du compte utilisateur',
    [UserSystemStringKey.User_DeletionFailed]: 'Échec de la suppression du compte utilisateur',
    [UserSystemStringKey.User_NotFound]: 'Utilisateur introuvable',
    [UserSystemStringKey.User_UpdateFailed]: 'Échec de la mise à jour du compte utilisateur',
    [UserSystemStringKey.Validation_EmailInUse]: 'L\'adresse e-mail est déjà utilisée',
    [UserSystemStringKey.Validation_InvalidCredentials]: 'Nom d\'utilisateur ou mot de passe invalide',
    [UserSystemStringKey.Validation_InvalidEmail]: 'Format d\'adresse e-mail invalide',
    [UserSystemStringKey.Validation_InvalidUsername]: 'Format de nom d\'utilisateur invalide',
    [UserSystemStringKey.Validation_PasswordTooWeak]: 'Le mot de passe ne respecte pas les exigences de sécurité',
    [UserSystemStringKey.Validation_UsernameInUse]: 'Le nom d\'utilisateur est déjà utilisé',
    [UserSystemStringKey.Validation_UsernameOrEmailRequired]: 'Le nom d\'utilisateur ou l\'e-mail est requis',
    [UserSystemStringKey.Error_AccountStatus_Active]: 'Le compte est actif',
    [UserSystemStringKey.Error_AccountStatus_AdminLock]: 'Le compte est verrouillé par un administrateur',
    [UserSystemStringKey.Error_AccountStatus_PendingEmailVerification]: 'Le compte est en attente de vérification par e-mail',
  };
  const mandarinChineseTranslations: Record<UserSystemStringKey, string> = {
    [UserSystemStringKey.Auth_AccountLocked]: '账户暂时被锁定',
    [UserSystemStringKey.Auth_InsufficientPermissions]: '权限不足，无法执行此操作',
    [UserSystemStringKey.Auth_InvalidToken]: '无效的认证令牌',
    [UserSystemStringKey.Auth_TokenExpired]: '认证令牌已过期',
    [UserSystemStringKey.Auth_UserNotFound]: '未找到用户账户',
    [UserSystemStringKey.User_AlreadyExists]: '用户已存在',
    [UserSystemStringKey.User_CreationFailed]: '创建用户账户失败',
    [UserSystemStringKey.User_DeletionFailed]: '删除用户账户失败',
    [UserSystemStringKey.User_NotFound]: '未找到用户',
    [UserSystemStringKey.User_UpdateFailed]: '更新用户账户失败',
    [UserSystemStringKey.Validation_EmailInUse]: '电子邮件地址已被使用',
    [UserSystemStringKey.Validation_InvalidCredentials]: '无效的用户名或密码',
    [UserSystemStringKey.Validation_InvalidEmail]: '无效的电子邮件地址格式',
    [UserSystemStringKey.Validation_InvalidUsername]: '无效的用户名格式',
    [UserSystemStringKey.Validation_PasswordTooWeak]: '密码不符合安全要求',
    [UserSystemStringKey.Validation_UsernameInUse]: '用户名已被使用',
    [UserSystemStringKey.Validation_UsernameOrEmailRequired]: '需要用户名或电子邮件',
    [UserSystemStringKey.Error_AccountStatus_Active]: '账户处于激活状态',
    [UserSystemStringKey.Error_AccountStatus_AdminLock]: '账户被管理员锁定',
    [UserSystemStringKey.Error_AccountStatus_PendingEmailVerification]: '账户待电子邮件验证',
  };
  const spanishTranslations: Record<UserSystemStringKey, string> = {
    [UserSystemStringKey.Auth_AccountLocked]: 'La cuenta está temporalmente bloqueada',
    [UserSystemStringKey.Auth_InsufficientPermissions]: 'Permisos insuficientes para esta acción',
    [UserSystemStringKey.Auth_InvalidToken]: 'Token de autenticación inválido',
    [UserSystemStringKey.Auth_TokenExpired]: 'El token de autenticación ha expirado',
    [UserSystemStringKey.Auth_UserNotFound]: 'Cuenta de usuario no encontrada',
    [UserSystemStringKey.User_AlreadyExists]: 'El usuario ya existe',
    [UserSystemStringKey.User_CreationFailed]: 'Error al crear la cuenta de usuario',
    [UserSystemStringKey.User_DeletionFailed]: 'Error al eliminar la cuenta de usuario',
    [UserSystemStringKey.User_NotFound]: 'Usuario no encontrado',
    [UserSystemStringKey.User_UpdateFailed]: 'Error al actualizar la cuenta de usuario',
    [UserSystemStringKey.Validation_EmailInUse]: 'La dirección de correo electrónico ya está en uso',
    [UserSystemStringKey.Validation_InvalidCredentials]: 'Nombre de usuario o contraseña inválidos',
    [UserSystemStringKey.Validation_InvalidEmail]: 'Formato de dirección de correo electrónico inválido',
    [UserSystemStringKey.Validation_InvalidUsername]: 'Formato de nombre de usuario inválido',
    [UserSystemStringKey.Validation_PasswordTooWeak]: 'La contraseña no cumple con los requisitos de seguridad',
    [UserSystemStringKey.Validation_UsernameInUse]: 'El nombre de usuario ya está en uso',
    [UserSystemStringKey.Validation_UsernameOrEmailRequired]: 'Se requiere nombre de usuario o correo electrónico',
    [UserSystemStringKey.Error_AccountStatus_Active]: 'La cuenta está activa',
    [UserSystemStringKey.Error_AccountStatus_AdminLock]: 'La cuenta está bloqueada por un administrador',
    [UserSystemStringKey.Error_AccountStatus_PendingEmailVerification]: 'La cuenta está pendiente de verificación por correo electrónico',
  };
  const ukrainianTranslations: Record<UserSystemStringKey, string> = {
    [UserSystemStringKey.Auth_AccountLocked]: 'Обліковий запис тимчасово заблоковано',
    [UserSystemStringKey.Auth_InsufficientPermissions]: 'Недостатньо прав для виконання цієї дії',
    [UserSystemStringKey.Auth_InvalidToken]: 'Недійсний токен автентифікації',
    [UserSystemStringKey.Auth_TokenExpired]: 'Термін дії токена автентифікації минув',
    [UserSystemStringKey.Auth_UserNotFound]: 'Обліковий запис користувача не знайдено',
    [UserSystemStringKey.User_AlreadyExists]: 'Користувач вже існує',
    [UserSystemStringKey.User_CreationFailed]: 'Не вдалося створити обліковий запис користувача',
    [UserSystemStringKey.User_DeletionFailed]: 'Не вдалося видалити обліковий запис користувача',
    [UserSystemStringKey.User_NotFound]: 'Користувача не знайдено',
    [UserSystemStringKey.User_UpdateFailed]: 'Не вдалося оновити обліковий запис користувача',
    [UserSystemStringKey.Validation_EmailInUse]: 'Адреса електронної пошти вже використовується',
    [UserSystemStringKey.Validation_InvalidCredentials]: 'Недійсне ім\'я користувача або пароль',
    [UserSystemStringKey.Validation_InvalidEmail]: 'Недійсний формат адреси електронної пошти',
    [UserSystemStringKey.Validation_InvalidUsername]: 'Недійсний формат імені користувача',
    [UserSystemStringKey.Validation_PasswordTooWeak]: 'Пароль не відповідає вимогам безпеки',
    [UserSystemStringKey.Validation_UsernameInUse]: 'Ім\'я користувача вже використовується',
    [UserSystemStringKey.Validation_UsernameOrEmailRequired]: 'Потрібно вказати ім\'я користувача або електронну пошту',
    [UserSystemStringKey.Error_AccountStatus_Active]: 'Обліковий запис активний',
    [UserSystemStringKey.Error_AccountStatus_AdminLock]: 'Обліковий запис заблоковано адміністратором',
    [UserSystemStringKey.Error_AccountStatus_PendingEmailVerification]: 'Обліковий запис очікує підтвердження електронної пошти',
  };
  
  // Create a proper I18n engine with ECIES translations
  const config = {
    stringNames: Object.values(UserSystemStringKey),
    strings: {
      [DefaultLanguage.EnglishUS]: englishTranslations,
      [DefaultLanguage.EnglishUK]: englishTranslations,
      [DefaultLanguage.French]: frenchTranslations,
      [DefaultLanguage.MandarinChinese]: mandarinChineseTranslations,
      [DefaultLanguage.Spanish]: spanishTranslations,
      [DefaultLanguage.Ukrainian]: ukrainianTranslations,
    },
    defaultLanguage: DefaultLanguage.EnglishUS,
    defaultTranslationContext: 'user' as const,
    defaultCurrencyCode: new CurrencyCode('USD'),
    languageCodes: {
      [DefaultLanguage.EnglishUS]: 'en',
      [DefaultLanguage.EnglishUK]: 'en-GB',
      [DefaultLanguage.French]: 'fr',
      [DefaultLanguage.MandarinChinese]: 'zh-CN',
      [DefaultLanguage.Spanish]: 'es',
      [DefaultLanguage.Ukrainian]: 'uk',
    },
    languages: Object.values(DefaultLanguage),
    constants: {},
    enumName: 'UserSystemStringKey',
    enumObj: UserSystemStringKey as Record<string, UserSystemStringKey>,
    timezone: new Timezone('UTC'),
    adminTimezone: new Timezone('UTC'),
  };

  return new I18nEngine(config, UserSystemI18nEngineKey);
}

let _userSystemI18nEngine: I18nEngine<UserSystemStringKey, Language, any, any> | null = null;
export function getUserSystemI18nEngine(): I18nEngine<UserSystemStringKey, Language, any, any> {
  if (!_userSystemI18nEngine) {
    _userSystemI18nEngine = initUserSystemI18nEngine();
  }
  return _userSystemI18nEngine;
}

export function resetUserSystemI18nEngine(): void {
  _userSystemI18nEngine = null;
}

export const UserSystemI18nEngine = getUserSystemI18nEngine();