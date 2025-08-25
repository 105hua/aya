import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls a dice with the specified number of sides.')
    .addIntegerOption((option) =>
        option
            .setName('sides')
            .setDescription('The number of sides on the dice (default is 6).')
            .setMinValue(2)
            .setMaxValue(100)
            .setRequired(true)
    )

export async function execute(interaction: ChatInputCommandInteraction) {
    const sides = interaction.options.getInteger('sides', true)
    const roll = Math.floor(Math.random() * sides) + 1
    const rollEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('Dice Roll')
        .setDescription(`You rolled a ${roll} on a ${sides}-sided dice.`)
    await interaction.reply({ embeds: [rollEmbed] })
}
