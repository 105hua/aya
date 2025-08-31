import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import type { TimezoneResponse } from '../../types/responses/info_cmds/timezone'

const API_URL = 'https://timeapi.io'

export const data = new SlashCommandBuilder()
    .setName('time')
    .setDescription('Get the current time in a specified timezone')
    .addStringOption((option) =>
        option
            .setName('timezone')
            .setDescription("The timezone to get the current time for (e.g., 'America/New_York')")
            .setRequired(true)
    )

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const timezone = interaction.options.getString('timezone', true)
    try {
        const response = await fetch(
            `${API_URL}/api/time/current/zone?timeZone=${encodeURIComponent(timezone)}`
        )
        if (!response.ok) {
            return await interaction.editReply(
                `Error: Unable to fetch time for timezone '${timezone}'. Please ensure the timezone is valid.`
            )
        }
        const data = (await response.json()) as TimezoneResponse
        const dateTime = new Date(data.dateTime)

        const formattedTime = dateTime.toLocaleString('en-GB', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        })

        const formattedDate = dateTime.toLocaleString('en-GB', {
            timeZone: timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })

        const timeEmbed = new EmbedBuilder()
            .setTitle(`Current Time in ${data.timeZone}`)
            .setDescription(`**Date:** ${formattedDate}\n**Time:** ${formattedTime}`)

        await interaction.editReply({ embeds: [timeEmbed] })
    } catch (err) {
        console.error('Error fetching time data:', err)
        await interaction.editReply(
            'An error occurred while fetching the time data. Please try again later.'
        )
    }
}
