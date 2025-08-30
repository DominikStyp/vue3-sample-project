import { describe, it, expect } from 'vitest'
import { useLogin } from './useLogin'

describe('useLogin validation', () => {
  it('fails on empty fields', () => {
    const { form, validate, errors } = useLogin()
    form.email = ''
    form.password = ''
    const ok = validate()
    expect(ok).toBe(false)
    expect(errors.email).toBeTruthy()
    expect(errors.password).toBeTruthy()
  })

  it('fails on invalid email', () => {
    const { form, validate, errors } = useLogin()
    form.email = 'not-an-email'
    form.password = 'password123'
    const ok = validate()
    expect(ok).toBe(false)
    expect(errors.email).toContain('invalid')
  })

  it('passes with valid data', () => {
    const { form, validate, errors } = useLogin()
    form.email = 'test@example.com'
    form.password = 'password123'
    const ok = validate()
    expect(ok).toBe(true)
    expect(errors.email || '').toBe('')
    expect(errors.password || '').toBe('')
  })
})
