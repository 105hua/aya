import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import { TodBotWrapper } from '../../libs/wrappers/todbotapi'

export const data = new SlashCommandBuilder()
    .setName('dare')
    .setDescription('Gives you a random dare to complete!')

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const dare = await TodBotWrapper.getQuestion('dare')
    const dareEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Dare')
        .setDescription(dare.question)
    await interaction.editReply({ embeds: [dareEmbed] })
}
