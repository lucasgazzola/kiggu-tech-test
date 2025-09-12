import { Redis } from "@upstash/redis";
import { ICacheClient } from "./interfaces/cache.client.interface";

export class RedisCacheClient implements ICacheClient {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  ping(): Promise<string> {
    return this.client.ping();
  }
  get<T>(key: string): Promise<T | null> {
    return this.client.get(key);
  }
  set<T>(key: string, value: T): Promise<T | "OK" | null> {
    return this.client.set(key, value);
  }
  del(key: string): Promise<number> {
    return this.client.del(key);
  }
}
