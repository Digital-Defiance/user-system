import { IHasId } from '../has-id';
import { IHasSoftDelete } from '../has-soft-delete';
import { IHasSoftDeleter } from '../has-soft-deleter';
import { IHasTimestampOwners } from '../has-timestamp-owners';
import { IHasTimestamps } from '../has-timestamps';
import { IRoleDTO } from './role';

export interface ITokenRoleDTO
  extends IRoleDTO,
    IHasId<string>,
    IHasTimestamps<string>,
    IHasTimestampOwners<string>,
    IHasSoftDelete<string>,
    IHasSoftDeleter<string> {
  translatedName?: string;
}
