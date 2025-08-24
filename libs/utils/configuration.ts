import 'dotenv/config'
import * as z from 'zod'

const Configuration = z.object({
    BOT_TOKEN: z.string().min(1, 'BOT_TOKEN is required'),
    CLIENT_ID: z.string().min(1, 'CLIENT_ID is required'),
    GUILD_ID: z.string().min(1, 'GUILD_ID is required'),
})

export const Config = Configuration.parse(process.env)
