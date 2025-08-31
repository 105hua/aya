import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'
import { Config } from '../../libs/utils/configuration'
import { getSystemPrompt } from '../../libs/wrappers/sys_prompts'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: Config.AI_API_KEY,
    ...(Config.AI_BASE_URL && { baseURL: Config.AI_BASE_URL }),
})

export const data = new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search the web using AI.')
    .addStringOption((option) =>
        option.setName('query').setDescription('The search query').setRequired(true)
    )

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const query = interaction.options.getString('query', true)
    try {
        const response = await openai.chat.completions.create({
            model: Config.AI_MODEL + ':online',
            messages: [
                { role: 'system', content: await getSystemPrompt('search') },
                { role: 'user', content: query },
            ],
        })
        const answer = response.choices[0]!.message.content
        if (answer === null) {
            throw new Error('No answer from AI')
        }
        if (answer === '' || answer.length > 2000) {
            return await interaction.editReply('The response is too long or empty.')
        }
        await interaction.editReply(answer)
    } catch (err) {
        console.error(err)
        await interaction.editReply('An error occurred while processing your request.')
    }
}
