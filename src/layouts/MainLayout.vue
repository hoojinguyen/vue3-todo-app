<template>
  <header class="border-solid border-b-2 border-stale-400 rounded-lg pb-3">
    <div class="flex justify-between items-center">
      <div class="max-w-xs max-h-xs">
        <img src="../assets/logo.svg" alt="logo" class="object-contain w-14" />
      </div>
      <nav class="flex justify-end gap-5">
        <RouterLink
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          class="font-bold text-base tracking-wide leading-4 hover:text-green-500 hover:bg-transparent"
        >
          {{ route.name }}
        </RouterLink>
        <button
          class="font-bold text-base tracking-wide leading-4 hover:bg-transparent border-b-2 pb-2"
          :class="[
            isLoggedIn
              ? 'border-red-500 hover:text-red-500'
              : 'border-green-500 hover:text-green-500',
          ]"
          @click="authHandle"
        >
          {{ isLoggedIn ? "Logout" : "Login" }}
        </button>
      </nav>
    </div>
  </header>
  <main>
    <slot></slot>
  </main>

  <footer
    class="border-solid border-t-2 border-stale-400 rounded-lg text-center pt-5"
  >
    <h2 class="font-bold text-lg antialiased tracking-wider text-stone-700">
      Created by Hooji ❤️‍🔥
    </h2>
  </footer>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/auth";
import { RouterLink } from "vue-router";

const { isLoggedIn, login, logout } = useAuth();

const routes = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Todo list", path: "/todo-list" },
];

const authHandle = async () => {
  return await (isLoggedIn.value ? logout() : login());
};
</script>
