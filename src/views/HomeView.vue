<template>
  <div class="h-full flex flex-col justify-center items-center gap-5">
    <h1 class="text-3xl font-semibold tracking-wider">
      Hello, Welcome to Todo App
    </h1>
    <span class="text-base font-medium tracking-wider"
      >Todo App includes these feature:</span
    >
    <div class="flex justify-center flex-wrap gap-3">
      <a
        v-for="(feature, index) in features"
        :key="index"
        :href="feature.link"
        target="_blank"
        class="text-base font-medium tracking-wider text-green-500 hover:text-green-900"
      >
        {{ features.length - 1 !== index ? `${feature.name} |` : feature.name }}
      </a>
    </div>
    <span class="text-base font-medium tracking-wider"
      >Before coding , I recommended your IDE setup VSCode + Volar</span
    >
    <a :href="githubUrl" target="_blank">
      <font-awesome-icon icon="fa-brands fa-github" class="text-2xl" />
    </a>
  </div>
</template>

<script setup lang="ts">
const githubUrl = "https://github.com/hoojinguyen/vue3-todo-app";
const features = [
  {
    name: "Vite3",
    link: "https://github.com/vitejs/vite",
  },
  {
    name: "Vue3",
    link: "https://github.com/vuejs/core",
  },
  {
    name: "Typescript",
    link: "https://github.com/microsoft/TypeScript",
  },
  {
    name: "Vue Router 4",
    link: "https://router.vuejs.org/index.html",
  },
  {
    name: "Pinia",
    link: "https://pinia.vuejs.org/",
  },
  {
    name: "Tailwind CSS",
    link: "https://tailwindui.com/",
  },
  {
    name: "Fort Awesome",
    link: "https://fontawesome.com/docs/web/use-with/vue/",
  },
  {
    name: "I18n",
    link: "https://github.com/intlify/vite-plugin-vue-i18n",
  },
  {
    name: "VueUse",
    link: "https://github.com/vueuse/vueuse",
  },
  {
    name: "Thin backend",
    link: "https://thin.dev/docs/vue",
  },
];
</script>
