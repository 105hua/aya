import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Gets information about a server member.')
    .addUserOption((option) =>
        option
            .setName('target')
            .setDescription('The member to get information about')
            .setRequired(true)
    )

export async function execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('target', true)
    const member = await interaction.guild?.members.fetch(user.id)
    if (!member) {
        await interaction.reply({ content: 'Member not found in this server.', ephemeral: true })
        return
    }
    const roles =
        member.roles.cache
            .filter((role) => role.id !== interaction.guild?.id)
            .map((role) => role.toString())
            .join(', ') || 'None'
    const userInfo = `
**Username:** ${user.tag}
**ID:** ${user.id}
**Account Created:** <t:${Math.floor(user.createdTimestamp / 1000)}:F>
**Joined Server:** <t:${Math.floor(member.joinedTimestamp! / 1000)}:F>
`
    const userInfoEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('User Information')
        .setDescription(userInfo)
    await interaction.reply({ embeds: [userInfoEmbed] })
}
