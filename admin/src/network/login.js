import {
  request
} from "network/request"


export function login(data){
  return request({
    url:"/login",
    method:"post",
    data
  })
}