import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { ensureUserEconomy } from '../../libs/utils/economy'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const data = new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your balance')

export async function execute(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id
    await ensureUserEconomy(userId)
    const userEconomy = await prisma.economy.findUnique({
        where: { userId },
    })
    return await interaction.reply(`Your balance is $${userEconomy?.balance.toLocaleString('en')}`)
}
