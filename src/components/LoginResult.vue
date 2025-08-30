<template>
      <p v-if="result.status === 'success'" style="color: #2e7d32;">
        Welcome, {{ result.user?.email }} (token: {{ result.token?.slice(0, 8) }}…)
      </p>
      <p v-if="result.status === 'error'" style="color: #b00020;">
        {{ result.message }}
      </p>
</template>

<script lang="ts" setup>
import { LoginResult } from '@/types/loginResult';
defineProps<{ result: LoginResult }>();
</script>