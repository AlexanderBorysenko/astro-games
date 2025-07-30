export const useScore = () => {
    const userStore = useUserStore()

    const updatePlayerScore = async (score: number) => {
        try {
            if (!userStore.user?.id) {
                throw new Error('User not authenticated')
            }

            const response = await $fetch('/api/user/score', {
                method: 'PUT',
                body: {
                    userId: userStore.user.id,
                    score: score
                }
            }) as any

            // Update the store with the new user data
            userStore.updateUser({
                id: response.id,
                address: response.address,
                points_count: response.points_count,
                player_best_score: response.player_best_score,
                opened_telegram_link_once: Boolean(response.opened_telegram_link_once),
                opened_x_once: Boolean(response.opened_x_once),
                played_og_game_once: Boolean(response.played_og_game_once)
            })

            return {
                success: true,
                pointsAdded: response.pointsAdded,
                scoreImproved: response.scoreImproved,
                newBestScore: response.player_best_score,
                newPointsTotal: response.points_count
            }
        } catch (error: any) {
            console.error('Failed to update score:', error)
            return {
                success: false,
                error: error.message || 'Failed to update score'
            }
        }
    }

    const refetchUserData = async () => {
        try {
            if (!userStore.user?.address) {
                throw new Error('User not authenticated')
            }

            const response = await $fetch('/api/auth/wallet', {
                method: 'POST',
                body: {
                    address: userStore.user.address
                }
            }) as any

            userStore.updateUser({
                id: response.id,
                address: response.address,
                points_count: response.points_count,
                player_best_score: response.player_best_score,
                opened_telegram_link_once: Boolean(response.opened_telegram_link_once),
                opened_x_once: Boolean(response.opened_x_once),
                played_og_game_once: Boolean(response.played_og_game_once)
            })

            return { success: true, user: response }
        } catch (error: any) {
            console.error('Failed to refetch user data:', error)
            return {
                success: false,
                error: error.message || 'Failed to refetch user data'
            }
        }
    }

    return {
        updatePlayerScore,
        refetchUserData
    }
}
