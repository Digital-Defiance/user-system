export interface IHasUpdates<D extends Date | string> {
  updatedAt: D;
}
