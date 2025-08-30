import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'
import { Config } from '../../libs/utils/configuration'
import type { FreeCryptoApiResponse } from '../../types/responses/info_cmds/freecryptoapi'

const BASE_URL = 'https://api.freecryptoapi.com/v1'

export const data = new SlashCommandBuilder()
    .setName('crypto')
    .setDescription('Get information about a cryptocurrency')
    .addStringOption((option) =>
        option
            .setName('symbol')
            .setDescription('The symbol of the cryptocurrency (e.g., BTC, ETH)')
            .setRequired(true)
    )

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()

    const symbol = interaction.options.getString('symbol', true).toUpperCase()
    const response = await fetch(`${BASE_URL}/getData?symbol=${symbol}`, {
        headers: {
            Authorization: `Bearer ${Config.FREE_CRYPTO_API_KEY}`,
        },
    })
    if (!response.ok) {
        return await interaction.editReply(
            `Failed to fetch data for ${symbol}. Please try again later.`
        )
    }

    const data = (await response.json()) as FreeCryptoApiResponse
    if (data.status !== 'success' || data.symbols.length === 0) {
        return await interaction.editReply(`No data found for symbol: ${symbol}`)
    }

    const coinData = data.symbols[0]!
    const coinEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`Crypto Summary: ${coinData.symbol}`)
        .setDescription(
            `Last Price: $${coinData.last} (${coinData.last_btc} BTC)\n` +
                `Lowest: $${coinData.lowest}\nHighest: $${coinData.highest}\n` +
                `Percentage Change: ${coinData.daily_change_percentage}%`
        )
        .setFooter({ text: `Source: ${coinData.source_exchange}` })

    await interaction.editReply({ embeds: [coinEmbed] })
}
