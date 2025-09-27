import { Types } from 'mongoose';
import { IUserRoleBase } from '../bases/user-role';

/**
 * Front-end Base interface for user role collection documents
 */
export type IFrontendUserRole = IUserRoleBase<string, Date>;
/**
 * Back-end Base interface for user role collection documents
 */
export type IBackendUserRole = IUserRoleBase<Types.ObjectId, Date>;
