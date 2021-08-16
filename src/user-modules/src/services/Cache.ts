import { injectable } from 'inversify';

@injectable()
export class CacheService implements Service {
  private _cache: Map<string, any> = new Map<string, any>();

  public get(key: string): any {
    return this._cache.get(key);
  }

  public set(key: string, value: any): void {
    this._cache.set(key, value);
  }

  public remove(key: string): void {
    this._cache.delete(key);
  }
}
