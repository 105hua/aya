import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'

const CHOICES = {
    Rock: 'Scissors',
    Paper: 'Rock',
    Scissors: 'Paper',
}

export const data = new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Play Rock, Paper Scissors with the bot.')
    .addStringOption((option) =>
        option
            .setName('choice')
            .setDescription('Your choice: Rock, Paper, or Scissors')
            .setRequired(true)
            .addChoices(
                { name: 'Rock', value: 'Rock' },
                { name: 'Paper', value: 'Paper' },
                { name: 'Scissors', value: 'Scissors' }
            )
    )

export async function execute(interaction: ChatInputCommandInteraction) {
    const userChoice = interaction.options.getString('choice', true)
    const botChoice = Object.keys(CHOICES)[Math.floor(Math.random() * Object.keys(CHOICES).length)]
    if (userChoice === botChoice) {
        await interaction.reply(`It's a tie! We both chose ${userChoice}.`)
    } else if (CHOICES[userChoice as keyof typeof CHOICES] === botChoice) {
        await interaction.reply(`You win! Your ${userChoice} beats my ${botChoice}.`)
    } else {
        await interaction.reply(`I win! My ${botChoice} beats your ${userChoice}.`)
    }
}
