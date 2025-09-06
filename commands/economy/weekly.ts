import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { PrismaClient } from '@prisma/client'
import { Config } from '../../libs/utils/configuration'
import { ensureUserEconomy } from '../../libs/utils/economy'
import { TimeUtils } from '../../libs/utils/times'

const prisma = new PrismaClient()

export const data = new SlashCommandBuilder()
    .setName('weekly')
    .setDescription('Collect your weekly money.')

export async function execute(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id
    await ensureUserEconomy(userId)

    const now = new Date()
    const lastWeek = new Date(now.getTime() - TimeUtils.days(7))

    const result = await prisma.economy.updateMany({
        where: {
            userId: userId,
            lastWeekly: { lt: lastWeek },
        },
        data: {
            balance: { increment: Config.WEEKLY_REWARD },
            lastWeekly: now,
        },
    })

    if (result.count === 0) {
        return await interaction.reply("You've already collected your weekly money.")
    }
    return await interaction.reply(`You have collected your weekly £${Config.WEEKLY_REWARD}!`)
}
