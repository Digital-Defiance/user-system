import { IHasCreator } from './has-creator';
import { IHasUpdater } from './has-updater';

export interface IHasTimestampOwners<I>
  extends IHasCreator<I>,
    IHasUpdater<I> {}
