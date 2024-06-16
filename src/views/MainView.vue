<template>
  <main>
    <!-- not authenticated -->
    <div v-if="!authStore.isAuthenticated">
      <Authenticate />
    </div>
    <div v-else>
      <!-- authenticated -->
      <Home />
    </div>
  </main>
</template>
<script setup>
import Home from '../components/Home.vue'
import Authenticate from '../components/Authenticate.vue'
import { useAuthStore } from '../stores/auth.js';
const authStore = useAuthStore();
</script>

