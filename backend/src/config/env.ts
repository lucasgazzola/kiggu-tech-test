// src/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string().url(),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  OPENAI_API_KEY: z.string(),
  AZURE_OPENAI_ENDPOINT: z.string().url(),
});

export const env = envSchema.parse(process.env);
