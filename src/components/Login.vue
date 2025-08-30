<script setup lang="ts">
import { useLogin } from '@/composables/useLogin'

 const {
  form,
  errors,
  loading,
  result,
  submit,
  validate,
  clearError
} = useLogin()
</script>

<script lang="ts">
export default {};
</script>

<template>
  <form @submit.prevent="submit" novalidate>
    <div style="display: grid; gap: 0.75rem;">
      <label>
        <div>Email</div>
        <input
          type="email"
          v-model="form.email"
          @input="clearError('email')"
          placeholder="test@example.com"
          autocomplete="username email"
          required
        />
        <small v-if="errors.email" style="color: #b00020">{{ errors.email }}</small>
      </label>

      <label>
        <div>Password</div>
        <input
          type="password"
          v-model="form.password"
          @input="clearError('password')"
          placeholder="••••••••"
          autocomplete="current-password"
          required
          minlength="8"
        />
        <small v-if="errors.password" style="color: #b00020">{{ errors.password }}</small>
      </label>

      <button :disabled="loading" type="submit">
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>

      <p v-if="result.status === 'success'" style="color: #2e7d32;">
        Welcome, {{ result.user?.email }} (token: {{ result.token?.slice(0, 8) }}…)
      </p>
      <p v-if="result.status === 'error'" style="color: #b00020;">
        {{ result.message }}
      </p>
    </div>
  </form>
</template>

<style scoped>
input, button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font: inherit;
  width: 100%;
  box-sizing: border-box;
}
button {
  cursor: pointer;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
label > div {
  font-weight: 600;
  margin-bottom: 0.25rem;
}
small {
  display: block;
  margin-top: 0.25rem;
}
</style>
