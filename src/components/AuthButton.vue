<template>
    <button
        class="font-bold text-base tracking-wide leading-4 hover:bg-transparent"
        :class="[isLoggedIn ? 'border-red-500 hover:text-red-500' : 'border-green-500 hover:text-green-500']"
        @click="authHandle"
    >
        {{ isLoggedIn ? "Logout" : "Login" }}
    </button>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/auth"

const { isLoggedIn, login, logout } = useAuth()

const authHandle = async () => {
    return await (isLoggedIn.value ? logout() : login())
}
</script>
