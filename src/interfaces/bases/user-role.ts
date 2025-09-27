import { IHasId } from '../has-id';
import { IHasSoftDelete } from '../has-soft-delete';
import { IHasSoftDeleter } from '../has-soft-deleter';
import { IHasTimestampOwners } from '../has-timestamp-owners';
import { IHasTimestamps } from '../has-timestamps';

export interface IUserRoleBase<I, D extends Date | string>
  extends IHasId<I>,
    IHasTimestamps<D>,
    IHasTimestampOwners<I>,
    IHasSoftDelete<D>,
    IHasSoftDeleter<I> {
  /**
   * The user ID
   */
  userId: I;
  /**
   * The role ID
   */
  roleId: I;
}
