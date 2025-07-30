import { defineStore } from 'pinia'
import type { User } from '~/types'

const STORAGE_KEYS = {
    USER: 'astro-games-user',
    WALLET_ADDRESS: 'astro-games-wallet-address',
    AUTH_TOKEN: 'astro-games-auth-token'
}

export const useUserStore = defineStore('userStore', () => {
    // State
    const isLoggedIn = ref(false)
    const user = ref<User | null>(null)
    const walletAddress = ref<string | null>(null)
    const isInitialized = ref(false)
    const isInitializing = ref(false)

    // Private helper methods
    const saveUserToStorage = (userData: User, address: string) => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData))
                localStorage.setItem(STORAGE_KEYS.WALLET_ADDRESS, address)
                localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, Date.now().toString())
            } catch (error) {
                console.error('Failed to save user to storage:', error)
            }
        }
    }

    const loadUserFromStorage = (): { user: User | null, walletAddress: string | null } => {
        if (typeof window === 'undefined') {
            return { user: null, walletAddress: null }
        }

        try {
            const userStr = localStorage.getItem(STORAGE_KEYS.USER)
            const address = localStorage.getItem(STORAGE_KEYS.WALLET_ADDRESS)
            const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)

            // Check if auth token is older than 7 days
            if (authToken) {
                const tokenAge = Date.now() - parseInt(authToken)
                const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

                if (tokenAge > maxAge) {
                    clearStoredAuth()
                    return { user: null, walletAddress: null }
                }
            }

            if (userStr && address) {
                const userData = JSON.parse(userStr) as User
                return { user: userData, walletAddress: address }
            }
        } catch (error) {
            console.error('Failed to load user from storage:', error)
            clearStoredAuth()
        }

        return { user: null, walletAddress: null }
    }

    const clearStoredAuth = () => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.removeItem(STORAGE_KEYS.USER)
                localStorage.removeItem(STORAGE_KEYS.WALLET_ADDRESS)
                localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
            } catch (error) {
                console.error('Failed to clear stored auth:', error)
            }
        }
    }

    // Public actions
    const initialize = async (): Promise<void> => {
        if (isInitialized.value || isInitializing.value) {
            return
        }

        isInitializing.value = true

        try {
            console.log('🔐 Initializing auth store...')
            await restoreUserSession()
            console.log('✅ Auth store initialized')
        } catch (error) {
            console.error('❌ Failed to initialize auth:', error)
        } finally {
            isInitialized.value = true
            isInitializing.value = false
        }
    }

    const restoreUserSession = async () => {
        const { user: storedUser, walletAddress: storedAddress } = loadUserFromStorage()

        if (storedUser && storedAddress) {
            try {
                // Verify user still exists in database and get latest data
                const updatedUser = await $fetch<User>('/api/auth/wallet', {
                    method: 'POST',
                    body: { address: storedAddress }
                })

                // Update state with latest user data
                user.value = updatedUser
                walletAddress.value = storedAddress
                isLoggedIn.value = true

                // Update storage with latest data
                saveUserToStorage(updatedUser, storedAddress)

                return { user: updatedUser, walletAddress: storedAddress }
            } catch (error) {
                console.error('Failed to restore user session:', error)
                clearStoredAuth()
                logout()
                return { user: null, walletAddress: null }
            }
        }

        return { user: null, walletAddress: null }
    }

    const login = (userData: User, address: string) => {
        user.value = userData
        walletAddress.value = address
        isLoggedIn.value = true
        saveUserToStorage(userData, address)
    }

    const logout = () => {
        user.value = null
        walletAddress.value = null
        isLoggedIn.value = false
        clearStoredAuth()
    }

    const updateUser = (userData: User) => {
        user.value = userData
        if (walletAddress.value) {
            saveUserToStorage(userData, walletAddress.value)
        }
    }

    const updateUserPoints = (points: number) => {
        if (user.value) {
            user.value.points_count = points
            if (walletAddress.value) {
                saveUserToStorage(user.value, walletAddress.value)
            }
        }
    }

    const updateUserAction = (action: 'telegram' | 'x' | 'game') => {
        if (user.value) {
            switch (action) {
                case 'telegram':
                    user.value.opened_telegram_link_once = true
                    break
                case 'x':
                    user.value.opened_x_once = true
                    break
                case 'game':
                    user.value.played_og_game_once = true
                    break
            }
            if (walletAddress.value) {
                saveUserToStorage(user.value, walletAddress.value)
            }
        }
    }

    const updateUserBestScore = (score: number) => {
        if (user.value) {
            user.value.player_best_score = score
            if (walletAddress.value) {
                saveUserToStorage(user.value, walletAddress.value)
            }
        }
    }

    return {
        // State
        isLoggedIn: readonly(isLoggedIn),
        user: readonly(user),
        walletAddress: readonly(walletAddress),
        isInitialized: readonly(isInitialized),
        isInitializing: readonly(isInitializing),
        // Actions
        initialize,
        restoreUserSession,
        login,
        logout,
        updateUser,
        updateUserPoints,
        updateUserAction,
        updateUserBestScore,
    }
})