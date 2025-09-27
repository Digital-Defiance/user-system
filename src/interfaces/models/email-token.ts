import { Types } from 'mongoose';
import { IEmailTokenBase } from '../bases/email-token';

/**
 * Front-End Base interface for email token collection documents
 */
export type IFrontendEmailToken = IEmailTokenBase<string, Date, string>;
