import { EventController } from "../controllers/event.controller";
import { EventService } from "../services/event.service";
import { EventPrismaRepository } from "../repositories/prisma/event-prisma.repository";
// import { OpenAIAIAdapter } from "../adapters/openai.ai.adapter";
import { MockAIAdapter } from "../adapters/mock.ai.adapter";
import { WatchlistTermPrismaRepository } from "../repositories/prisma/watchlistTerm-prisma.repository";
import { EventMatchPrismaRepository } from "../repositories/prisma/eventMatch-prisma.repository";
import { CacheEventService } from "../services/cacheEvent.service";
import { RedisCacheAdapter } from "../adapters/redis.cache.adapter";
import { RedisCacheClient } from "../clients/redis.cache.client";

const redisClient = new RedisCacheClient();

// const openAiAdapter = new OpenAIAIAdapter();
const mockAiAdapter = new MockAIAdapter();
const redisCacheAdapter = new RedisCacheAdapter(redisClient);

const eventRepository = new EventPrismaRepository();

const cacheEventService = new CacheEventService(redisCacheAdapter);

const termRepository = new WatchlistTermPrismaRepository();
const matchRepository = new EventMatchPrismaRepository();

const eventService = new EventService(
  eventRepository,
  termRepository,
  matchRepository,
  mockAiAdapter,
  cacheEventService
);
const eventController = new EventController(eventService);

export { eventController };
