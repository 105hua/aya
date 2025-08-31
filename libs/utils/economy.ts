import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function ensureUserEconomy(userId: string): Promise<void> {
    try {
        await prisma.economy.findUniqueOrThrow({
            where: { userId },
        })
    } catch (err) {
        await prisma.economy.create({
            data: { userId },
        })
    }
}
