export interface IHasSoftDelete<D extends Date | string> {
  /**
   * The date the object was deleted.
   */
  deletedAt?: D;
}
