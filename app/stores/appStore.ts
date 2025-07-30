import { ref, watchEffect, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const isMobileMenuOpened = ref(false)
  const router = useRouter()

  const toggleIsMobileMenuOpened = () => {
    isMobileMenuOpened.value = !isMobileMenuOpened.value
  }
  const getIsMobileMenuOpened = () => {
    return isMobileMenuOpened.value
  }

  watchEffect(() => {
    if (!document) return
    if (isMobileMenuOpened.value) {
      // set html overflow hidden
      document.documentElement.style.overflow = 'hidden'
    } else {
      // reset html overflow
      document.documentElement.style.overflow = ''
    }
  })

  // Close mobile menu when route changes
  watch(() => router.currentRoute.value.path, () => {
    if (isMobileMenuOpened.value) {
      isMobileMenuOpened.value = false
    }
  })

  return {
    getIsMobileMenuOpened,
    toggleIsMobileMenuOpened
  }
})