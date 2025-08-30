import { Events, Message } from 'discord.js'
import { PrismaClient } from '@prisma/client'
import type { TextChannel } from 'discord.js'

const prisma = new PrismaClient()

export default {
    name: Events.MessageCreate,
    async execute(message: Message) {
        if (message.author.bot) return
        const userId = message.author.id
        try {
            const experience = await prisma.experience.findUniqueOrThrow({
                where: { userId: userId },
            })
            const newExperience = experience.xp + 10
            if (newExperience >= experience.requiredXp) {
                const newLevel = experience.level + 1
                const newRequiredXp = Math.floor(experience.requiredXp * 1.5)
                await prisma.experience.update({
                    where: { userId: userId },
                    data: {
                        level: newLevel,
                        xp: newExperience - experience.requiredXp,
                        requiredXp: newRequiredXp,
                    },
                })
                const channel = message.channel as TextChannel
                await channel.send(
                    `<@${userId}> has leveled up to level ${newLevel}! Congratulations! 🎉`
                )
            } else {
                await prisma.experience.update({
                    where: { userId: userId },
                    data: { xp: newExperience },
                })
            }
        } catch {
            await prisma.experience.create({
                data: {
                    userId: userId,
                    xp: 10,
                    level: 1,
                    requiredXp: 100,
                },
            })
        }
    },
}
