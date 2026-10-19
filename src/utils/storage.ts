import {createAsyncStorage} from '@react-native-async-storage/async-storage';

// Dedicated database; never store passwords or other secrets here.
const database = createAsyncStorage('study-management');

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | {[key: string]: JsonValue};

export const storage = {
  // Returns unknown intentionally: callers must validate persisted data.
  async get(key: string): Promise<unknown> {
    const value = await database.getItem(key);
    return value === null ? null : JSON.parse(value);
  },

  async set(key: string, value: JsonValue): Promise<void> {
    const serialized = JSON.stringify(value);
    if (serialized === undefined) {
      throw new TypeError('Storage value must be JSON serializable');
    }
    await database.setItem(key, serialized);
  },

  async remove(key: string): Promise<void> {
    await database.removeItem(key);
  },
};
