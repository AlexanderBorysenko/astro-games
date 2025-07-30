import Database from 'better-sqlite3'
import { join } from 'path'

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

        // Get all completed actions for user
        const completedActions = db.prepare(`
      SELECT action_id, completed_at FROM user_actions 
      WHERE wallet_address = ?
    `).all(walletAddress) as Array<{ action_id: string; completed_at: string }>

        db.close()

        return {
            success: true,
            completedActions: completedActions.map(action => action.action_id),
            actionDetails: completedActions
        }

    } catch (error) {
        console.error('Get user actions error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
