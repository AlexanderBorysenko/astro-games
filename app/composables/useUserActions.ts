import type { User } from '~/types'

export const useUserActions = () => {
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    const updateUserPoints = async (points: number) => {
        if (!user.value) return

        try {
            const updatedUser = await $fetch<User>('/api/user/update', {
                method: 'PUT',
                body: {
                    userId: user.value.id,
                    points
                }
            })

            userStore.updateUser(updatedUser)
        } catch (error) {
            console.error('Failed to update points:', error)
        }
    }

    const markActionCompleted = async (action: 'telegram' | 'x' | 'game') => {
        if (!user.value) return

        try {
            const updatedUser = await $fetch<User>('/api/user/update', {
                method: 'PUT',
                body: {
                    userId: user.value.id,
                    action
                }
            })

            userStore.updateUser(updatedUser)
        } catch (error) {
            console.error('Failed to update action:', error)
        }
    }

    const addPoints = async (pointsToAdd: number) => {
        if (!user.value) return

        const newTotal = user.value.points_count + pointsToAdd
        await updateUserPoints(newTotal)
    }

    return {
        updateUserPoints,
        markActionCompleted,
        addPoints
    }
}
