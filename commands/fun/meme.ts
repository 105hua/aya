import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import type { MemeResponse } from '../../types/responses/meme'

export const data = new SlashCommandBuilder().setName('meme').setDescription('Sends a random meme.')

const BASE_URL = 'https://meme-api.com/gimme'

export async function execute(interaction: ChatInputCommandInteraction) {
    const response = await fetch(BASE_URL)
    if (!response.ok) {
        await interaction.reply('Failed to fetch a meme. Please try again later.')
        return
    }
    const meme = (await response.json()) as MemeResponse
    const memeEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(meme.title)
        .setImage(meme.preview[meme.preview.length - 1] as string)
        .setURL(meme.postLink)
        .setFooter({ text: `👍 ${meme.ups} | r/${meme.subreddit} | u/${meme.author}` })
    interaction.reply({ embeds: [memeEmbed] })
}
