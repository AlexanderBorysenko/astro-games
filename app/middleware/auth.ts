export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)

    // Skip middleware on server-side rendering
    if (typeof window === 'undefined') {
        return
    }

    // Check if user is authenticated
    if (!isLoggedIn.value) {
        // Redirect to home page with a message
        throw createError({
            statusCode: 401,
            statusMessage: 'Please connect your wallet to access this page'
        })
    }
})
