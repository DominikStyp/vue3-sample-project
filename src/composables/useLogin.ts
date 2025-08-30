import { reactive, ref } from 'vue'
import { login as loginApi, type LoginResponse } from '@/services/authService'
import { validateForm } from '@/utils/validateForm'
import { FormFields } from '@/types/formFields'
import { FormErrors } from '@/types/formErrors'


export type LoginResult =
  | { status: 'idle' }
  | { status: 'success'; token: string; user: { id: string; email: string } }
  | { status: 'error'; message: string }

export function useLogin() {
  const form = reactive<FormFields>({
    email: '',
    password: '',
    rememberMe: false
  })

  const errors = reactive<FormErrors>({})
  const loading = ref(false)
  const result = ref<LoginResult>({ status: 'idle' })

  function clearError(field: keyof FormErrors) {
    errors[field] = ''
  }

  async function submit() {
    if (!validateForm(form)) return

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
    validateForm,
    clearError
  }
}
