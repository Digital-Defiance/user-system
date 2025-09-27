import { IHasId } from '../has-id';

/**
 * Represents a mnemonic hash being stored to check for uniqueness
 */
export interface IMnemonicBase<I> extends IHasId<I> {
  /**
   * A non-reversible HMAC of the mnemonic, used for uniqueness checks.
   */
  hmac: string;
}
