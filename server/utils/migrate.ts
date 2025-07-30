import Database from 'better-sqlite3'
import { join } from 'path'

/**
 * Migration utility to update the database schema
 * This handles the migration from INTEGER to REAL for points_count column
 */
export const migrateDatabaseSchema = () => {
    const dbPath = join(process.cwd(), 'database.sqlite')
    const db = new Database(dbPath)

    try {
        // Check if migration is needed by examining the table schema
        const tableInfo = db.prepare("PRAGMA table_info(users)").all() as Array<{
            cid: number
            name: string
            type: string
            notnull: number
            dflt_value: any
            pk: number
        }>

        const pointsColumnInfo = tableInfo.find(col => col.name === 'points_count')

        if (pointsColumnInfo && pointsColumnInfo.type === 'INTEGER') {
            console.log('Migrating points_count column from INTEGER to REAL...')

            // SQLite doesn't support ALTER COLUMN, so we need to:
            // 1. Create new table with correct schema
            // 2. Copy data
            // 3. Drop old table
            // 4. Rename new table

            const transaction = db.transaction(() => {
                // Create new table with correct schema
                db.exec(`
                    CREATE TABLE users_new (
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

                // Copy data from old table to new table
                db.exec(`
                    INSERT INTO users_new 
                    SELECT * FROM users
                `)

                // Drop old table
                db.exec(`DROP TABLE users`)

                // Rename new table
                db.exec(`ALTER TABLE users_new RENAME TO users`)
            })

            transaction()
            console.log('Migration completed successfully!')
        } else if (pointsColumnInfo && pointsColumnInfo.type === 'REAL') {
            console.log('Database schema is already up to date.')
        } else {
            console.log('Creating users table with correct schema...')
            // Table doesn't exist, create it with correct schema
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
        }
    } catch (error) {
        console.error('Migration error:', error)
        throw error
    } finally {
        db.close()
    }
}
