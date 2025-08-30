import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'

export const data = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!')

export async function execute(interaction: ChatInputCommandInteraction) {
    const ping = Math.round(interaction.client.ws.ping)
    const pingEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Pong! 🏓')
        .setDescription(`Bot latency: **${ping}ms**`)
        .setTimestamp()
    await interaction.reply({ embeds: [pingEmbed] })
}
