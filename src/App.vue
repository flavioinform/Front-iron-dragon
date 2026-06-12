<template>
  <div id="app">
    <Navbar v-if="!isAdminRoute" />

    <main :class="{ 'admin-main': isAdminRoute }">
      <router-view />
    </main>

    <Chatbot v-if="!isAdminRoute" />
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Chatbot from '@/components/Chatbot.vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path === '/admin-dashboard')
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--am-bg-main);
}

main {
  flex: 1;
  background-color: var(--am-bg-main);
}
</style>
