<template>
    <ThinBackend>
        <MainLayout>
            <RouterView />
        </MainLayout>
    </ThinBackend>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue"
import { initThinBackend } from "thin-backend"
import { ThinBackend } from "thin-backend-vue"
import { RouterView } from "vue-router"

initThinBackend({
    host: import.meta.env.VITE_THINBACKEND_URL,
})
</script>
