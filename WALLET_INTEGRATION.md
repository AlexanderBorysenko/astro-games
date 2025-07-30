# Phantom Wallet Integration

This project now includes Phantom wallet authentication for Solana-based user management.

## Features

- **Phantom Wallet Connection**: Users can connect their Phantom wallet to authenticate
- **Persistent Authentication**: User sessions persist across page reloads using localStorage
- **Automatic Session Restoration**: Users remain logged in until they manually disconnect or 7 days pass
- **Automatic User Creation**: New users are automatically created in the SQLite database upon first connection
- **User Persistence**: User data persists across sessions
- **Action Tracking**: Track user actions like opening Telegram, X links, and playing games
- **Points System**: Manage user points_count and rewards

## Prerequisites

Users need to have the Phantom wallet browser extension installed:
- Download from [https://phantom.app/](https://phantom.app/)
- Available for Chrome, Firefox, Safari, and Edge

## How It Works

### 1. Wallet Connection
- Click the "Connect Wallet" button
- If Phantom is not installed, user gets an alert with download instructions
- Phantom wallet popup opens for authentication
- User approves the connection request

### 2. User Management
When a wallet connects:
- System checks if user exists in database by wallet address
- If new user: creates account with default values
- If existing user: retrieves existing data
- User data includes:
  - `id`: Unique identifier
  - `address`: Wallet address
  - `points_count`: User's points_count (default: 0)
  - `opened_telegram_link_once`: Boolean flag (default: false)
  - `opened_x_once`: Boolean flag (default: false)
  - `played_og_game_once`: Boolean flag (default: false)

### 3. Session Persistence & Optimization
- User authentication is saved to localStorage with 7-day expiration
- **Singleton initialization**: Authentication initializes only once per app session
- **Route-safe**: No reinitialization on route changes - only on login/logout/first load
- Sessions automatically restore on page reload without redundant checks
- User data is synchronized with database on session restoration
- Manual logout clears all stored authentication data
- Global state management prevents unnecessary wallet reconnections

### 4. State Management
- User data stored in Pinia store (`userStore`)
- Wallet connection state managed via `useWallet()` composable
- User actions managed via `useUserActions()` composable

## API Endpoints

### POST /api/auth/wallet
Authenticate user with wallet address
```json
{
  "address": "wallet_address_here"
}
```

### PUT /api/user/update
Update user points_count or action flags
```json
{
  "userId": 123,
  "points": 100,  // optional
  "action": "telegram"  // optional: "telegram" | "x" | "game"
}
```

## Composables

### useWallet()
```ts
const { 
  connectWallet, 
  disconnectWallet, 
  connecting, 
  connected,
  initialized,
  initializeWallet
} = useWallet()
```

### useAuth()
```ts
const { 
  loginUser, 
  logoutUser, 
  restoreUserSession,
  updateUser,
  clearStoredAuth
} = useAuth()
```

### useAuthManager()
```ts
const { 
  initialized, 
  initializing, 
  initialize
} = useAuthManager()

// Singleton pattern ensures one-time initialization
// Only runs once per app session, not on route changes
```

### useAuthCheck()
```ts
const { 
  isLoggedIn, 
  user, 
  requireAuth,
  hasCompletedAction,
  canEarnPoints,
  getUserPoints,
  getUserAddress
} = useAuthCheck()

// Examples:
if (requireAuth('Please connect wallet to continue')) {
  // User is authenticated, proceed
}

if (canEarnPoints('telegram')) {
  // User can earn points_count for this action
}
```

### useUserActions()
```ts
const { 
  updateUserPoints, 
  markActionCompleted, 
  addPoints 
} = useUserActions()

// Examples:
await addPoints(50)
await markActionCompleted('telegram')
await updateUserPoints(200)
```

## Performance Optimizations

### Singleton Authentication Manager
- Authentication initializes **only once** per app session
- No reinitialization on route changes or component remounts
- Global state management prevents redundant wallet connections
- Efficient memory usage with shared authentication state

### Smart Session Restoration
- localStorage check happens only during app startup
- Database sync occurs only when necessary (session restore)
- Lazy loading of wallet adapters until actual connection needed
- Automatic cleanup of expired sessions (7-day limit)

### Minimal Re-renders
- Reactive state updates only when authentication status changes
- No unnecessary component re-initializations on navigation
- Efficient state sharing between components via Pinia store

## Database Schema

SQLite table `users`:
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  address TEXT UNIQUE NOT NULL,
  points_count INTEGER DEFAULT 0,
  opened_telegram_link_once BOOLEAN DEFAULT 0,
  opened_x_once BOOLEAN DEFAULT 0,
  played_og_game_once BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Button States

The `AppWalletButton` component shows different states:
- **"Loading..."**: During app initialization and session restoration
- **"Connect Wallet"**: When not connected
- **"Connecting..."**: During connection process
- **"1234...5678"**: Shows truncated wallet address when connected
- Click to disconnect when already connected

## Session Management

### localStorage Keys
- `astro-games-user`: Encrypted user data
- `astro-games-wallet-address`: Wallet address
- `astro-games-auth-token`: Authentication timestamp

### Session Expiration
- Sessions expire after 7 days of inactivity
- Expired sessions are automatically cleared
- Users must reconnect wallet after expiration

### Security Features
- Automatic session validation on app load
- Database synchronization on session restore
- Secure storage of user data
- No private keys stored locally

## Error Handling

- Phantom not installed: Shows alert with download link
- Connection failed: Shows error message
- Database errors: Logged to console, user sees generic error
- Network issues: Automatic retry logic in composables

## Security Notes

- Only wallet address is stored, no private keys
- All transactions require user approval in Phantom
- SQLite database should be secured in production
- Consider rate limiting for API endpoints

## Development

The database file `database.sqlite` is created automatically in the project root on first run.

For production, consider:
- Using a more robust database (PostgreSQL, MySQL)
- Adding proper authentication middleware
- Implementing rate limiting
- Adding database migration system
- Using environment variables for configuration
