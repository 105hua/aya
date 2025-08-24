export interface JokeResponse {
    error: boolean
    category: string
    type: string
    joke: string
    flags: {
        nsfw: boolean
        religious: boolean
        political: boolean
        racist: boolean
        sexist: boolean
        explicit: boolean
    }
    id: number
    safe: boolean
    lang: string
}
