import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { TodBotWrapper } from '../../libs/wrappers/todbot'

export const data = new SlashCommandBuilder()
    .setName('wyr')
    .setDescription("Get a random 'Would You Rather' question.")

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const question = await TodBotWrapper.getQuestion('wyr')
    await interaction.editReply(question.question)
}
