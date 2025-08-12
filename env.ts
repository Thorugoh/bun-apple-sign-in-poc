import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url().startsWith('postgresql://'),
  GEMINI_API_KEY: z.string(),
  JWT_SECRET: z.string(),
  APPLE_SIGN_IN_P8: z.string(),
  APPLE_TEAM_ID: z.string(),
  APPLE_CLIENT_ID: z.string(),
  APPLE_SIGN_IN_KEY_ID: z.string(),
  APPLE_SIGN_IN_PUBLIC_KEY: z.string(),
});

export const env = envSchema.parse(process.env);