import Database from 'better-sqlite3'
import { join } from 'path'

const dbPath = join(process.cwd(), 'database.sqlite')
const db = new Database(dbPath)

export default defineEventHandler(async (event) => {
    if (getMethod(event) !== 'PUT') {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method Not Allowed'
        })
    }

    const body = await readBody(event)
    const { userId, score } = body

    if (!userId || typeof userId !== 'number') {
        throw createError({
            statusCode: 400,
            statusMessage: 'User ID is required'
        })
    }

    if (typeof score !== 'number' || score < 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Valid score is required'
        })
    }

    try {
        // Get current user data
        const getUser = db.prepare('SELECT * FROM users WHERE id = ?')
        const user = getUser.get(userId) as any

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            })
        }

        const previousBestScore = user.player_best_score || 0
        const newBestScore = Math.max(previousBestScore, score)

        // Only update if the new score is actually better
        if (newBestScore > previousBestScore) {
            // Calculate points to add: difference * 0.01
            const scoreDifference = newBestScore - previousBestScore
            const pointsToAdd = scoreDifference * 0.01
            const newPointsTotal = user.points_count + pointsToAdd

            // Update both best score and points
            const updateUser = db.prepare(`
                UPDATE users 
                SET player_best_score = ?, points_count = ?, updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?
            `)

            const result = updateUser.run(newBestScore, newPointsTotal, userId)

            if (result.changes === 0) {
                throw createError({
                    statusCode: 500,
                    statusMessage: 'Failed to update user score'
                })
            }

            // Return updated user data
            const updatedUser = getUser.get(userId) as any

            return {
                id: updatedUser.id,
                address: updatedUser.address,
                points_count: updatedUser.points_count,
                player_best_score: updatedUser.player_best_score,
                opened_telegram_link_once: Boolean(updatedUser.opened_telegram_link_once),
                opened_x_once: Boolean(updatedUser.opened_x_once),
                played_og_game_once: Boolean(updatedUser.played_og_game_once),
                pointsAdded: pointsToAdd,
                scoreImproved: true
            }
        } else {
            // Score didn't improve, just return current user data
            return {
                id: user.id,
                address: user.address,
                points_count: user.points_count,
                player_best_score: user.player_best_score,
                opened_telegram_link_once: Boolean(user.opened_telegram_link_once),
                opened_x_once: Boolean(user.opened_x_once),
                played_og_game_once: Boolean(user.played_og_game_once),
                pointsAdded: 0,
                scoreImproved: false
            }
        }
    } catch (error) {
        console.error('Database error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        })
    }
})
