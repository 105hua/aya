import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import { Config } from './utils/configuration'
import fs from 'node:fs'
import path from 'node:path'

// Interface to accomodate for commands collection.
interface AyaClient extends Client {
    commands: Collection<string, any>
}

// Client setup.
const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as AyaClient
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

// Event for when the bot is ready.
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
})

// Event for created interactions.
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return
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
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            })
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            })
        }
    }
})

// Login as bot.
client.login(Config.BOT_TOKEN)
