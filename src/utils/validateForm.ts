import { FormErrors } from "@/types/formErrors" 
import { FormFields } from "@/types/formFields"

export function validateForm(form: FormFields): boolean {
    const errors: FormErrors = {}

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

function isEmailLike(value: string) {
    // Simple, readable email validation; replace with robust lib if needed.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
  