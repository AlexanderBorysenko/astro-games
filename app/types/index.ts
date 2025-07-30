export interface User {
    id: number
    address: string
    points_count: number // This already supports decimals since it's number type
    player_best_score: number
    opened_telegram_link_once: boolean
    opened_x_once: boolean
    played_og_game_once: boolean
}

export interface WalletConnection {
    connected: boolean
    connecting: boolean
    address?: string
}
