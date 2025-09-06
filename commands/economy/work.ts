import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { PrismaClient } from '@prisma/client'
import { Config } from '../../libs/utils/configuration'
import { ensureUserEconomy } from '../../libs/utils/economy'
import { TimeUtils } from '../../libs/utils/times'

const prisma = new PrismaClient()

const jobs = [
    'Professional Netflix Binger',
    'Duck Herding Specialist',
    'Meme Archivist',
    'Keyboard Smasher',
    'Emoji Translator',
    'Air Guitar Instructor',
    'Professional Queue Waiter',
    'Pizza Quality Assurance Tester',
    'Fortnite Dance Coach',
    'Pet Rock Therapist',
]

export const data = new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work to earn some coins!')

export async function execute(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id
    await ensureUserEconomy(userId)

    const now = new Date()
    const twelveHoursAgo = new Date(now.getTime() - TimeUtils.hours(12))

    const reward =
        Math.floor(Math.random() * (Config.WORK_MAX - Config.WORK_MIN + 1)) + Config.WORK_MIN
    const job = jobs[Math.floor(Math.random() * jobs.length)]

    const result = await prisma.economy.updateMany({
        where: {
            userId,
            OR: [{ lastWork: { lt: twelveHoursAgo } }],
        },
        data: {
            balance: { increment: reward },
            lastWork: now,
        },
    })

    if (result.count === 0) {
        return await interaction.reply(
            'You are still tired from your last shift. Please try again later.'
        )
    }

    return await interaction.reply(`You worked as a **${job}** and earned **£${reward}!`)
}
