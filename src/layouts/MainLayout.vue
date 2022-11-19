<template>
  <header class="border-solid border-b-2 border-stone-200 rounded-lg pb-3">
    <div class="flex justify-between items-center">
      <div class="max-w-xs max-h-xs">
        <a href="./">
          <img
            src="../assets/images/logo.svg"
            alt="logo"
            class="object-contain w-14"
          />
        </a>
      </div>
      <nav class="flex justify-end items-center gap-5">
        <RouterLink
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          class="font-bold text-base tracking-wide leading-4 hover:text-green-500 hover:bg-transparent"
        >
          {{ route.name }}
        </RouterLink>
        <AuthButton />
        <ThemeToggle />
      </nav>
    </div>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer
    class="border-solid border-t-2 border-stone-200 rounded-lg text-center pt-5"
  >
    <h2 class="font-bold text-lg antialiased tracking-wider">
      Created by Hooji ❤️‍🔥
    </h2>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

import AuthButton from "@/components/AuthButton.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";

const routes = [
  { name: "Home", path: "/" },
  { name: "Todo list", path: "/todo-list" },
];
</script>
