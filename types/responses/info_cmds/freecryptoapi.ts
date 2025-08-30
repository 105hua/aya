export interface FreeCryptoApiResponse {
    status: string
    symbols: Array<{
        symbol: string
        last: string
        last_btc: string
        lowest: string
        highest: string
        date: string
        daily_change_percentage: string
        source_exchange: string
    }>
}
