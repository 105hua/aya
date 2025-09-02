import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { ensureUserEconomy } from '../../libs/utils/economy'
import { PrismaClient } from '@prisma/client'
import { Config } from '../../libs/utils/configuration'

const prisma = new PrismaClient()

const CRIME_SUCCESS_OUTCOMES = [
    'You successfully robbed a bank and got away with ',
    "You hacked into a corporation's database and stole ",
    'You pickpocketed a wealthy tourist and found ',
    'You sold some questionable goods and made ',
    'You found a hidden stash of money and took ',
    'You completed a daring heist and walked away with ',
    'You successfully extorted a business and received ',
    'You pulled off a successful con and gained ',
]

const CRIME_FAILURE_OUTCOMES = [
    'You got caught trying to rob a bank and lost ',
    'You were traced while hacking and fined ',
    'You were caught pickpocketing and had to pay ',
    'Your questionable goods were confiscated, losing you ',
    'You were caught with the hidden stash and had to give up ',
    'Your heist was foiled, and you lost ',
    'You were arrested for extortion and had to pay ',
    'Your con was uncovered, and you lost ',
]

export const data = new SlashCommandBuilder()
    .setName('crime')
    .setDescription('Commit a crime to earn money (or lose it!)')

export async function execute(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id
    await ensureUserEconomy(userId)
    const successOrFail = Math.random() < 0.5 ? true : false
    const amount =
        Math.floor(Math.random() * (Config.CRIME_MAX - Config.CRIME_MIN + 1)) + Config.CRIME_MIN

    if (successOrFail) {
        await prisma.economy.update({
            where: { userId },
            data: {
                balance: {
                    increment: amount,
                },
            },
        })
        const outcome =
            CRIME_SUCCESS_OUTCOMES[Math.floor(Math.random() * CRIME_SUCCESS_OUTCOMES.length)]
        await interaction.reply(`${outcome}$${amount}!`)
    } else {
        await prisma.economy.update({
            where: { userId },
            data: {
                balance: {
                    decrement: amount,
                },
            },
        })
        const outcome =
            CRIME_FAILURE_OUTCOMES[Math.floor(Math.random() * CRIME_FAILURE_OUTCOMES.length)]
        await interaction.reply(`${outcome}$${amount}!`)
    }
}
