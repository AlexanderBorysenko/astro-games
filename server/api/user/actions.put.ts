import Database from 'better-sqlite3'
import { join } from 'path'

export default defineEventHandler(async (event) => {
    try {
        const { action, walletAddress } = await readBody(event)

        if (!action || !walletAddress) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Action ID and wallet address are required'
            })
        }

        // Open database connection
        const dbPath = join(process.cwd(), 'database.sqlite')
        const db = new Database(dbPath)

        // Create user_actions table if it doesn't exist
        db.exec(`
      CREATE TABLE IF NOT EXISTS user_actions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        wallet_address TEXT NOT NULL,
        action_id TEXT NOT NULL,
        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(wallet_address, action_id)
      )
    `)

        // Check if action is already completed
        const existingAction = db.prepare(`
      SELECT * FROM user_actions 
      WHERE wallet_address = ? AND action_id = ?
    `).get(walletAddress, action)

        if (existingAction) {
            db.close()
            return {
                success: false,
                message: 'Action already completed'
            }
        }

        // Insert new action
        const insertAction = db.prepare(`
      INSERT INTO user_actions (wallet_address, action_id)
      VALUES (?, ?)
    `)

        // Get action points
        const actionPoints: Record<string, number> = {
            'telegram': 100,
            'x': 100,
            'game': 50
        }

        const pointsToAdd = actionPoints[action] || 0

        // Start transaction
        const transaction = db.transaction(() => {
            // Insert action
            insertAction.run(walletAddress, action)

            // Update user points
            const updatePoints = db.prepare(`
        UPDATE users 
        SET points_count = points_count + ? 
        WHERE address = ?
      `)
            updatePoints.run(pointsToAdd, walletAddress)
        })

        transaction()

        // Get updated user data
        const userData = db.prepare(`
      SELECT * FROM users WHERE address = ?
    `).get(walletAddress)

        db.close()

        return {
            success: true,
            user: userData,
            pointsEarned: pointsToAdd
        }

    } catch (error) {
        console.error('User action error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
