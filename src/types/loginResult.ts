import { User } from "./user";

export type LoginResult =
  | { status: 'idle' }
  | { status: 'success'; token: string; user: User }
  | { status: 'error'; message: string }