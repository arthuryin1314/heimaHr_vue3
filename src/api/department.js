import request from "@/utils/request";

export function getDepartmentList() {
    return request({
        url:"/company/department"
    })
}
export function addDepartment(data) {
    return request({
        url:'/company/department',
        method:'post',
        data
    })
}
export function getManagerList() {
    return request({
        url:'/sys/user/simple'
    })
}
export function delDepartment(id) {
    return request({
        url:`/company/department/${id}`,
        method:'delete'
    })
}