import { Role } from '../../enumerations/role';
import { IHasId } from '../has-id';
import { IHasSoftDelete } from '../has-soft-delete';
import { IHasSoftDeleter } from '../has-soft-deleter';
import { IHasTimestampOwners } from '../has-timestamp-owners';
import { IHasTimestamps } from '../has-timestamps';

export interface IRoleBase<
  I,
  D extends Date | string = Date,
  R extends Role | string = Role,
> extends IHasId<I>,
    IHasTimestamps<D>,
    IHasTimestampOwners<I>,
    IHasSoftDelete<D>,
    IHasSoftDeleter<I> {
  /**
   * The name of the role
   */
  name: R;
  /**
   * Whether the role is an admin
   */
  admin: boolean;
  /**
   * Whether the role is a site member
   * Must not specify admin or system
   */
  member: boolean;
  /**
   * Whether the role is a restricted child account
   * This prevents the account from certain actions
   * Must not specify admin, member,
   */
  child: boolean;
  /**
   * Whether the role is a system account
   */
  system: boolean;
}
