import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import type { JokeResponse } from '../../types/responses/joke'

export const data = new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Replies with a random joke!')

const BASE_URL =
    'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single'

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply() // Defer the reply since the API can be a little slow.
    const response = await fetch(BASE_URL)
    if (!response.ok) {
        await interaction.reply('Failed to fetch a joke. Please try again later.')
        return
    }
    const joke = (await response.json()) as JokeResponse
    const jokeEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Joke')
        .setDescription(joke.joke)
        .setFooter({ text: `Category: ${joke.category}` })
    interaction.editReply({ embeds: [jokeEmbed] })
}
