export type LoginRequest = { email: string; password: string }
export type LoginResponse = { token: string; user: { id: string; email: string } }

function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

export const TEST_EMAIL = 'test@example.com';
export const TEST_PASSWORD = 'password123';
export const FAKE_TOKEN = 'fake-jwt-token-1234567890';

// In a real app, replace this with fetch/axios to your backend.
export async function login({ email, password }: LoginRequest): Promise<LoginResponse> {
  await sleep(1) // simulate network delay)
  
  const ok = email === TEST_EMAIL && password === TEST_PASSWORD
  
  if (!ok){ 
    throw new Error(`Invalid credentials (try ${TEST_EMAIL} / ${TEST_PASSWORD})`)
  }
  
  return {
    token: FAKE_TOKEN,
    user: { id: '1', email }
  }
}
