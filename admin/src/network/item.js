import {
  request
} from "network/request"

export function CreateCategory(body) {

  return request({
    url: "/rest/items",
    method: 'post',
    data: body
  })

}

export function SelectCategory() {

  return request({
    url: "/rest/items"
  })
}

export function SelectOneCategory(id) {
  return request({
    url: `/rest/items/${id}`
  })
}

export function UpdateOneCategory(id, body) {
  return request({
    url: `/rest/items/${id}`,
    method: "put",
    data:body
  })
}

export function DeleteById(id){
  return request({
    url:`/rest/items/${id}`,
    method:"delete"
  })
}