import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string().url(),
  URL_SERVER: z.string().url().default("http://localhost"),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  OPENAI_API_KEY: z.string(),
  AZURE_OPENAI_ENDPOINT: z.string().url(),
});

export const env = envSchema.parse(process.env);
