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
    const { userId, points_count, action } = body

    if (!userId || typeof userId !== 'number') {
        throw createError({
            statusCode: 400,
            statusMessage: 'User ID is required'
        })
    }

    try {
        let updateQuery = 'UPDATE users SET updated_at = CURRENT_TIMESTAMP'
        const params: any[] = []

        // Update points_count if provided
        if (typeof points_count === 'number') {
            updateQuery += ', points_count = ?'
            params.push(points_count)
        }

        // Update action flags if provided
        if (action) {
            switch (action) {
                case 'telegram':
                    updateQuery += ', opened_telegram_link_once = 1'
                    break
                case 'x':
                    updateQuery += ', opened_x_once = 1'
                    break
                case 'game':
                    updateQuery += ', played_og_game_once = 1'
                    break
                default:
                    throw createError({
                        statusCode: 400,
                        statusMessage: 'Invalid action type'
                    })
            }
        }

        updateQuery += ' WHERE id = ?'
        params.push(userId)

        const updateUser = db.prepare(updateQuery)
        const result = updateUser.run(...params)

        if (result.changes === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            })
        }

        // Return updated user data
        const getUser = db.prepare('SELECT * FROM users WHERE id = ?')
        const user = getUser.get(userId) as any

        const formattedUser = {
            id: user.id,
            address: user.address,
            points_count: user.points_count,
            player_best_score: user.player_best_score,
            opened_telegram_link_once: Boolean(user.opened_telegram_link_once),
            opened_x_once: Boolean(user.opened_x_once),
            played_og_game_once: Boolean(user.played_og_game_once)
        }

        return formattedUser
    } catch (error) {
        console.error('Database error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        })
    }
})
