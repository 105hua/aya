import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flips a coin and returns heads or tails.')

export async function execute(interaction: ChatInputCommandInteraction) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails'
    const responseEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Coin Flip')
        .setDescription(`You flipped: **${result}**`)
    await interaction.reply({ embeds: [responseEmbed] })
}
