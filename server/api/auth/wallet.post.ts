import Database from 'better-sqlite3'
import { join } from 'path'
import { migrateDatabaseSchema } from '../../utils/migrate'

interface User {
    id: number
    address: string
    points_count: number // Changed from integer to support decimal values
    player_best_score: number
    opened_telegram_link_once: boolean | number
    opened_x_once: boolean | number
    played_og_game_once: boolean | number
}

// Initialize database
const dbPath = join(process.cwd(), 'database.sqlite')

// Run migration to ensure correct schema
migrateDatabaseSchema()

const db = new Database(dbPath)

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address TEXT UNIQUE NOT NULL,
    points_count REAL DEFAULT 0,
    player_best_score INTEGER DEFAULT 0,
    opened_telegram_link_once BOOLEAN DEFAULT 0,
    opened_x_once BOOLEAN DEFAULT 0,
    played_og_game_once BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

export default defineEventHandler(async (event) => {
    if (getMethod(event) !== 'POST') {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method Not Allowed'
        })
    }

    const body = await readBody(event)
    const { address } = body

    if (!address || typeof address !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Wallet address is required'
        })
    }

    try {
        // Check if user exists
        const selectUser = db.prepare('SELECT * FROM users WHERE address = ?')
        let user = selectUser.get(address) as User | undefined

        if (!user) {
            // Create new user
            const insertUser = db.prepare(`
        INSERT INTO users (address, points_count, opened_telegram_link_once, opened_x_once, played_og_game_once)
        VALUES (?, 0, 0, 0, 0)
      `)

            const result = insertUser.run(address)
            const userId = result.lastInsertRowid

            // Get the newly created user
            const getNewUser = db.prepare('SELECT * FROM users WHERE id = ?')
            user = getNewUser.get(userId) as User
        } else {
            // Update last access time
            const updateUser = db.prepare('UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?')
            updateUser.run(user.id)
        }

        // Convert boolean fields from SQLite (0/1) to JavaScript booleans
        const formattedUser: User = {
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
