import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import { TodBotWrapper } from '../../libs/wrappers/todbotapi'

export const data = new SlashCommandBuilder()
    .setName('paranoia')
    .setDescription('Get a paranoia question.')

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const paranoia = await TodBotWrapper.getQuestion('paranoia')
    const paranoiaEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Paranoia')
        .setDescription(paranoia.question)
    await interaction.editReply({ embeds: [paranoiaEmbed] })
}
