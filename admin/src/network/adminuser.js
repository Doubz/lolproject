import {
  request
} from "network/request"

export function CreateCategory(body) {

  return request({
    url: "/rest/admin_users",
    method: 'post',
    data: body
  })

}

export function SelectCategory() {

  return request({
    url: "/rest/admin_users"
  })
}

export function SelectOneCategory(id) {
  return request({
    url: `/rest/admin_users/${id}`
  })
}

export function UpdateOneCategory(id, body) {
  return request({
    url: `/rest/admin_users/${id}`,
    method: "put",
    data:body
  })
}

export function DeleteById(id){
  return request({
    url:`/rest/admin_users/${id}`,
    method:"delete"
  })
}