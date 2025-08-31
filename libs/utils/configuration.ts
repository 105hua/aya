import 'dotenv/config'
import * as z from 'zod'

const Configuration = z.object({
    BOT_TOKEN: z.string().min(1, 'BOT_TOKEN is required'),
    CLIENT_ID: z.string().min(1, 'CLIENT_ID is required'),
    GUILD_ID: z.string().min(1, 'GUILD_ID is required'),
    OWNER_MEMBER_ID: z.string().min(1, 'OWNER_MEMBER_ID is required'),
    MODERATOR_ROLE_ID: z.string().min(1, 'MODERATOR_ROLE_ID is required'),
    NASA_API_KEY: z.string().min(1, 'NASA_API_KEY is required'),
    FREE_CRYPTO_API_KEY: z.string().min(1, 'FREE_CRYPTO_API_KEY is required'),
    AI_BASE_URL: z.url('AI_BASE_URL must be a valid URL').optional(),
    AI_API_KEY: z.string().min(1, 'AI_API_KEY is required').startsWith('sk'),
    AI_MODEL: z.string().min(1, 'AI_MODEL is required'),
    STARTING_BALANCE: z.string().pipe(z.coerce.number()).default(1000),
    DAILY_REWARD: z.string().pipe(z.coerce.number()).default(500),
    WEEKLY_REWARD: z.string().pipe(z.coerce.number()).default(2000),
    MONTHLY_REWARD: z.string().pipe(z.coerce.number()).default(5000),
    WORK_MIN: z.string().pipe(z.coerce.number()).default(100),
    WORK_MAX: z.string().pipe(z.coerce.number()).default(500),
    DEBUG: z
        .enum(['true', 'false'])
        .default('false')
        .transform((v) => v === 'true'),
})

export const Config = Configuration.parse(process.env)
