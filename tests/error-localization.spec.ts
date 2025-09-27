import { DefaultLanguage, I18nEngine } from '@digitaldefiance/i18n-lib';
import { UsernameInUseError } from '../src/errors/username-in-use';
import { getUserSystemI18nEngine, initUserSystemI18nEngine } from '../src/i18n-setup';
import { UserSystemStringKey } from '../src/enumerations';

describe('Error Message Localization', () => {
  beforeEach(() => {
    // Clear any existing instances
    I18nEngine.clearInstances();
    // Initialize user system i18n
    initUserSystemI18nEngine();
  });

  afterEach(() => {
    I18nEngine.clearInstances();
  });

  describe('UsernameInUseError', () => {
    it('should return English message by default', () => {
      const error = new UsernameInUseError(getUserSystemI18nEngine());
      expect(error.message).toBe('Username is already in use');
    });

    it('should return English message when explicitly requested', () => {
      const error = new UsernameInUseError(getUserSystemI18nEngine(), DefaultLanguage.EnglishUS);
      expect(error.message).toBe('Username is already in use');
    });

    it('should return French message when requested', () => {
      const error = new UsernameInUseError(getUserSystemI18nEngine(),DefaultLanguage.French);
      expect(error.message).toBe('Le nom d\'utilisateur est déjà utilisé');
    });

    it('should have correct status code', () => {
      const error = new UsernameInUseError(getUserSystemI18nEngine());
      expect(error.statusCode).toBe(422);
    });

    it('should allow custom status code', () => {
      const error = new UsernameInUseError(getUserSystemI18nEngine(), DefaultLanguage.EnglishUS, 409);
      expect(error.statusCode).toBe(409);
    });

    it('should have correct error name', () => {
      const error = new UsernameInUseError(getUserSystemI18nEngine());
      expect(error.name).toBe('UsernameInUseError');
    });
  });

  describe('I18n Engine Integration', () => {
    it('should translate user system keys correctly', () => {
      const engine = getUserSystemI18nEngine();
      
      const englishMessage = engine.translate(
        'Validation_UsernameInUse' as any,
        undefined,
        DefaultLanguage.EnglishUS
      );
      expect(englishMessage).toBe('Username is already in use');

      const frenchMessage = engine.translate(
        UserSystemStringKey.Validation_UsernameInUse,
        undefined,
        DefaultLanguage.French
      );
      expect(frenchMessage).toBe('Le nom d\'utilisateur est déjà utilisé');
    });

    it('should fallback to English for unsupported languages', () => {
      const engine = getUserSystemI18nEngine();
      
      const spanishMessage = engine.translate(
        UserSystemStringKey.Validation_UsernameInUse,
        undefined,
        'Undefined' as DefaultLanguage
      );
      expect(spanishMessage).toBe('Username is already in use');
    });
  });
});