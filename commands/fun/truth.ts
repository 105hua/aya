import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import { TodBotWrapper } from '../../libs/wrappers/todbot'

export const data = new SlashCommandBuilder()
    .setName('truth')
    .setDescription('Gives you a truth question to answer!')

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const truth = await TodBotWrapper.getQuestion('truth')
    const truthEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Truth')
        .setDescription(truth.question)
    await interaction.editReply({ embeds: [truthEmbed] })
}
