import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { TodBotWrapper } from '../../libs/wrappers/todbot'

export const data = new SlashCommandBuilder()
    .setName('paranoia')
    .setDescription('Get a paranoia question.')

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const paranoia = await TodBotWrapper.getQuestion('paranoia')
    await interaction.editReply(paranoia.question)
}
