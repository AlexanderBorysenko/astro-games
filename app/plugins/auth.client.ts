export default defineNuxtPlugin({
    name: 'auth-init',
    parallel: true,
    async setup() {
        // Only run on client side during initial app load
        if (typeof window !== 'undefined') {
            const userStore = useUserStore()

            // Initialize authentication once on app startup
            await userStore.initialize()
        }
    }
})