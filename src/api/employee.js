import request from "@/utils/request";

export function getDepartmentList() {
    return request({
        url:"/company/department"
    })
}
export function getEmployeeList(params) {
    return request({
        url:"/sys/user",
        params
    })
}