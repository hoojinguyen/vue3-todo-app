import { loginWithRedirect, logout } from "thin-backend";
import { useCurrentUser, useIsLoggedIn } from "thin-backend-vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
const BASE_URL = "http://localhost:5173";

export function useAuth() {
  const isLoading = ref(false);
  const isLoggedIn = useIsLoggedIn();
  const currentUser = useCurrentUser();
  const route = useRoute();

  const doLogin = async () => {
    isLoading.value = true;
    await loginWithRedirect();
    isLoading.value = false;
  };

  const doLogout = async () => {
    isLoading.value = true;
    await logout({ redirect: `${BASE_URL}${route.path}` });
    isLoading.value = false;
  };

  return {
    isLoading: isLoading,
    isLoggedIn: isLoggedIn,
    user: currentUser,
    login: doLogin,
    logout: doLogout,
  };
}
