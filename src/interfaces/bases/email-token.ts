import { Types } from 'mongoose';
import { EmailTokenType } from '../../enumerations/email-token-type';
import { IHasId } from '../has-id';
import { IHasTimestamps } from '../has-timestamps';

/**
 * Base interface for email token collection documents
 */
export interface IEmailTokenBase<
  I,
  D extends Date | string,
  E extends EmailTokenType | string,
> extends IHasId<I>,
    IHasTimestamps<D> {
  /**
   * The user ID associated with the token
   */
  userId: I;
  /**
   * The type of token
   */
  type: E;
  /**
   * The token value
   */
  token: string;
  /**
   * The email address the token was sent to
   */
  email: string;
  /**
   * The date the token was last sent
   */
  lastSent?: D;
  /**
   * The date the token expires
   */
  expiresAt: D;
}
