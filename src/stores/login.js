import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore(
    'login',
    () => {
        const token = ref('')
        return { token }
    },
    {
        persist: true
    }
)