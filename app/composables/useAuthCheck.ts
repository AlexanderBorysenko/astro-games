export const useAuthCheck = () => {
    const userStore = useUserStore()
    const { isLoggedIn, user } = storeToRefs(userStore)

    const requireAuth = (message = 'Please connect your wallet first') => {
        if (!isLoggedIn.value) {
            alert(message)
            return false
        }
        return true
    }

    const hasCompletedAction = (action: 'telegram' | 'x' | 'game'): boolean => {
        if (!user.value) return false

        switch (action) {
            case 'telegram':
                return user.value.opened_telegram_link_once
            case 'x':
                return user.value.opened_x_once
            case 'game':
                return user.value.played_og_game_once
            default:
                return false
        }
    }

    const canEarnPoints = (action: 'telegram' | 'x' | 'game'): boolean => {
        return isLoggedIn.value && !hasCompletedAction(action)
    }

    const getUserPoints = (): number => {
        return user.value?.points_count || 0
    }

    const getUserAddress = (): string => {
        return user.value?.address || ''
    }

    return {
        isLoggedIn: readonly(isLoggedIn),
        user: readonly(user),
        requireAuth,
        hasCompletedAction,
        canEarnPoints,
        getUserPoints,
        getUserAddress
    }
}
