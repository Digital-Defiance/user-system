import { IBackupCodeConstants } from './interfaces';
import { IConstants } from './interfaces/constants';

export const BACKUP_CODES: IBackupCodeConstants = {
  /**
   * How many backup codes to generate for users
   */
  Count: 10 as const,
  NormalizedHexRegex: /^[a-z0-9]{32}$/, // exactly 32 lowercase alphanumeric chars
  DisplayRegex: /^([a-z0-9]{4}-){7}[a-z0-9]{4}$/, // xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx
} as const;

export const Constants: IConstants = {
  BACKUP_CODES,
};
