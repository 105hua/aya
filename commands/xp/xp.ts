import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const data = new SlashCommandBuilder()
    .setName('xp')
    .setDescription('Check your current experience level and XP')

export async function execute(interaction: ChatInputCommandInteraction) {
    const userId = interaction.user.id
    try {
        const experience = await prisma.experience.findUniqueOrThrow({
            where: { userId: userId },
        })
        const xpEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle(`Experience | ${interaction.user.username}`)
            .setDescription(
                `Level: ${experience.level}\nXP: ${experience.xp} XP\nRequired XP: ${experience.requiredXp} XP`
            )
        await interaction.reply({ embeds: [xpEmbed] })
    } catch (err) {
        await interaction.reply("You don't have any experience yet.")
    }
}
