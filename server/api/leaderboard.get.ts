import Database from 'better-sqlite3'
import { join } from 'path'

interface LeaderboardPlayer {
    id: number
    address: string
    points_count: number
    player_best_score: number
    position: number
}

interface UserPosition {
    position: number
    points_count: number
    player_best_score: number
}

/**
 * GET /api/leaderboard
 * 
 * Retrieves the top 5 players and the current user's position in the leaderboard.
 * 
 * Query Parameters:
 * - walletAddress: The wallet address of the current user
 * 
 * Returns:
 * - topPlayers: Array of top 5 players with their positions
 * - currentUser: Current user's position and stats
 */
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const walletAddress = query.walletAddress as string

        if (!walletAddress) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Wallet address is required'
            })
        }

        // Open database connection
        const dbPath = join(process.cwd(), 'database.sqlite')
        const db = new Database(dbPath)

        // Get top 5 players ordered by points_count
        const topPlayersQuery = db.prepare(`
            SELECT id, address, points_count, player_best_score,
                   ROW_NUMBER() OVER (ORDER BY points_count DESC, player_best_score DESC, id ASC) as position
            FROM users 
            ORDER BY points_count DESC, player_best_score DESC, id ASC
            LIMIT 5
        `)

        const topPlayers = topPlayersQuery.all() as LeaderboardPlayer[]

        // Get current user's position
        const userPositionQuery = db.prepare(`
            WITH ranked_users AS (
                SELECT id, address, points_count, player_best_score,
                       ROW_NUMBER() OVER (ORDER BY points_count DESC, player_best_score DESC, id ASC) as position
                FROM users 
                WHERE points_count > 0
            )
            SELECT position, points_count, player_best_score
            FROM ranked_users 
            WHERE address = ?
        `)

        const userPosition = userPositionQuery.get(walletAddress) as UserPosition | undefined

        // If user is not found in ranked users (no points), set position to last
        let currentUserPosition: UserPosition
        if (!userPosition) {
            // Get total count of users with points_count to determine last position
            const totalUsersQuery = db.prepare(`
                SELECT COUNT(*) as total 
                FROM users 
                WHERE points_count > 0
            `)
            const totalResult = totalUsersQuery.get() as { total: number }

            // Get user's actual data
            const userDataQuery = db.prepare(`
                SELECT points_count, player_best_score 
                FROM users 
                WHERE address = ?
            `)
            const userData = userDataQuery.get(walletAddress) as { points_count: number, player_best_score: number } | undefined

            currentUserPosition = {
                position: totalResult.total + 1,
                points_count: userData?.points_count || 0,
                player_best_score: userData?.player_best_score || 0
            }
        } else {
            currentUserPosition = userPosition
        }

        db.close()

        return {
            success: true,
            topPlayers: topPlayers.map(player => ({
                id: player.id,
                address: player.address,
                points_count: player.points_count,
                player_best_score: player.player_best_score,
                position: player.position
            })),
            currentUser: currentUserPosition
        }

    } catch (error) {
        console.error('Leaderboard error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
