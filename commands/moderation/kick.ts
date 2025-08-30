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
    .setName('kick')
    .setDescription('Kick a user from the server.')
    .addUserOption((option) =>
        option.setName('user').setDescription('The user to kick').setRequired(true)
    )
    .addStringOption((option) =>
        option.setName('reason').setDescription('The reason for the kick').setRequired(false)
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
            type: 'KICK',
            reason: reason,
        },
    })

    if (Config.DEBUG === true) {
        return interaction.editReply(
            `(DEBUG) Kicked user ${user.tag} (${user.id}) for reason: ${reason}`
        )
    }

    try {
        const guildMember = await interaction.guild.members.fetch(user.id)
        await guildMember.kick(reason)
        return interaction.editReply(`Kicked user ${user.tag} (${user.id}) for reason: ${reason}`)
    } catch (error) {
        console.error('Error kicking user:', error)
        return interaction.editReply(`Failed to kick user ${user.tag} (${user.id}).`)
    }
}
