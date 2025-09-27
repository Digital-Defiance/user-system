export interface IHasCreator<I> {
  /**
   * The unique identifier for the user who created the object.
   */
  createdBy: I;
}
