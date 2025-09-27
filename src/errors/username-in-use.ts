import { I18nEngine, Language } from '@digitaldefiance/i18n-lib';
import { UserSystemStringKey } from '../enumerations';
import { HandleableError } from '@digitaldefiance/ecies-lib';

export class UsernameInUseError extends HandleableError {
  constructor(engine: I18nEngine<UserSystemStringKey, Language, any, any>, language?: Language, statusCode = 422) {
    super(
      engine.translate(
        UserSystemStringKey.Validation_UsernameInUse,
        undefined,
        language,
      ),
      {
        statusCode,
      },
    );
    this.name = 'UsernameInUseError';
  }
}
