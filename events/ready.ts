import { Events } from 'discord.js'
import type { AyaClient } from '..'

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client: AyaClient) {
        console.log(`Ready! Logged in as ${client.user?.tag}`)
    },
}
