export interface IHasCreation<D extends Date | string> {
  /**
   * The date the object was created.
   */
  createdAt: D;
}
