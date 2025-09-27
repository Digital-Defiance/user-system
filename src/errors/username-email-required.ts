import {  I18nEngine, Language } from '@digitaldefiance/i18n-lib';
import { GenericValidationError } from './generic-validation';
import { UserSystemStringKey } from '../enumerations';

export class UsernameOrEmailRequiredError extends GenericValidationError {
  constructor(engine: I18nEngine<UserSystemStringKey, Language, any, any>, language?: Language, statusCode = 422) {
    super(
      engine.translate(
        UserSystemStringKey.Validation_UsernameOrEmailRequired,
        undefined,
        language,
      ),
      {
        statusCode,
      },
    );
    this.name = 'UsernameOrEmailRequiredError';
  }
}
