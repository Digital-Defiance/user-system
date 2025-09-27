import { HandleableError } from '@digitaldefiance/ecies-lib';
import {
  I18nEngine,
  Language,
} from '@digitaldefiance/i18n-lib';
import { UserSystemStringKey } from '../enumerations';

export class UserNotFoundError extends HandleableError {
  constructor(engine: I18nEngine<UserSystemStringKey, Language, any, any>, language?: Language, statusCode = 404) {
    super(
      engine.translate(
        UserSystemStringKey.Auth_UserNotFound,
        undefined,
        language,
      ),
      {
        statusCode,
      },
    );
    this.name = 'UserNotFoundError';
  }
}
