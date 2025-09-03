<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Login from './components/Login.vue';
</script>

<template>
  <nav>
    <RouterLink to="/login" class="nav-link">Login</RouterLink>
    <RouterLink to="/faq" class="nav-link">FAQ</RouterLink>
  </nav>
  <main>
    <RouterView v-slot="{ Component }">
        <KeepAlive :include="['Login']" :max="10">
          <component :is="Component" />
        </KeepAlive>
    </RouterView>
  </main>
</template>

<style lang="scss">
@use "@/assets/app.scss";
</style>
