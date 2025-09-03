<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink to="/login" class="nav-link">Login</RouterLink>
    <RouterLink to="/faq" class="nav-link">FAQ</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
@use "@/assets/app.scss";
</style>
