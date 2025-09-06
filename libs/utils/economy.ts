import { PrismaClient } from '@prisma/client'
import { Config } from './configuration'

const prisma = new PrismaClient()

export async function ensureUserEconomy(userId: string): Promise<void> {
    await prisma.economy.upsert({
        where: { userId },
        update: {},
        create: {
            userId,
            balance: Config.STARTING_BALANCE,
        },
    })
}
