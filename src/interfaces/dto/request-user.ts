import { IRoleDTO } from '../dto/role';

export interface IRequestUserDTO {
  id: string;
  roles: Array<IRoleDTO>;
  username: string;
  email: string;
  timezone: string;
  siteLanguage: string;
  lastLogin?: string;
  emailVerified: boolean;
}
