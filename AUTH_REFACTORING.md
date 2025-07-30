# Auth System Refactoring Summary

## Overview
The authentication system has been completely refactored and moved into Pinia stores for better state management, reduced complexity, and improved maintainability.

## Changes Made

### 1. Enhanced User Store (`app/stores/userStore.ts`)
- **Added new state properties:**
  - `walletAddress`: Stores the connected wallet address
  - `isInitialized`: Tracks if auth has been initialized
  - `isInitializing`: Tracks if auth is currently initializing

- **Moved all auth logic into the store:**
  - `initialize()`: Main initialization function (replaces AuthManager)
  - `restoreUserSession()`: Restores user data from localStorage
  - `login()`: Logs in user and saves to storage
  - `logout()`: Logs out user and clears storage
  - `updateUser()`: Updates user data and saves to storage
  - Storage management functions (localStorage operations)

- **Enhanced existing methods:**
  - `updateUserPoints()`, `updateUserAction()`, `updateUserBestScore()` now also update localStorage

### 2. New Wallet Store (`app/stores/walletStore.ts`)
- **Moved wallet functionality from composable to store:**
  - `connectWallet()`: Connects to Phantom wallet and authenticates user
  - `disconnectWallet()`: Disconnects wallet and logs out user
  - `checkPhantomAvailability()`: Checks if Phantom wallet is installed
  - `wallet`: Stores the wallet adapter instance
  - `connecting`: Tracks wallet connection state
  - `connected`: Tracks if wallet is connected (synced with user login state)

### 3. Removed Deprecated Files
- **Deleted composables:**
  - `useAuth.ts` - Logic moved to user store
  - `useAuthManager.ts` - Logic moved to user store
  - `useWallet.ts` - Logic moved to wallet store

### 4. Updated Components and Composables

#### `AppWalletButton.vue`
- Removed dependency on `useWallet` composable
- Now uses `useWalletStore()` and `useUserStore()` directly
- Added computed `isDisabled` property

#### `useUserActions.ts`
- Removed dependency on `useAuth`
- Now uses `useUserStore()` directly for user updates

#### Other files updated:
- `useScore.ts`: Changed `setUser()` calls to `updateUser()`
- `useTasks.ts`: Changed `setUser()` calls to `updateUser()`

### 5. Plugin Simplification

#### `auth.client.ts`
- Simplified to directly use the user store
- Calls `userStore.initialize()` instead of `authManager.initialize()`

## Benefits of the Refactoring

1. **Simplified Architecture**: Removed complex singleton patterns and composable layers
2. **Centralized State**: All auth and wallet state managed in dedicated Pinia stores
3. **Better Reactivity**: Store properties are reactive by default
4. **Easier Testing**: Pinia stores are easier to test than singletons and composables
5. **Reduced Complexity**: Fewer layers of abstraction
6. **Type Safety**: Better TypeScript support with Pinia
7. **DevTools Support**: Pinia provides excellent DevTools integration
8. **Separation of Concerns**: Auth logic in user store, wallet logic in wallet store

## Usage Guide

### User Authentication:
```typescript
// ✅ Use this (current approach)
const userStore = useUserStore()
const { isLoggedIn, user, isInitialized } = storeToRefs(userStore)

// Login user
userStore.login(userData, walletAddress)

// Logout user
userStore.logout()

// Update user
userStore.updateUser(userData)
```

### Wallet Management:
```typescript
// ✅ Use this (current approach)
const walletStore = useWalletStore()
const { connecting, connected } = storeToRefs(walletStore)

// Connect wallet
await walletStore.connectWallet()

// Disconnect wallet
await walletStore.disconnectWallet()

// Check Phantom availability
const isAvailable = walletStore.checkPhantomAvailability()
```

## Breaking Changes
None - but legacy composables have been completely removed.

## Future Improvements
1. Add auth state persistence beyond localStorage (e.g., session storage)
2. Add auth state hydration for SSR support
3. Consider adding wallet adapter support for other wallet providers
4. Add wallet connection retry logic
