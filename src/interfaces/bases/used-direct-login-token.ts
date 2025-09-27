import { IHasId } from '../has-id';

export interface IUsedDirectLoginTokenBase<I> extends IHasId<I> {
  userId: I;
  token: string;
}
