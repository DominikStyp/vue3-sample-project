<template>
      <div v-if="!result" style="color: #b00020;">
        No login result available.
      </div>
      <div v-else>
          <p v-if="result.status === 'success'" style="color: #2e7d32;">
            Welcome, {{ result.user?.email }} (token: {{ result.token?.slice(0, 8) }}…)
          </p>
          <p v-if="result.status === 'error'" style="color: #b00020;">
            {{ result.message }}
          </p>
      </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { LoginResult } from '@/types/loginResult'

const result = ref<LoginResult | null>(null)

onMounted(() => {
  console.log(window.history.state);
  const s = window.history.state as { loginResult?: LoginResult } | null
  result.value = s?.loginResult ?? null
})

</script>