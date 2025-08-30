export type LoginRequest = { email: string; password: string }
export type LoginResponse = { token: string; user: { id: string; email: string } }

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// In a real app, replace this with fetch/axios to your backend.
export async function login({ email, password }: LoginRequest): Promise<LoginResponse> {
  await sleep(600)
  const ok = email === 'test@example.com' && password === 'password123'
  if (!ok) throw new Error('Invalid credentials (try test@example.com / password123)')
  return {
    token: 'fake-jwt-token-1234567890',
    user: { id: 'u_001', email }
  }
}
