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
    console.log('Login successful, navigating to /logged-in', result.value);
    store.put(result.value)
    router.push({ name: 'logged-in' });
  }
};
</script>

<template>
  <h1>Login</h1>

  <form @submit.prevent="onSubmit" novalidate>
    <div id="container">
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

      <label id="rememberMe">
        <input type="checkbox" v-model="form.rememberMe">
        <div>Remember me</div>
      </label>

      <button :disabled="submitDisabled" type="submit" :class="submitDisabled ? 'submitDisabled' : ''">
        Sign In
      </button>

    </div>
  </form>
</template>
<style scoped>
#rememberMe {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-start;

  input[type="checkbox"] {
    width: auto;
    margin: 0;
    transform: scale(1.2);
  }
}

#container {
  display: grid;
  gap: 0.75rem;
}

label {
  small {
    color: #b00020
  }
}

input,
button {
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

label>div {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

small {
  display: block;
  margin-top: 0.25rem;
}

button.submitDisabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
