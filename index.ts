import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import { Config } from './libs/utils/configuration'
import fs from 'node:fs'
import path from 'node:path'

// Interface to accomodate for commands collection.
export interface AyaClient extends Client {
    commands: Collection<string, any>
}

// Client setup.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
}) as AyaClient
client.commands = new Collection()

// Commands setup
const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder)
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.ts'))
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file)
        const commandModule = await import(filePath)
        const command = commandModule.default || commandModule
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            )
        }
    }
}

// Events setup
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.ts'))
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const eventModule = await import(filePath)
    const event = eventModule.default || eventModule
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

// Login as bot.
client.login(Config.BOT_TOKEN)
