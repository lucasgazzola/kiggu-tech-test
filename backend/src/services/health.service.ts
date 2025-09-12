import os from "os";
import { dbClient } from "../config/db";
import { IHealthService } from "./interfaces/health.service.interface";
import { ICacheAdapter } from "../adapters/interfaces/cache.adapter.interface";

export class HealthService implements IHealthService {
  constructor(private cacheAdapter: ICacheAdapter) {}

  async checkDatabase() {
    try {
      await dbClient.$queryRaw`SELECT 1`;
      return { status: "ok" };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { status: "error", error: errorMsg };
    }
  }

  async checkCache() {
    try {
      await this.cacheAdapter.ping();
      return { status: "ok" };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return { status: "error", error: errorMsg };
    }
  }

  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage().rss,
      hostname: os.hostname(),
    };
  }

  async getFullHealth() {
    const db = await this.checkDatabase();
    const cache = await (this.cacheAdapter
      ? this.checkCache.call({ cacheAdapter: this.cacheAdapter })
      : this.checkCache());
    return {
      ...this.getHealth(),
      dependencies: {
        database: db.status,
        cache: cache.status,
        databaseError: db.error,
        cacheError: cache.error,
      },
    };
  }
}
