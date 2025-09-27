import { IRoleBase } from './role';

export interface ITokenRole<
  I,
  D extends Date | string = Date,
> extends IRoleBase<I, D> {
  /**
   * The translated name of the role
   */
  translatedName: string;
}
