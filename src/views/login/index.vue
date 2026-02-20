<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/login'
import { useLoginStore } from '@/stores/login'
const router = useRouter()
const loginStore = useLoginStore()
const loginForm = ref({
    mobile: '13800000002',
    password: `itHeiMa@${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
})
const loginRules = ref({
    mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 3, max: 20, message: '手机号长度必须在3-20之间', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度必须在6-20之间', trigger: 'blur' }
    ]
})
async function submitForm(formEl) {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const res = await login(loginForm.value)
            if (res.success) {
                loginStore.token = res.data
                loginStore.password = loginForm.value.password
                router.push('/')
            }

        } else {
            console.log('error submit!', fields)
        }
    })
}
const formRef = ref()
</script>

<template>
    <div class="login-container">
        <div class="logo-panel">
        </div>

        <div class="login-form-wrap">
            <el-card class="login-card" shadow="always">
                <h2 class="form-title">欢迎登录</h2>
                <el-form label-position="top" class="login-form" :model="loginForm" :rules="loginRules" ref="formRef">
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password" type="password" show-password placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item class="remember-item">
                        <el-checkbox label="我已阅读并同意用户协议" size="large" />
                    </el-form-item>
                    <el-form-item class="submit-item">
                        <el-button type="primary" class="submit-btn" @click="submitForm(formRef)">登 录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    min-height: 100vh;
    background: #f5f7fb;
}

.logo-panel {
    flex: 3;
    background: rgba(38, 72, 176, 0.92) url(../../assets/common/login_back.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    border-bottom-right-radius: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding: 0 84px;
}

.icon {
    width: 320px;
    height: 56px;
    background: url(../../assets/common/logo.png) no-repeat center / contain;
}

.logo-panel p {
    width: 320px;
    margin-top: 20px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    letter-spacing: 1px;
}

.login-form-wrap {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.login-card {
    width: 100%;
    max-width: 560px;
    min-height: 460px;
    border-radius: 14px;
}

.login-card :deep(.el-card__body) {
    height: 100%;
    box-sizing: border-box;
    padding: 34px 28px 28px;
    display: flex;
    flex-direction: column;
}

.form-title {
    margin: 0 0 24px;
    font-size: 24px;
    font-weight: 600;
    color: #1f2d3d;
    text-align: center;
}

.login-form {
    display: flex;
    flex: 1;
    flex-direction: column;
}

.login-form :deep(.el-form-item) {
    margin-bottom: 18px;
}

.login-form :deep(.el-form-item__label) {
    padding-bottom: 8px;
    color: #334155;
    font-weight: 500;
    line-height: 1;
}

.login-form :deep(.el-input__wrapper) {
    min-height: 40px;
}

.remember-item {
    margin: 4px 0 0;
}

.remember-item :deep(.el-form-item__content) {
    line-height: 1.4;
}

.submit-item {
    margin-top: auto !important;
    margin-bottom: 0 !important;
}

.submit-btn {
    width: 100%;
    height: 44px;
    font-size: 16px;
    font-weight: 600;
}

@media (max-width: 992px) {
    .logo-panel {
        display: none;
    }

    .login-form-wrap {
        flex: 1;
    }
}
</style>