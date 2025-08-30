import { FormErrors } from "@/types/formErrors"
import { FormFields } from "@/types/formFields"

export function validateForm(form: FormFields, errors: FormErrors): boolean {
  validateEmail(form, errors);
  validatePassword(form, errors);
  return !errors.email && !errors.password
}

export function validateField(field: keyof FormErrors, form: FormFields, errors: FormErrors) {
  if (field && !(field in form)) {
    throw new Error(`Unknown field: ${field}`)
  }

  if (field === 'email') {
    validateEmail(form, errors);
  }

  if (field === 'password') {
    validatePassword(form, errors);
  }
}

function validatePassword(form: FormFields, errors: FormErrors) {
  errors.password = ''

  if (!form.password) {
    errors.password = 'Password is required'
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }
}

function validateEmail(form: FormFields, errors: FormErrors) {
  errors.email = ''

  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!isEmailLike(form.email)) {
    errors.email = 'Email is invalid'
  }
}

function isEmailLike(value: string) {
  // Simple, readable email validation; replace with robust lib if needed.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
