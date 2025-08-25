import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import { TodBotWrapper } from '../../libs/wrappers/todbot'

export const data = new SlashCommandBuilder()
    .setName('wyr')
    .setDescription("Get a random 'Would You Rather' question.")

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const wyr = await TodBotWrapper.getQuestion('wyr')
    const wyrEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Would You Rather')
        .setDescription(wyr.question)
    await interaction.editReply({ embeds: [wyrEmbed] })
}
