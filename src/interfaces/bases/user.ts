import { AccountStatus } from '../../enumerations/account-status';
import { IBackupCode } from '../backup-code';
import { IHasId } from '../has-id';
import { IHasSoftDelete } from '../has-soft-delete';
import { IHasSoftDeleter } from '../has-soft-deleter';
import { IHasTimestampOwners } from '../has-timestamp-owners';
import { IHasTimestamps } from '../has-timestamps';

/**
 * Base interface for user collection documents
 */
export interface IUserBase<
  I,
  D extends Date | string,
  S extends string,
  A extends AccountStatus | string,
> extends IHasId<I>,
    IHasTimestamps<D>,
    IHasTimestampOwners<I>,
    IHasSoftDelete<D>,
    IHasSoftDeleter<I> {
  /**
   * The username of the user
   */
  username: string;
  /**
   * The email address of the user
   */
  email: string;
  /**
   * The public key for the user
   */
  publicKey: string;
  /**
   * The timezone of the user
   */
  timezone: string;
  /**
   * The language of the site for the user
   */
  siteLanguage: S;
  /**
   * The date the user last logged in
   */
  lastLogin?: D;
  /**
   * Whether the user has verified their email address
   */
  emailVerified: boolean;
  /**
   * The status of the user's account, eg 'AdminLock'
   */
  accountStatus: A;
  /**
   * Reference to the mnemonic document
   */
  mnemonicId?: I;
  /**
   * Whether the user has enabled direct challenge
   */
  directChallenge: boolean;
  /**
   * Password-wrapped ECIES private key
   */
  passwordWrappedPrivateKey?: {
    salt: string;
    iv: string;
    authTag: string;
    ciphertext: string;
    iterations: number;
  };
  /**
   * Array of backup codes to recover mnemonic/private key
   */
  backupCodes: Array<IBackupCode>;
  /**
   * Copy of the mnemonic encrypted with the user's public key
   */
  mnemonicRecovery: string;
}
