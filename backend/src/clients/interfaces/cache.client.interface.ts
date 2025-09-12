export interface ICacheClient {
  ping(): Promise<string>;
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<T | "OK" | null>;
  del(key: string): Promise<number>;
}
