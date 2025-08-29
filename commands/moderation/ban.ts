import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    GuildMember,
    MessageFlags,
} from 'discord.js'
import { ModerationUtils } from '../../libs/utils/moderation'
import { PrismaClient } from '@prisma/client'
import { Config } from '../../libs/utils/configuration'

const prisma = new PrismaClient()

export const data = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server. Duration can be 1 minute to 1000 years.')
    .addUserOption((option) =>
        option.setName('user').setDescription('The user to ban').setRequired(true)
    )
    .addStringOption((option) =>
        option.setName('reason').setDescription('The reason for the ban').setRequired(false)
    )

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({
        flags: MessageFlags.Ephemeral,
    })

    if (!interaction.guild) {
        return interaction.editReply('This command can only be used in a server.')
    }

    const member = interaction.member as GuildMember
    const user = interaction.options.getUser('user', true)
    const reason = interaction.options.getString('reason') || 'No reason provided'

    if (!ModerationUtils.isModerator(member)) {
        return interaction.editReply('You do not have permission to use this command.')
    }

    await prisma.infractions.create({
        data: {
            userId: user.id,
            moderatorId: interaction.user.id,
            type: 'BAN',
            reason: reason,
        },
    })

    if (Config.DEBUG === true) {
        return interaction.editReply(
            `(DEBUG) Banned user ${user.tag} (${user.id}) for reason: ${reason}`
        )
    }

    try {
        await interaction.guild.members.ban(user, { reason: reason })
        return interaction.editReply(`Banned user ${user.tag} (${user.id}) for reason: ${reason}`)
    } catch (error) {
        console.error('Error banning user:', error)
        return interaction.editReply(
            'Failed to ban the user. They might have a higher role than the bot or I lack permissions.'
        )
    }
}
