import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/login'
import { useLoginStore } from '@/stores/login'
const router = useRouter()
export const loginForm = ref({
    mobile: '13800000002',
    password: `itHeiMa@${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
})
export const loginRules = ref({
    mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 3, max: 20, message: '手机号长度必须在3-20之间', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度必须在6-20之间', trigger: 'blur' }
    ]
})
export async function submitForm(formEl) {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const res = await login(loginForm.value)
            // console.log(res)
            useLoginStore().token = res.data
            router.push('/')

        } else {
            console.log('error submit!', fields)
        }
    })
}
export const formRef = ref()