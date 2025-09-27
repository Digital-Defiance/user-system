import { DefaultLanguage, I18nEngine } from '@digitaldefiance/i18n-lib';
import { HandleableError } from '@digitaldefiance/ecies-lib';
import { UserSystemStringKey } from '../src/enumerations';
import { getUserSystemI18nEngine } from '../src/i18n-setup';

// Mock additional error classes for testing
class EmailInUseError extends HandleableError {
  constructor(language?: DefaultLanguage, statusCode = 422) {
    const engine = getUserSystemI18nEngine();
    super(
      engine.translate(
        UserSystemStringKey.Validation_EmailInUse as any,
        undefined,
        language,
      ),
      { statusCode }
    );
    this.name = 'EmailInUseError';
  }
}

class InvalidCredentialsError extends HandleableError {
  constructor(language?: DefaultLanguage, statusCode = 401) {
    const engine = getUserSystemI18nEngine();
    super(
      engine.translate(
        UserSystemStringKey.Validation_InvalidCredentials as any,
        undefined,
        language,
      ),
      { statusCode }
    );
    this.name = 'InvalidCredentialsError';
  }
}

describe('Multiple Error Types Localization', () => {
  beforeEach(() => {
    I18nEngine.clearInstances();
  });

  afterEach(() => {
    I18nEngine.clearInstances();
  });

  describe('Error Message Consistency', () => {
    it('should provide consistent localization across different error types', () => {
      const emailError = new EmailInUseError(DefaultLanguage.French);
      const credentialsError = new InvalidCredentialsError(DefaultLanguage.French);
      
      expect(emailError.message).toBe('L\'adresse e-mail est déjà utilisée');
      expect(credentialsError.message).toBe('Nom d\'utilisateur ou mot de passe invalide');
    });

    it('should handle multiple languages for same error type', () => {
      const englishError = new EmailInUseError(DefaultLanguage.EnglishUS);
      const frenchError = new EmailInUseError(DefaultLanguage.French);
      
      expect(englishError.message).toBe('Email address is already in use');
      expect(frenchError.message).toBe('L\'adresse e-mail est déjà utilisée');
    });

    it('should maintain error properties across languages', () => {
      const englishError = new InvalidCredentialsError(DefaultLanguage.EnglishUS);
      const frenchError = new InvalidCredentialsError(DefaultLanguage.French);
      
      expect(englishError.statusCode).toBe(frenchError.statusCode);
      expect(englishError.name).toBe(frenchError.name);
      expect(englishError.name).toBe('InvalidCredentialsError');
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English for unsupported languages', () => {
      const undefinedError = new EmailInUseError('Undefined' as DefaultLanguage);
      const englishError = new EmailInUseError(DefaultLanguage.EnglishUS);
      
      expect(undefinedError.message).toBe(englishError.message);
    });

    it('should handle undefined language parameter', () => {
      const error = new EmailInUseError();
      expect(error.message).toBe('Email address is already in use');
    });
  });
});