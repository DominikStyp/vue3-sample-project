import { defineStore } from 'pinia'
import { LoginResult } from '@/types/loginResult'

export const useLoginResultData = defineStore('loginResultData', {
    state: () => ({
        result: null as LoginResult | null,
    }),
    actions: {
        put(payload: LoginResult) {
            this.result = payload
        },
        take(): LoginResult | null {
            const v = this.result
            this.result = null
            return v
        },
    },
})