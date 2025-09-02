import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { PrismaClient } from '@prisma/client'
import { Config } from '../../libs/utils/configuration'
import { ensureUserEconomy } from '../../libs/utils/economy'

const prisma = new PrismaClient()

export const data = new SlashCommandBuilder()
    .setName('weekly')
    .setDescription('Collect your weekly money.')

export async function execute(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id
    await ensureUserEconomy(userId)
    const userEconomy = await prisma.economy.findUnique({ where: { userId } })
    if (!userEconomy?.lastWeekly) {
        await prisma.economy.update({
            where: { userId },
            data: { balance: { increment: Config.WEEKLY_REWARD }, lastWeekly: new Date() },
        })
        return await interaction.reply(
            `You have collected your weekly £${Config.WEEKLY_REWARD.toLocaleString('en')}!`
        )
    }
    const lastWeekly = new Date(userEconomy.lastWeekly)
    const now = new Date()
    const diffDays = Math.abs(now.getTime() - lastWeekly.getTime()) / (1000 * 60 * 60 * 24)
    if (diffDays >= 7) {
        await prisma.economy.update({
            where: { userId },
            data: { balance: { increment: Config.WEEKLY_REWARD }, lastWeekly: new Date() },
        })
        return await interaction.reply(
            `You have collected your weekly £${Config.WEEKLY_REWARD.toLocaleString('en')}!`
        )
    }
    return await interaction.reply(
        'You have already collected your weekly coins. Please try again later.'
    )
}
