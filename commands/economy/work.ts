import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { PrismaClient } from '@prisma/client'
import { Config } from '../../libs/utils/configuration'
import { ensureUserEconomy } from '../../libs/utils/economy'

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
    const reward =
        Math.floor(Math.random() * (Config.WORK_MAX - Config.WORK_MIN + 1)) + Config.WORK_MIN
    const job = jobs[Math.floor(Math.random() * jobs.length)]
    const userEconomy = await prisma.economy.findUnique({ where: { userId } })
    if (!userEconomy?.lastWork) {
        await prisma.economy.update({
            where: { userId },
            data: { balance: { increment: reward }, lastWork: new Date() },
        })
        return await interaction.reply(`You worked as a ${job} and earned £${reward}!`)
    }
    const lastDaily = new Date(userEconomy.lastWork)
    const now = new Date()
    const diffHours = Math.abs(now.getTime() - lastDaily.getTime()) / (1000 * 60 * 60)
    if (diffHours >= 12) {
        await prisma.economy.update({
            where: { userId },
            data: { balance: { increment: Config.DAILY_REWARD }, lastDaily: new Date() },
        })
        return await interaction.reply(`You worked as a ${job} and earned £${reward} coins!`)
    }
    return await interaction.reply(
        'You are still tired from your last shift. Please try again later.'
    )
}
