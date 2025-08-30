import { reactive, ref } from 'vue'
import { login as loginApi, type LoginResponse } from '@/services/authService'

export type LoginForm = {
  email: string
  password: string
}

export type LoginErrors = Partial<Record<keyof LoginForm, string>>

export type LoginResult =
  | { status: 'idle' }
  | { status: 'success'; token: string; user: { id: string; email: string } }
  | { status: 'error'; message: string }

export function useLogin() {
  const form = reactive<LoginForm>({
    email: '',
    password: ''
  })

  const errors = reactive<LoginErrors>({})
  const loading = ref(false)
  const result = ref<LoginResult>({ status: 'idle' })

  function isEmailLike(value: string) {
    // Simple, readable email validation; replace with robust lib if needed.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  function validate(): boolean {
    errors.email = ''
    errors.password = ''

    if (!form.email) {
      errors.email = 'Email is required'
    } else if (!isEmailLike(form.email)) {
      errors.email = 'Email is invalid'
    }

    if (!form.password) {
      errors.password = 'Password is required'
    } else if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
    }

    return !errors.email && !errors.password
  }

  function clearError(field: keyof LoginForm) {
    errors[field] = ''
  }

  async function submit() {
    if (!validate()) return

    loading.value = true
    result.value = { status: 'idle' }

    try {
      const res: LoginResponse = await loginApi({ email: form.email, password: form.password })
      result.value = { status: 'success', token: res.token, user: res.user }
    } catch (err: any) {
      result.value = { status: 'error', message: err?.message ?? 'Login failed' }
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
    validate,
    clearError
  }
}
