<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
    Clock,
    Key,
    Menu,
    Money,
    Odometer,
    OfficeBuilding,
    Stamp,
    Tickets,
    User,
    UserFilled,
    Setting
} from '@element-plus/icons-vue'
const isCollapse = ref(false)
const route = useRoute()

const menuTitleMap = {
    '/dashboard': '首页',
    '/department': '组织',
    '/role': '角色',
    '/employee': '员工',
    '/authorize': '权限',
    '/attendance': '考勤',
    '/review': '审批',
    '/salary': '工资',
    '/insurance': '社保'
}

const breadcrumbItems = computed(() => {
    const currentTitle = menuTitleMap[route.path]
    if (!currentTitle || route.path === '/dashboard') {
        return [{ label: '首页', path: '/dashboard' }]
    }

    return [
        { label: '首页', path: '/dashboard' },
        { label: currentTitle, path: route.path }
    ]
})
//获取用户资料
import { getUserInfo } from '@/api/role'
let staffPhoto = ref('')
let username = ref('')
async function getUser() {
    const res = await getUserInfo()
    staffPhoto.value = res.data?.staffPhoto || ''
    username.value = res.data?.username || ''
}
onMounted(() => {
    getUser()
})
</script>
<template>
    <div class="layout">
        <div class="navBar" :class="{ collapsed: isCollapse }">
            <el-menu default-active="/dashboard" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
                background-color="#121e41" text-color="#fff" active-text-color="#ffd04b" @close="handleClose" router>
                <el-menu-item index="/dashboard">
                    <el-icon>
                        <Odometer />
                    </el-icon>
                    <template #title>首页</template>
                </el-menu-item>
                <el-menu-item index="/department">
                    <el-icon>
                        <OfficeBuilding />
                    </el-icon>
                    <template #title>组织</template>
                </el-menu-item>
                <el-menu-item index="/role">
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <template #title>角色</template>
                </el-menu-item>
                <el-menu-item index="/employee">
                    <el-icon>
                        <User />
                    </el-icon>
                    <template #title>员工</template>
                </el-menu-item>
                <el-menu-item index="/authorize">
                    <el-icon>
                        <Key />
                    </el-icon>
                    <template #title>权限</template>
                </el-menu-item>
                <el-menu-item index="/attendance">
                    <el-icon>
                        <Clock />
                    </el-icon>
                    <template #title>考勤</template>
                </el-menu-item>
                <el-menu-item index="/review">
                    <el-icon>
                        <Stamp />
                    </el-icon>
                    <template #title>审批</template>
                </el-menu-item>
                <el-menu-item index="/salary">
                    <el-icon>
                        <Money />
                    </el-icon>
                    <template #title>工资</template>
                </el-menu-item>
                <el-menu-item index="/insurance">
                    <el-icon>
                        <Tickets />
                    </el-icon>
                    <template #title>社保</template>
                </el-menu-item>
            </el-menu>
            <el-button class="collapse-btn" :icon="Menu" @click="isCollapse = !isCollapse"></el-button>
        </div>
        <div class="main">
            <div class="header">
                <div class="breadCumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="item.path || item.label"
                            :to="index < breadcrumbItems.length - 1 ? { path: item.path } : undefined">
                            {{ item.label }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="setting">
                    <img class="avatar" :src="staffPhoto" alt="">
                    <span>{{ username }}</span>
                    <el-dropdown>
                        <el-icon>
                            <Setting />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item><a href="https://github.com/arthuryin1314/heimaHr_vue3" target="_blank">项目地址</a></el-dropdown-item>
                                <el-dropdown-item>修改密码</el-dropdown-item>
                                <el-dropdown-item>更新头像</el-dropdown-item>
                                <el-dropdown-item>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>

            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    min-height: 100vh;
    background: #f5f7fb;
}

.main {
    flex: 1;
    min-width: 0;
    padding: 16px 20px;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
    height: 56px;
    padding: 0 12px;
    background-color: #fff;
}

.breadCumb {
    margin-bottom: 0;
}

.setting {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #475569;
    background: transparent;
    font-size: 14px;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    background: #e2e8f0;
}

.setting :deep(.el-icon) {
    font-size: 22px;
}

:global(.el-popper .el-dropdown-menu a) {
    color: inherit;
    text-decoration: none;
}

.navBar {
    width: 200px;
    height: 100vh;
    background: #121e41;
    position: relative;
    transition: width 0.25s ease;
    overflow: hidden;
    will-change: width;
}

.navBar.collapsed {
    width: 64px;
}

.navBar :deep(.el-menu) {
    width: 100%;
    height: 100%;
    border-right: none;
    padding-bottom: 56px;
    transition: none;
}

.navBar :deep(.el-menu-item__title),
.navBar :deep(.el-sub-menu__title span) {
    transition: opacity 0.2s ease;
}

.navBar.collapsed :deep(.el-menu-item__title),
.navBar.collapsed :deep(.el-sub-menu__title span) {
    opacity: 0;
}

.navBar :deep(.el-menu-item .el-icon),
.navBar :deep(.el-sub-menu__title .el-icon) {
    transition: margin 0.25s ease, transform 0.25s ease;
}

.navBar.collapsed :deep(.el-menu-item .el-icon),
.navBar.collapsed :deep(.el-sub-menu__title .el-icon) {
    margin-right: 0;
    transform: translateX(2px);
}

.collapse-btn {
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
}

.menu-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    vertical-align: middle;
}
</style>