<template>
  <Navbar />
  <div class='container is-max-desktop py-3 px-2 '>
    <RouterView />
  </div>
</template>

<script setup>
import Navbar from './components/layouts/Navbar.vue'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/authStore'
const authStore = useAuthStore()
onMounted(() =>authStore.init())

</script>

<style></style>
