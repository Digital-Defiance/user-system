import { DefaultLanguage, I18nEngine } from '@digitaldefiance/i18n-lib';
import { initUserSystemI18nEngine, getUserSystemI18nEngine } from '../src/i18n-setup';
import { UserSystemStringKey } from '../src/enumerations';

describe('User System I18n Setup', () => {
  beforeEach(() => {
    I18nEngine.clearInstances();
  });

  afterEach(() => {
    I18nEngine.clearInstances();
  });

  describe('initUserSystemI18nEngine', () => {
    it('should initialize i18n engine with user system translations', () => {
      initUserSystemI18nEngine();
      const engine = getUserSystemI18nEngine();
      
      expect(engine).toBeDefined();
      expect(engine.config.stringNames).toContain(UserSystemStringKey.Validation_UsernameInUse);
    });

    it('should include all user system string keys', () => {
      initUserSystemI18nEngine();
      const engine = getUserSystemI18nEngine();
      
      Object.values(UserSystemStringKey).forEach(key => {
        expect(engine.config.stringNames).toContain(key);
      });
    });

    it('should have English translations for all keys', () => {
      initUserSystemI18nEngine();
      const engine = getUserSystemI18nEngine();
      
      Object.values(UserSystemStringKey).forEach(key => {
        const translation = engine.translate(key, undefined, DefaultLanguage.EnglishUS);
        expect(translation).toBeTruthy();
        expect(translation).not.toBe(key);
      });
    });

    it('should have French translations for all keys', () => {
      initUserSystemI18nEngine();
      const engine = getUserSystemI18nEngine();
      
      Object.values(UserSystemStringKey).forEach(key => {
        const translation = engine.translate(key, undefined, DefaultLanguage.French);
        expect(translation).toBeTruthy();
        expect(translation).not.toBe(key);
      });
    });
  });

  describe('getUserSystemI18nEngine', () => {
    it('should return existing engine if already initialized', () => {
      initUserSystemI18nEngine();
      const engine1 = getUserSystemI18nEngine();
      const engine2 = getUserSystemI18nEngine();
      
      expect(engine1).toBe(engine2);
    });

    it('should initialize engine if not already done', () => {
      const engine = getUserSystemI18nEngine();
      
      expect(engine).toBeDefined();
      expect(engine.config.stringNames).toContain(UserSystemStringKey.Validation_UsernameInUse);
    });
  });

  describe('Translation Quality', () => {
    beforeEach(() => {
      initUserSystemI18nEngine();
    });

    it('should have different translations for English and French', () => {
      const engine = getUserSystemI18nEngine();
      const englishMsg = engine.translate(
        UserSystemStringKey.Validation_UsernameInUse,
        undefined,
        DefaultLanguage.EnglishUS
      );
      const frenchMsg = engine.translate(
        UserSystemStringKey.Validation_UsernameInUse,
        undefined,
        DefaultLanguage.French
      );
      
      expect(englishMsg).not.toBe(frenchMsg);
      expect(englishMsg).toBe('Username is already in use');
      expect(frenchMsg).toBe('Le nom d\'utilisateur est déjà utilisé');
    });

    it('should handle validation error translations', () => {
      const engine = getUserSystemI18nEngine();
      
      const validationKeys = [
        UserSystemStringKey.Validation_UsernameInUse,
        UserSystemStringKey.Validation_EmailInUse,
        UserSystemStringKey.Validation_InvalidUsername,
        UserSystemStringKey.Validation_InvalidEmail,
        UserSystemStringKey.Validation_PasswordTooWeak,
        UserSystemStringKey.Validation_InvalidCredentials,
      ];

      validationKeys.forEach(key => {
        const englishMsg = engine.translate(key, undefined, DefaultLanguage.EnglishUS);
        const frenchMsg = engine.translate(key, undefined, DefaultLanguage.French);
        
        expect(englishMsg).toBeTruthy();
        expect(frenchMsg).toBeTruthy();
        expect(englishMsg).not.toBe(frenchMsg);
      });
    });

    it('should handle auth error translations', () => {
      const engine = getUserSystemI18nEngine();
      
      const authKeys = [
        UserSystemStringKey.Auth_UserNotFound,
        UserSystemStringKey.Auth_AccountLocked,
        UserSystemStringKey.Auth_TokenExpired,
        UserSystemStringKey.Auth_InvalidToken,
        UserSystemStringKey.Auth_InsufficientPermissions,
      ];

      authKeys.forEach(key => {
        const englishMsg = engine.translate(key, undefined, DefaultLanguage.EnglishUS);
        const frenchMsg = engine.translate(key, undefined, DefaultLanguage.French);
        
        expect(englishMsg).toBeTruthy();
        expect(frenchMsg).toBeTruthy();
        expect(englishMsg).not.toBe(frenchMsg);
      });
    });
  });
});