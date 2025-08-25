import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { TodBotWrapper } from '../../libs/wrappers/todbot'

export const data = new SlashCommandBuilder()
    .setName('dare')
    .setDescription('Gives you a random dare to complete!')

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const dare = await TodBotWrapper.getQuestion('dare')
    await interaction.editReply(dare.question)
}
