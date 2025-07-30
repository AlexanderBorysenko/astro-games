import { defineStore } from 'pinia'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import type { WalletAdapter } from '@solana/wallet-adapter-base'
import type { User } from '~/types'

export const useWalletStore = defineStore('walletStore', () => {
    // State
    const wallet = ref<WalletAdapter | null>(null)
    const connecting = ref(false)
    const connected = ref(false)

    // Get user store reference
    const userStore = useUserStore()

    // Watch for user login state changes to sync connected state
    watch(() => userStore.isLoggedIn, (isLoggedIn) => {
        connected.value = isLoggedIn
    }, { immediate: true })

    // Actions
    const checkPhantomAvailability = (): boolean => {
        if (typeof window === 'undefined') return false
        return !!(window as any).phantom?.solana?.isPhantom
    }

    const connectWallet = async (): Promise<void> => {
        if (connecting.value) return

        try {
            connecting.value = true

            // Check if Phantom wallet is available
            if (!checkPhantomAvailability()) {
                alert('Phantom wallet is not found in your browser.\n\nPlease open the Phantom extension and try again.\n\nIf you don\'t have Phantom installed, please install it from https://phantom.app')
                return
            }

            // Create Phantom wallet adapter
            const phantomWallet = new PhantomWalletAdapter()
            wallet.value = phantomWallet

            // Connect to wallet
            await phantomWallet.connect()

            if (phantomWallet.publicKey) {
                const walletAddress = phantomWallet.publicKey.toString()

                // Authenticate/create user on backend
                const user = await authenticateUser(walletAddress)

                // Save user session persistently using user store
                userStore.login(user, walletAddress)
                connected.value = true

                console.log('🔗 Wallet connected successfully:', walletAddress)
            }
        } catch (error) {
            console.error('❌ Failed to connect wallet:', error)
            alert('Failed to connect wallet. Please try again.')
        } finally {
            connecting.value = false
        }
    }

    const disconnectWallet = async (): Promise<void> => {
        if (wallet.value) {
            try {
                await wallet.value.disconnect()
                wallet.value = null
                connected.value = false
                userStore.logout()
                console.log('🔌 Wallet disconnected')
            } catch (error) {
                console.error('❌ Failed to disconnect wallet:', error)
            }
        }
    }

    const authenticateUser = async (address: string): Promise<User> => {
        try {
            const response = await $fetch<User>('/api/auth/wallet', {
                method: 'POST',
                body: { address }
            })
            return response
        } catch (error) {
            console.error('❌ Authentication failed:', error)
            throw error
        }
    }

    return {
        // State
        wallet: readonly(wallet),
        connecting: readonly(connecting),
        connected: readonly(connected),
        // Actions
        connectWallet,
        disconnectWallet,
        checkPhantomAvailability
    }
})
