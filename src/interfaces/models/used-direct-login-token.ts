import { Types } from 'mongoose';
import { IUsedDirectLoginTokenBase } from '../bases/used-direct-login-token';

/**
 * Base interface for front-end used direct login token collection documents
 */
export type IFrontendUsedDirectLoginToken = IUsedDirectLoginTokenBase<string>;
/**
 * Base interface for back-end used direct login token collection documents
 */
export type IBackendUsedDirectLoginToken =
  IUsedDirectLoginTokenBase<Types.ObjectId>;
