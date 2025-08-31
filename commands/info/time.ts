import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
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
        const formattedTime = new Date(data.dateTime).toLocaleString('en-GB', {
            timeZone: timezone,
            hour12: true,
        })
        await interaction.editReply(`The current time in ${data.timeZone} is ${formattedTime}`)
    } catch (err) {
        console.error('Error fetching time data:', err)
        await interaction.editReply(
            'An error occurred while fetching the time data. Please try again later.'
        )
    }
}
