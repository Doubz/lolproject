import {
  request
} from "network/request"

export function CreateCategory(body) {

  return request({
    url: "/rest/categories",
    method: 'post',
    data: body
  })

}

export function SelectCategory() {

  return request({
    url: "/rest/categories"
  })
}

export function SelectOneCategory(id) {
  return request({
    url: `/rest/categories/${id}`
  })
}

export function UpdateOneCategory(id, body) {
  return request({
    url: `/rest/categories/${id}`,
    method: "put",
    data:body
  })
}

export function DeleteById(id){
  return request({
    url:`/rest/categories/${id}`,
    method:"delete"
  })
}