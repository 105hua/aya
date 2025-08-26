import { fetch } from 'bun'
import type { TodBotAPIResponse } from '../../types/responses/wrappers/todbot'

export class TodBotWrapper {
    public static async getQuestion(
        type: 'truth' | 'dare' | 'wyr' | 'nhie' | 'paranoia'
    ): Promise<TodBotAPIResponse> {
        const response = await fetch(`https://api.truthordarebot.xyz/v1/${type}`)
        if (!response.ok) {
            throw new Error(`Error fetching ${type} question: ${response.statusText}`)
        }
        const data = (await response.json()) as TodBotAPIResponse
        return data
    }
}
