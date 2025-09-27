import {
  buildReasonMap,
  I18nEngine,
  Language,
} from '@digitaldefiance/i18n-lib';
import { TypedHandleableError } from '@digitaldefiance/ecies-lib';
import { AccountStatus } from '../enumerations/account-status';
import { UserSystemStringKey } from '../enumerations';

export class AccountStatusError extends TypedHandleableError<typeof AccountStatus, UserSystemStringKey> {
  constructor(
    accountStatus: AccountStatus,
    engine: I18nEngine<UserSystemStringKey, Language, any, any>,
    language?: Language,
    statusCode = 403
  ) {
    super(accountStatus, buildReasonMap<typeof AccountStatus, UserSystemStringKey>(AccountStatus, ['Error', 'AccountStatus']), engine, language, undefined, { statusCode });
    this.name = 'AccountStatusError';
  }
}
