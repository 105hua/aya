import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Get information about the server')

export async function execute(interaction: ChatInputCommandInteraction) {
    const { guild } = interaction

    if (!guild) {
        return interaction.reply('This command can only be used in a server.')
    }

    const owner = await guild.fetchOwner()
    const memberCount = guild.memberCount
    const createdAt = guild.createdAt.toDateString()
    const roles = guild.roles.cache.size
    const channels = guild.channels.cache.size
    const serverInfo = `
    **Server Name:** ${guild.name}
    **Server ID:** ${guild.id}
    **Owner:** ${owner.user.tag}
    **Member Count:** ${memberCount}
    **Created At:** ${createdAt}
    **Number of Roles:** ${roles}
    **Number of Channels:** ${channels}
    `
    const serverInfoEmbed = new EmbedBuilder()
        .setTitle('Server Information')
        .setDescription(serverInfo)
        .setColor(0x0099ff)
        .setTimestamp()
    await interaction.reply({ embeds: [serverInfoEmbed] })
}
