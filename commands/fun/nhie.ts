import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { TodBotWrapper } from '../../libs/wrappers/todbot'

export const data = new SlashCommandBuilder()
    .setName('nhie')
    .setDescription('Get a random "Never have I ever" question.')

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const nhie = await TodBotWrapper.getQuestion('nhie')
    await interaction.editReply(nhie.question)
}
