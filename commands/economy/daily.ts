import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { PrismaClient } from '@prisma/client'
import { ensureUserEconomy } from '../../libs/utils/economy'

const prisma = new PrismaClient()

export const data = new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Collect your daily money.')

export async function execute(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id
    await ensureUserEconomy(userId)
    const userEconomy = await prisma.economy.findUnique({ where: { userId } })
    if (!userEconomy?.lastDaily) {
        await prisma.economy.update({
            where: { userId },
            data: { balance: { increment: 100 }, lastDaily: new Date() },
        })
        return await interaction.reply('You have collected your daily 100 coins!')
    }
    const lastDaily = new Date(userEconomy.lastDaily)
    const now = new Date()
    const diffDays = Math.abs(now.getTime() - lastDaily.getTime()) / (1000 * 60 * 60)
    if (diffDays >= 1) {
        await prisma.economy.update({
            where: { userId },
            data: { balance: { increment: 100 }, lastDaily: new Date() },
        })
        return await interaction.reply('You have collected your daily 100 coins!')
    }
    return await interaction.reply(
        'You have already collected your daily coins. Please try again later.'
    )
}
