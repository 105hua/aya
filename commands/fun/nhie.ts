import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import { TodBotWrapper } from '../../libs/wrappers/todbotapi'

export const data = new SlashCommandBuilder()
    .setName('nhie')
    .setDescription('Get a random "Never have I ever" question.')

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const nhie = await TodBotWrapper.getQuestion('nhie')
    const nhieEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Never Have I Ever')
        .setDescription(nhie.question)
    await interaction.editReply({ embeds: [nhieEmbed] })
}
