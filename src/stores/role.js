import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usuRoleStore = defineStore('roleStore',()=>{
    const roles = ref([])
    return {roles}
},
{
    persist: true
})