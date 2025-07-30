interface LeaderboardPlayer {
    id: number
    address: string
    points_count: number
    player_best_score: number
    position: number
}

interface UserPosition {
    position: number
    points_count: number
    player_best_score: number
}

interface LeaderboardResponse {
    success: boolean
    topPlayers: LeaderboardPlayer[]
    currentUser: UserPosition
}

export const useLeaderboard = () => {
    const topPlayers = ref<LeaderboardPlayer[]>([])
    const currentUserPosition = ref<UserPosition | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const fetchLeaderboard = async (walletAddress: string) => {
        if (!walletAddress) {
            error.value = 'Wallet address is required'
            return
        }

        isLoading.value = true
        error.value = null

        try {
            const response = await $fetch<LeaderboardResponse>('/api/leaderboard', {
                method: 'GET',
                query: {
                    walletAddress
                }
            })

            if (response.success) {
                topPlayers.value = response.topPlayers
                currentUserPosition.value = response.currentUser
            } else {
                error.value = 'Failed to fetch leaderboard data'
            }
        } catch (err) {
            console.error('Error fetching leaderboard:', err)
            error.value = 'An error occurred while fetching leaderboard data'
        } finally {
            isLoading.value = false
        }
    }

    const formatPlayerName = (address: string, position: number) => {
        // Format address to show first 6 and last 4 characters
        const shortened = `${address.slice(0, 6)}...${address.slice(-4)}`
        return `${shortened}`
    }

    const { formatPoints } = usePointsFormatter()

    const refreshLeaderboard = async () => {
        const userStore = useUserStore()
        const { user } = storeToRefs(userStore)

        if (user.value?.address) {
            await fetchLeaderboard(user.value.address)
        }
    }

    return {
        topPlayers: readonly(topPlayers),
        currentUserPosition: readonly(currentUserPosition),
        isLoading: readonly(isLoading),
        error: readonly(error),
        fetchLeaderboard,
        refreshLeaderboard,
        formatPlayerName,
        formatPoints
    }
}
