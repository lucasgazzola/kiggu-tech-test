import { RedisCacheAdapter } from "../adapters/redis.cache.adapter";
import { HealthController } from "../controllers/health.controller";
import { HealthService } from "../services/health.service";

import { RedisCacheClient } from "../clients/redis.cache.client";

const redisCacheClient = new RedisCacheClient();

const redisCacheAdapter = new RedisCacheAdapter(redisCacheClient);

export const healthController = new HealthController(
  new HealthService(redisCacheAdapter)
);
