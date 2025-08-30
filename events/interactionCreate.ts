import { Events, type Interaction, type ChatInputCommandInteraction } from 'discord.js'
import type { AyaClient } from '..'

export default {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return

        const client = interaction.client as AyaClient
        const command = client.commands.get(interaction.commandName)

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`)
            return
        }

        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`)
            console.error(error)
            const payload = {
                content: 'There was an error while executing this command!',
                ephemeral: true,
            }
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(payload)
            } else {
                await interaction.reply(payload)
            }
        }
    },
}
