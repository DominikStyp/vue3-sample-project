import { computed, reactive, ref } from 'vue'
import { login as loginApi, type LoginResponse } from '@/services/authService'
import { validateField, validateForm } from '@/utils/validateForm'
import { FormFields } from '@/types/formFields'
import { FormErrors } from '@/types/formErrors'
import { LoginResult } from '@/types/loginResult'

import { TEST_EMAIL, TEST_PASSWORD } from '@/services/authService'

import { router } from '@/services/router'

export function useLogin() {
  const form = reactive<FormFields>({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    rememberMe: false
  })

  const errors = reactive<FormErrors>({})
  const loading = ref(false)
  const result = ref<LoginResult>({ status: 'idle' })

  const submitDisabled = computed(() => {
    return loading.value || !form.email || !form.password || Object.values(errors).some(error => error.length > 0)
  });

  function reValidateField(field: keyof FormErrors) {
    validateField(field, form, errors)
  }

  async function submit() {
    if (!validateForm(form, errors)){
      return
    }

    loading.value = true
    result.value = { status: 'idle' }

    try {
      const res: LoginResponse = await loginApi({ email: form.email, password: form.password })
      result.value = { status: 'success', token: res.token, user: res.user }
      console.log('Login successful', result.value);
    } catch (err: any) {
      result.value = { status: 'error', message: err?.message ?? 'Login failed' }
      console.log('Login error', result.value);
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    errors,
    loading,
    result,
    submit,
    validateForm,
    submitDisabled,
    reValidateField
  }
}
