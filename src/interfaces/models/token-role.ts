import { Types } from 'mongoose';
import { ITokenRole } from '../bases';

/**
 * Front-end Base interface for token role collection documents
 */
export type IFrontendTokenRole = ITokenRole<string, Date>;
/**
 * Back-end Base interface for token role collection documents
 */
export type IBackendTokenRole = ITokenRole<Types.ObjectId, Date>;
