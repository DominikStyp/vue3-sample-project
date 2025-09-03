<script setup lang="ts">
import { useLogin } from '@/composables/useLogin'
import { useRouter } from 'vue-router';
import { useLoginResultData } from '@/stores/loginResultData'

const router = useRouter();
const store = useLoginResultData()

const {
  form,
  errors,
  submitDisabled,
  submit,
  result,
  reValidateField
} = useLogin()


const onSubmit = async () => {
  await submit();

  if (result.value.status === 'success') {
    store.put(result.value)
    router.push({ name: 'logged-in' });
  }
};
</script>

<style scoped src="@/assets/login.scss" lang="scss"></style>

<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="onSubmit" novalidate>
      <div class="container">
        <label id="email">
          <div>Email</div>
          <input type="email" v-model="form.email" @change="reValidateField('email')" placeholder="test@example.com"
            autocomplete="username email" required />
          <small v-if="errors.email">{{ errors.email }} any error here</small>
        </label>

        <label>
          <div>Password</div>
          <input type="password" v-model="form.password" @change="reValidateField('password')" placeholder="••••••••"
            autocomplete="current-password" required minlength="8" />
          <small v-if="errors.password" style="color: #b00020">{{ errors.password }}</small>
        </label>

        <label class="rememberMe">
          <input type="checkbox" v-model="form.rememberMe">
          <div>Remember me</div>
        </label>

        <button :disabled="submitDisabled" type="submit" :class="submitDisabled ? 'submitDisabled' : ''">
          Sign In
        </button>

      </div>
    </form>
  </div>
</template>
