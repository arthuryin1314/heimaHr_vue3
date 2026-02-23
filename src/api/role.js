import request from "@/utils/request";
//登录用户信息
export function getUserInfo() {
    return request({
        url: '/sys/profile'
    })
}

export function updatePassword(data) {
    return request({
        url: '/sys/user/updatePass',
        method: 'put',
        data
    })
}
//角色部门
export function getRoleList(data) {
    return request({
        url: "/sys/role",
        params: data
    })
}
export function addRole(data) {
    return request({
        url:'/sys/role',
        method:'post',
        data
    })
}export function getRoleDetail(id) {
    return request({
        url:`/sys/role/${id}`,
        method:'get'
    })
}
export function updateRole(data) {
    return request({
        url:`/sys/role/${data.id}`,
        method:'put',
        data
    })
}
export function delRole(id) {
    return request({
        url:`/sys/role/${id}`,
        method:'delete'
    })
}
export function getAllRoleList() {
    return request({
        url:'/sys/permission'
    })
}
export function assignPermissions(data) {
    return request({
        url:'/sys/role/assignPrem',
        method:'PUT',
        data
    })
}