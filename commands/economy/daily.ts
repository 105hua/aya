import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { PrismaClient } from '@prisma/client'
import { Config } from '../../libs/utils/configuration'
import { ensureUserEconomy } from '../../libs/utils/economy'
import { TimeUtils } from '../../libs/utils/times'

const prisma = new PrismaClient()

export const data = new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Collect your daily money.')

export async function execute(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id
    await ensureUserEconomy(userId)

    const now = new Date()
    const yesterday = new Date(now.getTime() - TimeUtils.days(1))

    const result = await prisma.economy.updateMany({
        where: {
            userId: userId,
            lastDaily: { lt: yesterday },
        },
        data: {
            balance: { increment: Config.DAILY_REWARD },
            lastDaily: now,
        },
    })

    if (result.count === 0) {
        return await interaction.reply("You've already collected your daily money.")
    }
    return await interaction.reply(`You have collected your daily £${Config.DAILY_REWARD}!`)
}
