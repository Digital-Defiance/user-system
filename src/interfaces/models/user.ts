import { Types } from 'mongoose';
import { AccountStatus } from '../../enumerations/account-status';
import { IUserBase } from '../bases/user';

/**
 * Front-end Base interface for user collection documents
 */
export type IFrontendUser<TLanguage extends string> = IUserBase<
  string,
  Date,
  TLanguage,
  AccountStatus
>;
/**
 * Back-end Base interface for user collection documents
 */
export type IBackendUser<TLanguage extends string> = IUserBase<
  Types.ObjectId,
  Date,
  TLanguage,
  AccountStatus
>;
