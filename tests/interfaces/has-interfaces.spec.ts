import { IHasId } from '../../src/interfaces/has-id';
import { IHasTimestamps } from '../../src/interfaces/has-timestamps';
import { IHasCreation } from '../../src/interfaces/has-creation';
import { IHasUpdates } from '../../src/interfaces/has-updates';
import { IHasSoftDelete } from '../../src/interfaces/has-soft-delete';

describe('Has* interfaces', () => {
  describe('IHasId', () => {
    it('should accept string id', () => {
      const obj: IHasId<string> = {
        _id: 'test123'
      };
      expect(obj._id).toBe('test123');
    });

    it('should accept number id', () => {
      const obj: IHasId<number> = {
        _id: 42
      };
      expect(obj._id).toBe(42);
    });
  });

  describe('IHasTimestamps', () => {
    it('should accept Date timestamps', () => {
      const now = new Date();
      const obj: IHasTimestamps<Date> = {
        createdAt: now,
        updatedAt: now
      };
      expect(obj.createdAt).toBe(now);
      expect(obj.updatedAt).toBe(now);
    });

    it('should accept string timestamps', () => {
      const obj: IHasTimestamps<string> = {
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z'
      };
      expect(obj.createdAt).toBe('2023-01-01T00:00:00Z');
      expect(obj.updatedAt).toBe('2023-01-02T00:00:00Z');
    });
  });

  describe('IHasCreation', () => {
    it('should work with Date type', () => {
      const now = new Date();
      const obj: IHasCreation<Date> = {
        createdAt: now
      };
      expect(obj.createdAt).toBe(now);
    });
  });

  describe('IHasUpdates', () => {
    it('should work with Date type', () => {
      const now = new Date();
      const obj: IHasUpdates<Date> = {
        updatedAt: now
      };
      expect(obj.updatedAt).toBe(now);
    });
  });

  describe('IHasSoftDelete', () => {
    it('should accept optional deletedAt field', () => {
      const obj1: IHasSoftDelete<Date> = {};
      const obj2: IHasSoftDelete<Date> = {
        deletedAt: new Date()
      };
      
      expect(obj1.deletedAt).toBeUndefined();
      expect(obj2.deletedAt).toBeInstanceOf(Date);
    });
  });
});