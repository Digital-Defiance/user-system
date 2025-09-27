import { I18nEngine, Language } from '@digitaldefiance/i18n-lib';
import { AccountStatus } from '../enumerations/account-status';
import { AccountStatusError } from './account-status';
import { UserSystemStringKey } from '../enumerations';

export class AccountLockedError extends AccountStatusError {
  constructor(engine: I18nEngine<UserSystemStringKey, Language, any, any>, language?: Language, statusCode = 403) {
    super(AccountStatus.AdminLock, engine, language, statusCode);
    this.name = 'AccountLockedError';
  }
}
