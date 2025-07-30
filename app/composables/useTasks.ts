import { ref, computed, watch, onMounted, readonly } from 'vue'
import { useUserStore } from '~/stores/userStore'
import { storeToRefs } from 'pinia'

export type TaskType = 'telegram' | 'x' | 'game'

export interface Task {
    id: TaskType
    title: string
    description: string
    points: number
    url?: string
    type: 'social' | 'game'
    isExternal?: boolean
    icon: string
}

export const useTasks = () => {
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)
    const isLoading = ref(false)
    const completedActions = ref<string[]>([])
    const isInitialized = ref(false)

    const tasks: Task[] = [
        {
            id: 'telegram',
            title: 'Subscribe to Telegram',
            description: 'Join our Telegram channel for updates',
            points: 100,
            url: 'https://t.me/astro_games',
            type: 'social',
            isExternal: true,
            icon: 'social-telegram'
        },
        {
            id: 'x',
            title: 'Subscribe to X',
            description: 'Follow us on X (Twitter) for news',
            points: 100,
            url: 'https://x.com/astro_games',
            type: 'social',
            isExternal: true,
            icon: 'social-x'
        },
        {
            id: 'game',
            title: 'Play OG Game',
            description: 'Try our original game',
            points: 50,
            url: '/planes',
            type: 'game',
            isExternal: false,
            icon: 'menu-games'
        }
    ]

    const completedTasks = computed(() =>
        tasks.filter(task => completedActions.value.includes(task.id))
    )

    const availableTasks = computed(() =>
        tasks.filter(task => !completedActions.value.includes(task.id))
    )

    const totalPoints = computed(() =>
        completedTasks.value.reduce((sum, task) => sum + task.points, 0)
    )

    const totalPossiblePoints = computed(() =>
        tasks.reduce((sum, task) => sum + task.points, 0)
    )

    const progressPercentage = computed(() =>
        Math.round((totalPoints.value / totalPossiblePoints.value) * 100)
    )

    // Load user's completed actions
    const loadCompletedActions = async () => {
        if (!user.value?.address) {
            completedActions.value = []
            return
        }

        try {
            isLoading.value = true
            const response = await $fetch(`/api/user/actions?walletAddress=${user.value.address}`)

            if (response.success) {
                completedActions.value = response.completedActions
                isInitialized.value = true
            }
        } catch (error) {
            console.error('Failed to load completed actions:', error)
            completedActions.value = []
        } finally {
            isLoading.value = false
        }
    }

    // Initialize and watch for user changes
    const initialize = async () => {
        if (user.value?.address && !isInitialized.value) {
            await loadCompletedActions()
        }
    }

    // Watch for user changes to reload completed actions
    watch(() => user.value?.address, async (newAddress, oldAddress) => {
        if (newAddress && newAddress !== oldAddress) {
            isInitialized.value = false
            await loadCompletedActions()
        } else if (!newAddress) {
            // User logged out, clear completed actions
            completedActions.value = []
            isInitialized.value = false
        }
    }, { immediate: true })

    // Initialize on mount if user is already available
    onMounted(() => {
        initialize()
    })

    // Complete a task
    const completeTask = async (taskId: TaskType) => {
        if (!user.value?.address) {
            throw new Error('User not authenticated')
        }

        if (completedActions.value.includes(taskId)) {
            throw new Error('Task already completed')
        }

        try {
            isLoading.value = true
            const response = await $fetch('/api/user/actions', {
                method: 'PUT',
                body: {
                    action: taskId,
                    walletAddress: user.value.address
                }
            }) as any

            if (response.success) {
                completedActions.value.push(taskId)
                // Update user store with new user data
                if (response.user) {
                    userStore.updateUser(response.user)
                }
                return {
                    success: true,
                    pointsEarned: response.pointsEarned
                }
            } else {
                throw new Error(response.message || 'Failed to complete task')
            }
        } catch (error) {
            console.error('Failed to complete task:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    // Get task by ID
    const getTask = (taskId: TaskType) => tasks.find(task => task.id === taskId)

    // Check if task is completed
    const isTaskCompleted = (taskId: TaskType) => completedActions.value.includes(taskId)

    // Calculate statistics
    const getTaskStats = () => {
        const completed = completedTasks.value
        const available = availableTasks.value

        return {
            completedCount: completed.length,
            totalCount: tasks.length,
            earnedPoints: completed.reduce((sum, task) => sum + task.points, 0),
            availablePoints: available.reduce((sum, task) => sum + task.points, 0)
        }
    }

    return {
        tasks,
        completedTasks,
        availableTasks,
        completedActions: readonly(completedActions),
        totalPoints,
        totalPossiblePoints,
        progressPercentage,
        isLoading: readonly(isLoading),
        isInitialized: readonly(isInitialized),
        loadCompletedActions,
        completeTask,
        getTask,
        isTaskCompleted,
        getTaskStats
    }
}
