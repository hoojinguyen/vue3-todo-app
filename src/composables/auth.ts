import { loginWithRedirect, logout } from "thin-backend"
import { useCurrentUser, useIsLoggedIn } from "thin-backend-vue"
import { ref } from "vue"
import { useRoute } from "vue-router"

export function useAuth() {
    const isLoading = ref(false)
    const isLoggedIn = useIsLoggedIn()
    const currentUser = useCurrentUser()
    const route = useRoute()

    const doLogin = async () => {
        isLoading.value = true
        await loginWithRedirect()
        isLoading.value = false
    }

    const doLogout = async () => {
        isLoading.value = true
        await logout({ redirect: `${import.meta.env.VITE_BASE_URL}${route.path}` })
        isLoading.value = false
    }

    return {
        isLoading: isLoading,
        isLoggedIn: isLoggedIn,
        user: currentUser,
        login: doLogin,
        logout: doLogout,
    }
}
