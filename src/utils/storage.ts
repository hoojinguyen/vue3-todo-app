import { isObject } from "./object";
type StorageType = "localStorage" | "sessionStorage";

export class Storage<T = unknown> {
  private readonly key: string;
  private readonly storageType: StorageType;

  constructor(key: string, storageType: StorageType = "localStorage") {
    this.key = key;
    this.storageType = storageType;
  }

  getJSON(): T | null {
    try {
      const value = window[this.storageType].getItem(this.key) ?? "";
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  get(): any {
    const value = window[this.storageType].getItem(this.key) ?? "";
    return value ? value : null;
  }

  set(value: T): void {
    const strValue = isObject(value) ? JSON.stringify(value) : value;
    window[this.storageType].setItem(this.key, strValue as string);
  }

  remove(): void {
    window[this.storageType].removeItem(this.key);
  }
}
