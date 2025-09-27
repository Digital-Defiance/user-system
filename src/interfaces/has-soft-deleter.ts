
export interface IHasSoftDeleter<I> {
  /**
   * The unique identifier for the user who deleted the object.
   */
  deletedBy?: I;
}
