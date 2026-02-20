import request from "@/utils/request";

export function getUserInfo(){
    return request({
        url:'/sys/profile'
    })
}

export function updatePassword(data){
    return request({
        url:'/sys/user/updatePass',
        method:'put',
        data
    })
}